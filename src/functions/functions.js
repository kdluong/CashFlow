import { monthNamesShort } from '../constants/constants';

export function getDate(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear() % 100
  }`;
}

export function getDateLong(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return `${monthNamesShort[formattedDate.getMonth()]
  } ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
}

export function getTime(transactionDate) {
  const formattedDate = new Date(transactionDate);

  return formattedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

export function calculateSpendingDistribution(
  myTransactions,
  myCategories,
  session,
  setChartData,
  setSpendingDistribution,
) {
  const currentDate = new Date();
  const tempDate = currentDate.getDate() - 7;
  let transactionDate;

  const tempChartData = [];

  const weekCategories = [];
  const monthCategories = [];
  const yearCategories = [];
  const allCategories = [];

  let weekTotal = 0;
  let monthTotal = 0;
  let yearTotal = 0;
  let allTotal = 0;

  let index = -1;

  function getWeekTransactions(transaction) {
    // update category

    index = weekCategories?.findIndex((item) => item.id === transaction.category_id);

    if (index > -1) {
      weekCategories[index].value += transaction.total;
    }

    // update total

    weekTotal += transaction.total;
  }

  function getMonthTransactions(transaction) {
    // update category

    index = monthCategories.findIndex((item) => item.id === transaction.category_id);

    if (index > -1) {
      monthCategories[index].value += transaction.total;
    }

    // update total

    monthTotal += transaction.total;
  }

  function getYearTransactions(transaction) {
    // update graph data

    tempChartData[transactionDate.getMonth()].value += transaction.total;

    // update category

    index = yearCategories.findIndex((item) => item.id === transaction.category_id);

    if (index > -1) {
      yearCategories[index].value += transaction.total;
    }

    // update total

    yearTotal += transaction.total;
  }

  function getAllTransactions(transaction) {
    // update categories

    index = allCategories.findIndex((item) => item.id === transaction.category_id);

    if (index > -1) {
      allCategories[index].value += transaction.total;
    }

    // update total

    allTotal += transaction.total;
  }

  // initialize week categories

  if (weekCategories.length === 0) {
    for (let index = 0; index < myCategories?.length; index += 1) {
      weekCategories.push({
        id: myCategories[index]?.id,
        name: myCategories[index]?.name,
        color: myCategories[index]?.color,
        value: 0,
      });
    }
  }

  // initialize month categories

  if (monthCategories.length === 0) {
    for (let index = 0; index < myCategories?.length; index += 1) {
      monthCategories.push({
        id: myCategories[index]?.id,
        name: myCategories[index]?.name,
        color: myCategories[index]?.color,
        value: 0,
      });
    }
  }

  // initialize year graph & categories

  if (tempChartData.length === 0 && yearCategories.length === 0) {
    for (let month = 0; month <= currentDate.getMonth(); month += 1) {
      tempChartData.push({ value: 0, label: monthNamesShort[month] });
    }

    for (let index = 0; index < myCategories?.length; index += 1) {
      yearCategories.push({
        id: myCategories[index]?.id,
        name: myCategories[index]?.name,
        color: myCategories[index]?.color,
        value: 0,
      });
    }
  }

  // initialize all categories

  if (allCategories.length === 0) {
    for (let index = 0; index < myCategories?.length; index += 1) {
      allCategories.push({
        id: myCategories[index]?.id,
        name: myCategories[index]?.name,
        color: myCategories[index]?.color,
        value: 0,
      });
    }
  }

  for (let i = 0; i < myTransactions.length; i += 1) {
    transactionDate = new Date(myTransactions[i].date);

    index = myCategories?.findIndex(
      (currCategory) => currCategory.id === myTransactions[i].category_id,
    );

    if (index > -1) {
      if (transactionDate.getFullYear() === currentDate.getFullYear()) {
        if (transactionDate.getMonth() === currentDate.getMonth()) {
          if (
            tempDate < 0
            || (transactionDate.getDate() > tempDate
              && transactionDate.getDate() <= currentDate.getDate())
          ) {
            getWeekTransactions(myTransactions[i]);
          }

          getMonthTransactions(myTransactions[i]);
        }

        getYearTransactions(myTransactions[i]);
      }

      getAllTransactions(myTransactions[i]);
    }
  }

  setChartData(tempChartData);

  setSpendingDistribution({
    week: { categories: weekCategories, total: weekTotal.toFixed(2) },
    month: { categories: monthCategories, total: monthTotal.toFixed(2) },
    year: { categories: yearCategories, total: yearTotal.toFixed(2) },
    all: { categories: allCategories, total: allTotal.toFixed(2) },
  });
}

export function calculateCategoryDistribution(category_id, transactions) {
  let weekTotal = 0;
  let monthTotal = 0;
  let yearTotal = 0;
  let allTotal = 0;

  const weekTransactions = [];
  const monthTransactions = [];
  const yearTransactions = [];
  const allTransactions = [];

  let transactionDate;
  const currentDate = new Date();
  const tempDate = currentDate.getDate() - 7;

  // find category transactions

  for (let index = 0; index < transactions?.length; index += 1) {
    if (transactions[index]?.category_id === category_id) {
      transactionDate = new Date(transactions[index]?.date);

      if (transactionDate.getFullYear() === currentDate.getFullYear()) {
        if (transactionDate.getMonth() === currentDate.getMonth()) {
          if (
            tempDate < 0
            || (transactionDate.getDate() > tempDate
              && transactionDate.getDate() <= currentDate.getDate())
          ) {
            // week

            weekTransactions.push(transactions[index]);
            if (transactions[index]) {
              weekTotal += transactions[index].total;
            }
          }

          // month

          monthTransactions.push(transactions[index]);
          if (transactions[index]) {
            monthTotal += transactions[index].total;
          }
        }

        // year

        yearTransactions.push(transactions[index]);
        if (transactions[index]) {
          yearTotal += transactions[index].total;
        }
      }

      // all

      allTransactions.push(transactions[index]);
      if (transactions[index]) {
        allTotal += transactions[index].total;
      }
    }
  }

  return {
    week: { transactions: weekTransactions, total: weekTotal.toFixed(2) },
    month: { transactions: monthTransactions, total: monthTotal.toFixed(2) },
    year: { transactions: yearTransactions, total: yearTotal.toFixed(2) },
    all: { transactions: allTransactions, total: allTotal.toFixed(2) },
  };
}
