import { View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDate } from "../../functions/functions";
import React from "react";
import { styles } from "../../styles/Styles";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from 'react-native-size-matters';
import IconLarge from "../Icons/IconLarge";

const TransactionSmallCard = ({ transaction_id }) => {

    const { fetchTransaction, transactions, categories } = React.useContext(UserContext);
    const [transaction, setTransacation] = React.useState(null);
    const [category, setCategory] = React.useState(null);

    React.useEffect(() => {
        var data = fetchTransaction(transaction_id);

        setTransacation(data?.transaction);
        setCategory(data?.category);
    }, [transactions, categories]);

    return (
        <View style={{ height: scale(60), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>

            {/* Icon, Name, & Category */}

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>

                {/* Icon */}

                <IconLarge name={category?.icon} color={'white'} backgroundColor={'black'} />

                {/* Name & Category */}

                <View >
                    <Text style={styles.subHeader('black')}>{transaction?.name}</Text>
                    <Text style={styles.body('gray')}>{category?.name}</Text>
                </View>

            </View>

            {/* Total & Date */}

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>

                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.subHeader('black')}>- ${transaction?.total?.toFixed(2)}</Text>
                    <Text style={styles.body('gray')}>{getDate(transaction?.date)}</Text>
                </View>

                <Ionicons name="chevron-forward-sharp" size={scale(15)} color={'black'} />

            </View>

        </View>
    );
};

export default TransactionSmallCard;