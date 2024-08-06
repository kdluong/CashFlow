import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../supabase/ViewModel';
import TransactionLargeCard from '../../../components/TransactionCards/TransactionLargeCard';
import BackButton from '../../../components/Buttons/BackButton';
import { accentColor } from '../../../constants/constants';
import IconSmall from '../../../components/Icons/IconSmall';
import LoadingScreen from '../../Loading/LoadingScreen';

function TransactionView({ navigation, route }) {
  const { transaction_id } = route.params;
  const { fetchTransaction, deleteTransaction, transactions } = React.useContext(UserContext);
  const [transaction, setTransaction] = React.useState();
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    const data = fetchTransaction(transaction_id);

    setTransaction(data?.transaction);
  }, [transactions]);

  async function handleDelete() {
    let successFlag = false;

    setDeleteLoading(true);
    successFlag = await deleteTransaction(transaction.id, true);
    setDeleteLoading(false);

    if (successFlag) {
      navigation.goBack();
    }
  }

  return (
    <View style={{ height: "100%", width: '100%' }}>
      {deleteLoading
        ?
        <LoadingScreen />
        :

        <TransactionLargeCard transaction_id={transaction_id}>
          {/* Header */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Back Button */}

            <TouchableOpacity disabled={deleteLoading} onPress={() => navigation.goBack()}>
              <BackButton />
            </TouchableOpacity>

            {/* Edit & Delete Buttons */}

            <View style={{ flexDirection: 'row', gap: scale(5) }}>
              <TouchableOpacity
                disabled={deleteLoading}
                onPress={() => navigation.navigate('NewTransactionStartView', {
                  transaction_id: transaction?.id,
                  category_id: null,
                  returnScreen: null,
                })}
              >
                <IconSmall name="create" color="white" backgroundColor={accentColor} />
              </TouchableOpacity>

              {deleteLoading ? (
                <ActivityIndicator color="white" style={{ width: scale(35) }} />
              ) : (
                <TouchableOpacity disabled={deleteLoading} onPress={() => handleDelete()}>
                  <IconSmall name="trash" color="white" backgroundColor="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TransactionLargeCard>
      }
    </View>
  );
}

export default TransactionView;
