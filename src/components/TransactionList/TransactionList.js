import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import uuid from 'react-uuid';
import { scale } from 'react-native-size-matters';
import TransactionSmallCard from '../TransactionCards/TransactionSmallCard';
import globalStyles from '../../styles/styles.ts';

function TransactionList({ myTransactions, navigation }) {
  return myTransactions?.length === 0 ? (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: scale(130) }}>
      <Text style={globalStyles.body('black')}>No Transactions</Text>
    </View>
  ) : (
    <View>
      {myTransactions
        ?.sort((a, b) => (a.date > b.date ? -1 : 1))
        .slice(0, 5)
        .map((transaction) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SharedStack', {
              screen: 'TransactionView',
              params: { transaction_id: transaction.id },
            })}
            key={uuid()}
          >
            <TransactionSmallCard transaction_id={transaction.id} />
          </TouchableOpacity>
        ))}
    </View>
  );
}

export default TransactionList;
