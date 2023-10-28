import React from 'react';
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from './supabase';
import { monthNamesShort, daysOfWeek } from '../constants/constants';
import { calculateSpendingDistribution } from '../functions/functions.js';

export const UserContext = React.createContext();

function ViewModel(props) {
  const [session, setSession] = React.useState(null);

  const [user, setUser] = React.useState();
  const [transactions, setTransactions] = React.useState();
  const [categories, setCategories] = React.useState();

  const [chartData, setChartData] = React.useState();
  const [spendingDistribution, setSpendingDistribution] = React.useState();

  // fetch and update transactions & categories

  async function getAll() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      let calculate = false;
      const equal = require('deep-equal');

      // fetch transactions

      const transactionData = await getTrans();

      if (transactionData != null && !equal(transactionData, transactions, true)) {
        setTransactions(transactionData);
        calculate = true;
      }

      // fetch categories

      const categoryData = await getCats();

      if (categoryData != null && !equal(categoryData, categories, true)) {
        setCategories(categoryData);
        calculate = true;
      }

      // calculate

      if (calculate) {
        calculateSpendingDistribution(transactionData, categoryData, session, setChartData, setSpendingDistribution);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  // Transactions

  // fetch and return transactions w/o modifying existing transactions

  async function getTrans() {
    tempTransactions = null;

    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('transactions')
        .select()
        .eq('user_id', session?.user.id);

      if (!data && error && status !== 406) {
        throw error;
      } else {
        tempTransactions = data;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }

    return tempTransactions;
  }

  // fetch transactions & update transactions

  async function getTransactions() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('transactions')
        .select()
        .eq('user_id', session?.user.id);

      if (!data && error && status !== 406) {
        throw error;
      } else {
        calculateSpendingDistribution(data, categories, session, setChartData, setSpendingDistribution);
        setTransactions(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function createTransaction(category_id, name, total, image) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      // Create New Transaction

      const updates = {
        category_id,
        name,
        total,
      };

      const { data, error } = await supabase.from('transactions').upsert(updates).select();

      if (error) {
        throw error;
      }

      // Upload Transaction Image (if exists)

      if (image != null) {
        const transaction_id = data[0].id;
        const ext = image.substring(image.lastIndexOf('.') + 1);
        const fileName = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));

        const formData = new FormData();

        formData.append('files', {
          uri: image,
          name: fileName,
          type: `image/${ext}`,
        });

        const { uploadError } = await supabase.storage
          .from('transactions')
          .upload(`${user.user_id}/${fileName}`, formData);

        if (uploadError) {
          throw error;
        }

        // update transaction w/ image

        const url = `https://tbgxebebapqscbpmpecp.supabase.co/storage/v1/object/public/transactions/${user.user_id}/${fileName}`;

        const { urlError } = await supabase
          .from('transactions')
          .update({ image: url })
          .eq('id', transaction_id);

        if (urlError) {
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      // update existing transactions

      getTransactions();
    }
  }

  async function updateTransaction(transaction_id, category_id, name, total, image) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { transaction } = fetchTransaction(transaction_id);

      if (transaction == null) {
        throw error;
      }

      const transactionImage = transaction?.image;
      let url;

      // update transaction picture in storage (!og & new || og & new)

      if (image != transactionImage) {
        // delete existing (og exists)

        if (transactionImage != null) {
          const key = transactionImage.substring(
            transactionImage.lastIndexOf('transactions/') + 13,
          );
          url = null;

          const { data, error } = await supabase.storage.from('transactions').remove([key]);

          if (error) {
            console.log(error.message);
            throw error;
          }
        }

        // save new image (photo was taken)

        if (image != null) {
          const ext = image.substring(image.lastIndexOf('.') + 1);
          const fileName = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
          url = `https://tbgxebebapqscbpmpecp.supabase.co/storage/v1/object/public/transactions/${user.user_id}/${fileName}`;

          const formData = new FormData();

          formData.append('files', {
            uri: image,
            name: fileName,
            type: `image/${ext}`,
          });

          const { uploadError } = await supabase.storage
            .from('transactions')
            .upload(`${user.user_id}/${fileName}`, formData);

          if (uploadError) {
            throw error;
          }
        }
      } else {
        url = transactionImage;
      }

      // update transaction

      const update = {
        category_id,
        name,
        total,
        image: url,
      };

      const { error } = await supabase.from('transactions').update(update).eq('id', transaction_id);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      getTransactions();
      // getAll();
    }
  }

  async function deleteTransaction(transaction_id, refresh) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { transaction } = fetchTransaction(transaction_id);

      // delete transaction

      const { error } = await supabase.from('transactions').delete().eq('id', transaction_id);

      // delete stored image, if exists

      if (transaction.image != null) {
        // extract uuid & image key

        const key = transaction.image.substring(
          transaction.image.lastIndexOf('transactions/') + 13,
        );

        const { data, error } = await supabase.storage.from('transactions').remove([key]);

        if (error) {
          console.log(error.message);
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      if (refresh) {
        getTransactions();
      }
    }
  }

  function fetchTransaction(transaction_id) {
    const index = transactions?.findIndex((item) => item.id == transaction_id);
    const category = fetchCategory(transactions[index]?.category_id);

    if (index > -1) {
      return { transaction: transactions[index], category };
    }
    return null;
  }

  // Category

  // fetch and return categories w/o modifying existing categories

  async function getCats() {
    let tempCats = null;

    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('categories')
        .select()
        .eq('user_id', session?.user.id);

      if (error && status !== 406) {
        throw error;
      }

      tempCats = data;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }

    return tempCats;
  }

  // fetch categories & update categories

  async function getCategories() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('categories')
        .select()
        .eq('user_id', session?.user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function createCategory(name, color, icon) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        name,
        color,
        icon,
      };

      const { data, error } = await supabase.from('categories').upsert(updates).select();

      if (!data || error) {
        throw error;
      }

      const newCategory = {
        id: data[0]?.id,
        name,
        color,
        value: 0,
      };

      const tempSpendingDistribution = spendingDistribution;

      tempSpendingDistribution?.week?.categories?.push(newCategory);
      tempSpendingDistribution?.month?.categories?.push(newCategory);
      tempSpendingDistribution?.year?.categories?.push(newCategory);
      tempSpendingDistribution?.all?.categories?.push(newCategory);

      setSpendingDistribution(tempSpendingDistribution);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      getCategories();
    }
  }

  async function updateCategory(category_id, name, color, icon) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const update = {
        name,
        icon,
        color,
      };

      // update category

      const { error } = await supabase.from('categories').update(update).eq('id', category_id);

      // update spendingDistribution

      const category = fetchCategory(category_id);

      if (category.name != name || category.color != color) {
        const tempSpendingDistribution = spendingDistribution;
        let index = -1;

        index = tempSpendingDistribution?.week?.categories?.findIndex(
          (category) => category.id == category_id,
        );

        if (index > -1) {
          tempSpendingDistribution.week.categories[index].name = name;
          tempSpendingDistribution.week.categories[index].color = color;
        }

        index = tempSpendingDistribution?.month?.categories?.findIndex(
          (category) => category.id == category_id,
        );

        if (index > -1) {
          tempSpendingDistribution.month.categories[index].name = name;
          tempSpendingDistribution.month.categories[index].color = color;
        }

        index = tempSpendingDistribution?.year?.categories?.findIndex(
          (category) => category.id == category_id,
        );

        if (index > -1) {
          tempSpendingDistribution.year.categories[index].name = name;
          tempSpendingDistribution.year.categories[index].color = color;
        }

        index = tempSpendingDistribution?.all?.categories?.findIndex(
          (category) => category.id == category_id,
        );

        if (index > -1) {
          tempSpendingDistribution.all.categories[index].name = name;
          tempSpendingDistribution.all.categories[index].color = color;
        }

        setSpendingDistribution(tempSpendingDistribution);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      getCategories();
    }
  }

  async function deleteCategory(category_id) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      // delete category

      const { error } = await supabase.from('categories').delete().eq('id', category_id);

      // delete category's transactions

      for (let index = 0; index < transactions.length; index++) {
        if (transactions[index].category_id == category_id) {
          await deleteTransaction(transactions[index].id, false);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      getAll();
    }
  }

  function fetchCategory(category_id) {
    const index = categories?.findIndex((item) => item.id == category_id);

    if (index > -1) {
      return categories[index];
    }
    return null;
  }

  // User

  async function getUser() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('users')
        .select()
        .eq('user_id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUser(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function updateUser(first_name, last_name, image) {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const userImage = user?.image;
      let url;

      // update profile picture in storage (!og & new || og & new)

      if (image != userImage) {
        // delete existing (og exists)

        if (userImage != null) {
          const key = userImage.substring(userImage.lastIndexOf('profiles/') + 9);
          url = null;

          const { data, error } = await supabase.storage.from('profiles').remove([key]);

          if (error) {
            console.log(error.message);
            throw error;
          }
        }

        // save new image (photo was taken)

        if (image != null) {
          const ext = image.substring(image.lastIndexOf('.') + 1);
          const fileName = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
          url = `https://tbgxebebapqscbpmpecp.supabase.co/storage/v1/object/public/profiles/${user.user_id}/${fileName}`;

          const formData = new FormData();

          formData.append('files', {
            uri: image,
            name: fileName,
            type: `image/${ext}`,
          });

          const { uploadError } = await supabase.storage
            .from('profiles')
            .upload(`${user.user_id}/${fileName}`, formData);

          if (uploadError) {
            throw error;
          }
        }
      } else {
        url = userImage;
      }

      // update user info

      const update = {
        first_name,
        last_name,
        image: url,
      };

      let { error } = await supabase.from('users').update(update).eq('user_id', user?.user_id);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      getUser();
    }
  }

  return (
    <UserContext.Provider
      value={{
        session,
        setSession,

        getAll,

        user,
        getUser,
        updateUser,

        categories,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchCategory,

        transactions,
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        fetchTransaction,

        chartData,
        spendingDistribution,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default ViewModel;
