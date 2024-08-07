import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { getDate } from '../../functions/functions';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';
import IconLarge from '../Icons/IconLarge';
import { green } from '../../constants/constants';

function TransactionSmallCard({ transaction_id }) {
  const { fetchTransaction, transactions, categories } = React.useContext(UserContext);
  const [transaction, setTransacation] = React.useState(null);
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    const data = fetchTransaction(transaction_id);

    setTransacation(data?.transaction);
    setCategory(data?.category);
  }, [transactions, categories]);

  return (
    <View
      style={{
        height: scale(60),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      {/* Icon, Name, & Category */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(17) }}>
        {/* Icon */}

        <IconLarge name={category?.icon} color={'white'} backgroundColor={category?.color} />

        {/* Name & Category */}

        <View>
          <Text style={[globalStyles.subHeader('black'), { paddingBottom: scale(2) }]}>{transaction?.name}</Text>
          <Text style={globalStyles.body('#5b647d')}>{category?.name}</Text>
        </View>
      </View>

      {/* Total & Date */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={globalStyles.subHeader('black')}>
            $
            {transaction?.total?.toFixed(2)}
          </Text>
          {/* <Text style={globalStyles.body('#5b647d')}>{getDate(transaction?.date)}</Text> */}
        </View>
      </View>
    </View>
  );
}

export default TransactionSmallCard;
