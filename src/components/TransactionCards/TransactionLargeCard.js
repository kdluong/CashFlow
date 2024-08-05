import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { getDateLong, getTime } from '../../functions/functions';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';
import CustomView from '../CustomViews/CustomView';
import IconLarge from '../Icons/IconLarge';
import TransactionSmallCard from './TransactionSmallCard';

function TransactionLargeCard({ transaction_id, children }) {
  const { fetchTransaction, transactions } = React.useContext(UserContext);

  const [transaction, setTransaction] = React.useState();
  const [category, setCategory] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const data = fetchTransaction(transaction_id);

    getTime(data?.transaction?.date);

    setTransaction(data?.transaction);
    setCategory(data?.category);
  }, [transactions]);

  return (
    <Image
      key={Date.now()}
      source={transaction?.image}
      style={{ flex: 1, backgroundColor: category?.color }}
      onLoadEnd={() => setLoading(false)}
    >
      <CustomView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        {children}

        {/* Loading */}

        {loading && transaction?.image != null && <ActivityIndicator size="large" color="black" />}

        {/* Transaction Info */}

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: scale(10),
            height: scale(70),
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: scale(15),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          {/* Icon & Name */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(13) }}>
            <IconLarge name={category?.icon} color="white" backgroundColor={category?.color} />

            <View style={{ gap: scale(2) }}>
              <Text style={globalStyles.subHeader('black')}>{transaction?.name}</Text>
              <Text style={globalStyles.body('#5b647d')}>{category?.name}</Text>
            </View>
          </View>

          {/* Total & Date */}

          <View style={{
            alignItems: 'flex-end', position: 'absolute', right: 0, paddingRight: scale(15),
            gap: scale(2),
          }}
          >
            <Text style={globalStyles.subHeader('black')}>
              $
              {transaction?.total?.toFixed(2)}
            </Text>
            <Text style={globalStyles.body('#5b647d')}>
              {getDateLong(transaction?.date)}
              {' @ '}
              {getTime(transaction?.date)}
            </Text>
          </View>
        </View>
      </CustomView>
    </Image>
  );
}

export default TransactionLargeCard;
