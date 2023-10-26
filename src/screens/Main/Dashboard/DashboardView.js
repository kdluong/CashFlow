import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { BarChart } from 'react-native-gifted-charts';
import { UserContext } from '../../../supabase/ViewModel';
import globalStyles from '../../../styles/styles.ts';
import {
  monthNames,
  monthNamesShort,
  backgroundColor,
  green,
  accentColor,
} from '../../../constants/constants';
import OpenDrawerButton from '../../../components/Buttons/OpenDrawerButton';
import CustomScrollView from '../../../components/CustomViews/CustomScrollView';
import logo from '../../../../assets/logoClear.png';
import blankProfilePicture from '../../../../assets/blankProfilePicture.png';
import TransactionList from '../../../components/TransactionList/TransactionList';
import MonthlyOverview from '../../../components/MonthlyOverview/MonthlyOverview';

function DashboardView({ navigation }) {
  const {
    user, transactions, spendingDistribution, chartData, getUser, getAll,
  } = React.useContext(UserContext);
  const [currentMonth, setCurrentMonth] = React.useState(null);
  const [currentTotal, setCurrentTotal] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [myTransactions, setMyTransactions] = React.useState([]);

  async function handleRefresh() {
    setRefresh(true);

    await getUser();
    await getAll();

    setRefresh(false);
  }

  function setMonthlyOverview(month, total) {
    const index = monthNamesShort.indexOf(month);

    if (index > -1) {
      setCurrentMonth(monthNames[index]);
      setCurrentTotal(total);
    }
  }

  React.useEffect(() => {
    handleRefresh();
  }, []);

  React.useEffect(() => {
    const tempTransactions = [];

    for (let index = 0; index < transactions?.length; index += 1) {
      tempTransactions.push(transactions[index]);
    }

    setMyTransactions(tempTransactions);
  }, [transactions]);

  if (spendingDistribution === undefined) {
    // Loading Screen

    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          backgroundColor,
          justifyContent: 'center',
        }}
      >
        {/* Logo */}

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={globalStyles.logo}>CASHFLOW</Text>
          <Image
            style={{
              height: scale(40),
              width: scale(40),
              marginLeft: scale(5),
              marginBottom: scale(10),
            }}
            source={logo}
          />
        </View>

        {/* Slogan */}

        <Text style={globalStyles.body('white')}>Money management, redefined.</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView />

      <CustomScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => handleRefresh} tintColor="white" />
        }
      >
        {/* Header */}

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {/* Drawer & Logo */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(7) }}>
            <OpenDrawerButton onPress={() => navigation.openDrawer()} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'BebasBold', fontSize: scale(27), color: 'white' }}>
                CASHFLOW
              </Text>
              <Image
                style={{
                  height: scale(22),
                  width: scale(22),
                  marginLeft: scale(2),
                  marginBottom: scale(4),
                }}
                source={logo}
              />
            </View>
          </View>

          {/* Profile Picture */}

          <TouchableOpacity
            style={{ borderColor: 'white', borderWidth: scale(2.5), borderRadius: 100 }}
            onPress={() => navigation.jumpTo('SettingsStack')}
          >
            <Image
              source={
                user?.image != null
                  ? user.image
                  : blankProfilePicture
              }
              style={{ height: scale(45), width: scale(45), borderRadius: 100 }}
            />
          </TouchableOpacity>
        </View>

        {/* Current Expenses */}

        <View style={{ alignItems: 'center', paddingVertical: scale(40) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'BebasReg', fontSize: scale(47), color: green }}>$</Text>
            <Text style={globalStyles.logo}>
              {spendingDistribution?.year?.total}
              {' '}
            </Text>
          </View>

          <Text style={globalStyles.body('white')}>Yearly Spendings</Text>
        </View>

        {/* Options, Overview, & Recent Transactions */}

        <View
          style={{
            gap: scale(12),
            paddingBottom: Dimensions.get('screen').height < 700 ? scale(130) : scale(120),
          }}
        >
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
              <Ionicons name="receipt-sharp" size={scale(16)} color="white" />
              <Text style={globalStyles.subHeader('white')}>Transactions</Text>
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
              <Ionicons name="pie-chart-sharp" size={scale(16)} color="white" />
              <Text style={globalStyles.subHeader('white')}>Categories</Text>
            </TouchableOpacity>
          </View>

          {/* Overview Chart */}

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: scale(15),
              padding: scale(25),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={globalStyles.header('black')}>Overview</Text>

              <MonthlyOverview
                transactions={transactions}
                currentMonth={currentMonth}
                currentTotal={currentTotal}
                chartData={chartData}
              />

            </View>

            <View
              style={{
                paddingTop: scale(10),
                paddingBottom: scale(10),
                marginLeft: scale(-3),
                marginBottom: scale(-10),
                marginRight: scale(-9),
              }}
            >
              <BarChart
                data={chartData}
                height={scale(70)}
                barWidth={scale(15)}
                spacing={scale(10.8)}
                hideRules
                frontColor={green}
                barBorderRadius={scale(5)}
                noOfSections={2}
                xAxisLabelTextStyle={{ ...globalStyles.body('gray'), alignSelf: 'center' }}
                xAxisThickness={0}
                yAxisTextStyle={{ ...globalStyles.body('gray'), alignSelf: 'center' }}
                yAxisLabelPrefix="$"
                yAxisThickness={0}
                scrollToEnd
                onPress={(val) => {
                  setMonthlyOverview(val.label, val.value);
                }}
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
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: scale(10),
              }}
            >
              <Text style={globalStyles.header('black')}>Recent Transactions</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.jumpTo('TransactionStack');
                }}
              >
                <Text style={globalStyles.body('gray')}>More</Text>
              </TouchableOpacity>
            </View>

            <TransactionList myTransactions={myTransactions} navigation={navigation} />
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
          shadowColor: '#000',
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
            returnScreen: 'DashboardView',
          },
        })}
      >
        <Text style={globalStyles.subHeader('black')}>New Transaction</Text>

        <Ionicons name="add-sharp" size={scale(16)} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default DashboardView;
