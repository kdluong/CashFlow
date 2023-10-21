import React from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from "../../../supabase/ViewModel";
import TransactionLargeCard from "../../../components/TransactionCards/TransactionLargeCard";
import { scale } from "react-native-size-matters";
import BackButton from "../../../components/Buttons/BackButton";
import CustomView from "../../../components/CustomViews/CustomView";
import { backgroundColor, accentColor } from "../../../constants/constants";
import IconSmall from "../../../components/Icons/IconSmall";

const TransactionView = ({ navigation, route }) => {

    const { transaction_id } = route.params;
    const { fetchTransaction, deleteTransaction, transactions } = React.useContext(UserContext);
    const [transaction, setTransaction] = React.useState();
    const [category, setCategory] = React.useState();
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    React.useEffect(() => {

        var data = fetchTransaction(transaction_id);

        setTransaction(data?.transaction);
        setCategory(data?.category);

    }, [transactions])

    async function handleDelete() {
        setDeleteLoading(true);
        await deleteTransaction(transaction.id, true);
        setDeleteLoading(false);

        navigation.goBack()
    };

    return (
        <TransactionLargeCard transaction_id={transaction_id} >

            {/* Header */}

            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Back Button */}

                <TouchableOpacity
                    disabled={deleteLoading}
                    onPress={() => navigation.goBack()}
                >
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
                        <IconSmall name={'create'} color={'white'} backgroundColor={accentColor} />
                    </TouchableOpacity>

                    {
                        deleteLoading
                            ?
                            <ActivityIndicator color={'white'} style={{ width: scale(35) }} />
                            :
                            <TouchableOpacity
                                disabled={deleteLoading}
                                onPress={() => handleDelete()}
                            >
                                <IconSmall name={'trash'} color={'white'} backgroundColor={'black'} />
                            </TouchableOpacity>
                    }

                </View>

            </View>

        </TransactionLargeCard>
    );
};

export default TransactionView;