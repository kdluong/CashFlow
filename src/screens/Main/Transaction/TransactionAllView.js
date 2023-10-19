import React from "react";
import { Text, View, TouchableOpacity, RefreshControl } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../styles/Styles";
import { UserContext } from "../../../supabase/ViewModel";
import TransactionMediumCard from "../../../components/TransactionCards/TransactionMediumCard";
import SearchPicker from "../../../components/TextInputs/SearchPicker";
import { scale } from 'react-native-size-matters';
import OpenDrawerButton from "../../../components/Buttons/OpenDrawerButton";
import CustomFlatListView from "../../../components/CustomViews/CustomFlatListView";
import { green } from "../../../constants/constants";

const TransactionAllView = ({ navigation }) => {

    const { transactions, getAll } = React.useContext(UserContext);
    const [sort, setSort] = React.useState();
    const [filter, setFilter] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);

    function handleSort(a, b) {
        switch (sort) {
            case "Latest":
                return (a?.date > b?.date)
            case "Oldest":
                return (a?.date < b?.date)
            case "A-Z":
                return (a?.name < b?.name)
            case "Z-A":
                return (a?.name > b?.name)
            case "$$-$":
                return (a?.total > b?.total)
            default:
                return (a?.total < b?.total)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('SharedStack', {
                    screen: 'TransactionView',
                    params: { transaction_id: item.id }
                })}
                key={item.id}
            >
                <TransactionMediumCard transaction_id={item.id} />
            </TouchableOpacity>
        );
    };

    const renderRefresh = () => {

        async function handleRefresh() {

            setRefresh(true);

            await getAll();

            setRefresh(false);
        }

        return (
            <RefreshControl
                refreshing={refresh}
                onRefresh={handleRefresh}
                tintColor="white"
            />
        );
    };

    const renderHeader = () => {
        return (
            <View style={{ gap: scale(10) }}>

                {/* Header */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>

                    {/* Open Drawer */}

                    <OpenDrawerButton onPress={() => navigation.openDrawer()} />

                    {/* Name & Icon */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>
                        <Text style={styles.header('white')}>Transactions</Text>
                        <Ionicons name="receipt" size={scale(16)} color={'white'} />
                    </View>

                    {/* New Transaction */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SharedStack', {
                            screen: 'NewTransactionStartView',
                            params: {
                                transaction_id: null,
                                category_id: null,
                                returnScreen: "TransactionAllView",
                            },
                        })}
                    >
                        <Ionicons name="add" size={scale(25)} color={green} />
                    </TouchableOpacity>

                </View>

                {/* Search & Filter */}

                <SearchPicker
                    setFilter={setFilter}
                    setSort={setSort}
                    option={'transaction'}
                    border={undefined}
                />

            </View>
        );
    };

    const renderEmptyComponent = () => {
        return (
            < View style={{ height: '250%', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={styles.body('white')}>No Transactions</Text>
            </View >
        );
    };

    return (
        <CustomFlatListView
            ListHeaderComponentStyle={{ zIndex: 1, paddingBottom: scale(15) }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}

            data={transactions?.filter((transaction) => transaction?.name?.toUpperCase()?.includes(filter?.toUpperCase())).sort((a, b) => handleSort(a, b) ? -1 : 1)}
            keyExtractor={item => item.id}
            refreshControl={renderRefresh()}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader()}
            ListEmptyComponent={renderEmptyComponent()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            numColumns={2}
        />
    );
}

export default TransactionAllView;