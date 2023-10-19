import React from "react";
import { Image } from "expo-image";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "../../styles/Styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDate } from "../../functions/functions";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from 'react-native-size-matters';
import IconSmall from "../Icons/IconSmall";

const TransactionMediumCard = ({ transaction_id }) => {

  const { transactions, categories, fetchTransaction } = React.useContext(UserContext);
  const [transaction, setTransaction] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

    var data = fetchTransaction(transaction_id)

    setTransaction(data?.transaction);
    setCategory(data?.category);

  }, [transactions, categories]);

  return (
    <View
      style={{
        borderRadius: scale(5),
        overflow: 'hidden',
        backgroundColor: 'black',
        marginBottom: scale(15),
        width: scale(148),
        height: scale(190),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
      }}
    >

      {/* Transaction Image */}

      <Image
        source={transaction?.image}
        style={{
          flex: 1,
          backgroundColor: category?.color,
          opacity: 0.85
        }}
        key={new Date()}
        onLoadEnd={() => setLoading(false)}
      />

      {/* Transaction Info */}

      <View style={{ padding: scale(10), justifyContent: 'space-between', height: '100%', width: '100%', position: 'absolute' }}>

        {/* Logo & Date */}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >

          {/* Logo */}

          <IconSmall name={category?.icon} color={'white'} backgroundColor={category?.color} />

          {/* Date */}

          <Text
            style={{
              ...styles.body('white'), shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.00,

              elevation: 24,
            }}
            numberOfLines={1}
          >- ${transaction?.total?.toFixed(2)}
          </Text>

        </View>

        {/* Loading */}

        {loading && transaction?.image != null && <ActivityIndicator size={'small'} color={'black'} />}

        {/* Name, Category, & Total */}

        <View >

          <Text style={{
            ...styles.subHeader('white'),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
          }} numberOfLines={1} >{transaction?.name}</Text>

          <Text style={{
            ...styles.body('#f3f3f3'),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
          }} numberOfLines={1} >{getDate(transaction?.date)}</Text>



        </View>

      </View>

    </View>
  );
};


export default TransactionMediumCard;