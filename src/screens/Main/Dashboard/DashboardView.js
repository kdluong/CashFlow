import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, RefreshControl, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from "../../../supabase/ViewModel";
import { styles } from "../../../styles/Styles";
import { scale } from 'react-native-size-matters';
import { Image } from "expo-image";
import TransactionSmallCard from "../../../components/TransactionCards/TransactionSmallCard";
import { monthNames, monthNamesShort, backgroundColor, green, accentColor } from "../../../constants/constants";
import { BarChart } from "react-native-gifted-charts";
import OpenDrawerButton from "../../../components/Buttons/OpenDrawerButton";
import CustomScrollView from "../../../components/CustomViews/CustomScrollView";

const DashboardView = ({ navigation }: { navigation: any }) => {

    const { user, transactions, spendingDistribution, chartData, getUser, getAll } = React.useContext(UserContext);
    const [currentMonth, setCurrentMonth] = React.useState(null);
    const [currentTotal, setCurrentTotal] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [myTransactions, setMyTransactions] = React.useState([]);

    const TransactionList = () => {

        return (
            myTransactions?.length == 0
                ?
                <View style={{ alignItems: "center", justifyContent: 'center', height: scale(130) }}>
                    <Text style={styles.body('black')}>No Transactions</Text>
                </View>
                :
                <View>
                    {
                        myTransactions?.sort((a, b) => a.date > b.date ? -1 : 1).slice(0, 5).map((transaction, index) =>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SharedStack', {
                                    screen: 'TransactionView',
                                    params: { transaction_id: transaction.id }
                                })}
                                key={index}
                            >
                                <TransactionSmallCard transaction_id={transaction.id} />
                            </TouchableOpacity>
                        )
                    }
                </View>
        );
    };

    async function handleRefresh() {
        setRefresh(true);

        await getUser();
        await getAll();

        setRefresh(false);
    }

    function setMonthlyOverview(month, total) {

        var index = monthNamesShort.indexOf(month);

        if (index > -1) {
            setCurrentMonth(monthNames[index]);
            setCurrentTotal(total);
        }
    }

    const RenderMonthlyOverview = () => {

        if (transactions != undefined && transactions?.length != 0) {
            var month;
            var total;

            if (currentMonth == null && currentTotal == null) {
                if (transactions?.length != 0) {

                    var index = monthNamesShort.indexOf(chartData?.at(-1)?.label);

                    month = monthNames[index];
                    total = chartData?.at(-1)?.value;
                }
            }
            else {
                month = currentMonth;
                total = currentTotal;
            }

            return (
                <Text style={styles.body('black')}>{month} ${parseFloat(total).toFixed(2)}</Text>
            );
        }
        else {
            return (<View />);
        }
    };

    React.useEffect(() => {
        handleRefresh()
    }, []);

    React.useEffect(() => {

        var tempTransactions = [];

        for (let index = 0; index < transactions?.length; index++) {
            tempTransactions.push(transactions[index]);
        }

        setMyTransactions(tempTransactions);

    }, [transactions]);

    if (spendingDistribution == undefined) {

        // Loading Screen

        return (
            <View style={{ alignItems: 'center', flex: 1, backgroundColor: backgroundColor, alignItems: 'center', justifyContent: 'center' }}>

                {/* Logo */}

                <View style={{ alignItems: 'center', flexDirection: "row" }}>
                    <Text style={styles.logo}>CASHFLOW</Text>
                    <Image
                        style={{ height: scale(40), width: scale(40), marginLeft: scale(5), marginBottom: scale(10) }}
                        source={require('../../../../assets/logoClear.png')}
                    />
                </View>

                {/* Slogan */}

                <Text style={styles.body('white')}>Money management, redefined.</Text>

            </View>
        );
    }
    else {

        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>

                <SafeAreaView />

                <CustomScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={handleRefresh}
                            tintColor="white"
                        />
                    }
                >

                    {/* Header */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        {/* Drawer & Logo */}

                        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(7) }}>

                            <OpenDrawerButton onPress={() => navigation.openDrawer()} />

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'BebasBold', fontSize: scale(27), color: "white" }}>CASHFLOW</Text>
                                <Image style={{ height: scale(22), width: scale(22), marginLeft: scale(2), marginBottom: scale(4) }} source={require('../../../../assets/logoClear.png')} />
                            </View>

                        </View>

                        {/* Profile Picture */}

                        <TouchableOpacity
                            style={{ borderColor: 'white', borderWidth: scale(2.5), borderRadius: 100 }}
                            onPress={() => navigation.jumpTo('SettingsStack')}
                        >
                            <Image
                                source={user?.image != null ? user.image : require('../../../../assets/blankProfilePicture.png')}
                                style={{ height: scale(45), width: scale(45), borderRadius: 100 }}
                                onLoadStart={() => setLoading(true)}
                                onLoadEnd={() => setLoading(false)}
                            />
                        </TouchableOpacity>

                    </View>

                    {/* Current Expenses */}

                    <View style={{ alignItems: "center", paddingVertical: scale(40) }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'BebasReg', fontSize: scale(47), color: green }}>$</Text>
                            <Text style={styles.logo}>{spendingDistribution?.year?.total} </Text>
                        </View>

                        <Text style={styles.body('white')}>Yearly Spendings</Text>

                    </View>

                    {/* Options, Overview, & Recent Transactions */}

                    <View style={{ gap: scale(12), paddingBottom: (Dimensions.get('screen').height < 700 ? scale(130) : scale(120)) }}>

                        {/* Transactions & Categories Buttons */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <TouchableOpacity
                                onPress={() => navigation.jumpTo('TransactionStack')}
                                style={{
                                    width: scale(140),
                                    paddingVertical: scale(13),
                                    borderRadius: scale(40),
                                    backgroundColor: accentColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    gap: scale(5),
                                }}
                            >
                                <Ionicons name="receipt-sharp" size={scale(16)} color={'white'} />
                                <Text style={styles.subHeader('white')}>Transactions</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.jumpTo('CategoryStack')}
                                style={{
                                    width: scale(140),
                                    paddingVertical: scale(13),
                                    borderRadius: scale(40),
                                    backgroundColor: 'black',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    gap: scale(5),
                                }}
                            >
                                <Ionicons name="pie-chart-sharp" size={scale(16)} color={'white'} />
                                <Text style={styles.subHeader('white')}>Categories</Text>
                            </TouchableOpacity>

                        </View>

                        {/* Overview Chart */}

                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: scale(15),
                                padding: scale(25),
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.header('black')}>Overview</Text>
                                <RenderMonthlyOverview />
                            </View>

                            <View style={{
                                paddingTop: scale(10),
                                paddingBottom: scale(10),
                                marginLeft: scale(-3),
                                marginBottom: scale(-10),
                            }}>

                                <BarChart
                                    data={chartData}
                                    height={scale(70)}
                                    barWidth={scale(15)}
                                    spacing={scale(10.8)}
                                    initialSpacing={scale(19)}
                                    hideRules
                                    frontColor={green}
                                    barBorderRadius={scale(5)}
                                    noOfSections={2}
                                    xAxisLabelTextStyle={{ ...styles.body('gray'), alignSelf: 'center' }}
                                    xAxisThickness={0}
                                    yAxisTextStyle={{ ...styles.body('gray'), alignSelf: 'center' }}
                                    yAxisLabelPrefix={'$'}
                                    yAxisThickness={0}
                                    scrollToEnd
                                    onPress={(val) => { setMonthlyOverview(val.label, val.value) }}
                                />

                            </View>

                        </View>

                        {/* Recent Transactions */}

                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: scale(15),
                                padding: scale(25),
                                paddingBottom: scale(15),
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: scale(10) }}>

                                <Text style={styles.header('black')}>Recent Transactions</Text>

                                <TouchableOpacity onPress={() => { navigation.jumpTo('TransactionStack') }}>
                                    <Text style={styles.body('gray')}>More</Text>
                                </TouchableOpacity>

                            </View>

                            <TransactionList />

                        </View>

                    </View>

                </CustomScrollView>

                {/* New Transactions Button */}

                <TouchableOpacity
                    style={{
                        borderRadius: scale(40),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: green,
                        position: 'absolute',
                        bottom: 0,
                        alignSelf: 'center',
                        gap: scale(5),
                        width: scale(140),
                        paddingVertical: scale(13),
                        marginBottom: scale(40),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}
                    onPress={() => navigation.navigate('SharedStack', {
                        screen: 'NewTransactionStartView',
                        params: {
                            transaction_id: null,
                            category_id: null,
                            returnScreen: "DashboardView",
                        }
                    })}
                >
                    <Text style={styles.subHeader('black')}>New Transaction</Text>

                    <Ionicons name={'add-sharp'} size={scale(16)} color={'black'} />

                </TouchableOpacity>

            </View>
        );
    }
};

export default DashboardView;