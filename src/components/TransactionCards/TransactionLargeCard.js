import React from "react";
import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDate, getDateLong, getTime } from "../../functions/functions";
import { styles } from "../../styles/Styles";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from 'react-native-size-matters';
import CustomView from "../CustomViews/CustomView";
import IconLarge from "../Icons/IconLarge";

const TransactionLargeCard = ({ transaction_id, children }) => {

    const { fetchTransaction, transactions } = React.useContext(UserContext);

    const [transaction, setTransaction] = React.useState();
    const [category, setCategory] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        var data = fetchTransaction(transaction_id);

        getTime(data?.transaction?.date);

        setTransaction(data?.transaction);
        setCategory(data?.category);
    }, [transactions])

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
                        borderRadius: scale(5),
                        height: scale(70),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: scale(15),
                        alignItems: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                    }}
                >

                    {/* Icon & Name */}

                    <View style={{ flexDirection: 'row', alignItems: "center", gap: scale(10) }}>

                        <IconLarge name={category?.icon} color={'white'} backgroundColor={category?.color} />

                        <View >
                            <Text style={styles.subHeader('black')}>{transaction?.name}</Text>
                            <Text style={styles.body('gray')}>{category?.name}</Text>
                        </View>

                    </View>

                    {/* Total & Date */}

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.subHeader('black')}>- ${transaction?.total?.toFixed(2)}</Text>
                        <Text style={styles.body('gray')}>{getDateLong(transaction?.date)} @ {getTime(transaction?.date)}</Text>
                    </View>

                </View>

            </CustomView>

        </Image>
    );
};

export default TransactionLargeCard;