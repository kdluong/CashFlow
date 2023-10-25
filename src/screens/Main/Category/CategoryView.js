import { Text, View, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../supabase/ViewModel';
import { CustomSwitchSelector } from '../../../components/SwitchSelector/CustomSwitchSelector';
import globalStyles from '../../../styles/styles';
import { switchOptions, backgroundColor } from '../../../constants/constants';
import TransactionSmallCard from '../../../components/TransactionCards/TransactionSmallCard';
import SearchPicker from '../../../components/TextInputs/SearchPicker';
import BackButton from '../../../components/Buttons/BackButton';
import CustomFlatListView from '../../../components/CustomViews/CustomFlatListView';

function CategoryView({ navigation, route }) {
  const { category_id, startGraph } = route.params;
  const { fetchCategory, calculateCategoryDistribution, categories, transactions, getAll } =
    React.useContext(UserContext);
  const [selectedGraph, setSelectedGraph] = React.useState(switchOptions[startGraph]?.label);
  const [refresh, setRefresh] = React.useState(false);
  const [category, setCategory] = React.useState();
  const [total, setTotal] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [sort, setSort] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [myTransactions, setTransactions] = React.useState([]);

  async function handleRefresh() {
    setRefresh(true);

    await getAll();

    setRefresh(false);
  }

  function handleSort(a, b) {
    switch (sort) {
      case 'Latest':
        return a?.date > b?.date;
      case 'Oldest':
        return a?.date < b?.date;
      case 'A-Z':
        return a?.name < b?.name;
      case 'Z-A':
        return a?.name > b?.name;
      case '$$-$':
        return a?.total > b?.total;
      default:
        return a?.total < b?.total;
    }
  }

  const renderHeader = () => (
    <View>
      {/* Header & Switch */}

      <View style={{ gap: scale(15) }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Back Button */}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>

          {/* Name */}

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={globalStyles.header('white')}>{category?.name} </Text>
            <Ionicons name={category?.icon} size={scale(16)} color="white" />
          </View>

          {/* Edit */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SharedStack', {
                screen: 'NewCategoryView',
                params: {
                  category_id,
                },
              });
            }}
            style={{ width: scale(35), alignItems: 'flex-end' }}
          >
            <Ionicons name="options-sharp" size={scale(18)} color="white" />
          </TouchableOpacity>
        </View>

        {/* Switch */}

        <CustomSwitchSelector
          categoryColor={category?.color}
          handlePress={(value) => setSelectedGraph(value)}
          startIndex={startGraph}
        />
      </View>

      {/* Total */}

      <View style={{ alignItems: 'center', paddingVertical: scale(49) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'BebasReg', fontSize: scale(47), color: category?.color }}>
            $
          </Text>
          <Text style={globalStyles.logo}>{total} </Text>
        </View>

        <Text style={globalStyles.body('white')}>{description} Spendings</Text>
      </View>

      {/* Transactions Header & Search */}

      <View
        style={{
          backgroundColor: 'white',
          paddingTop: scale(15),
          paddingHorizontal: scale(20),
          paddingBottom: scale(5),
          borderTopRightRadius: scale(15),
          borderTopLeftRadius: scale(15),
          gap: scale(7),
        }}
      >
        {/* Header & New Transaction */}

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={globalStyles.header('black')}>Transactions</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SharedStack', {
                screen: 'NewTransactionStartView',
                params: {
                  transaction_id: null,
                  category_id,
                  returnScreen: 'CategoryView',
                },
              })
            }
          >
            <Ionicons name="add-circle-sharp" size={scale(25)} color={category?.color} />
          </TouchableOpacity>
        </View>

        {/* Search Picker */}

        <SearchPicker
          setFilter={setFilter}
          setSort={setSort}
          option="transaction"
          border
          size="small"
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ paddingHorizontal: scale(20), backgroundColor: 'white' }}
      onPress={() =>
        navigation.navigate('SharedStack', {
          screen: 'TransactionView',
          params: { transaction_id: item.id },
        })
      }
      key={item.id}
      activeOpacity={0.96}
    >
      <TransactionSmallCard transaction_id={item.id} />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View
      style={{
        height: '35%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
      }}
    >
      <Text style={globalStyles.body('black')}>No Transactions</Text>
    </View>
  );

  const renderRefresh = () => (
    <RefreshControl refreshing={refresh} onRefresh={handleRefresh} tintColor="white" />
  );

  const renderFooter = () => <View style={{ height: '200%', backgroundColor: 'white' }} />;

  React.useEffect(() => {
    const data = calculateCategoryDistribution(category_id);

    setCategory(fetchCategory(category_id));

    switch (selectedGraph) {
      case '1W':
        setTotal(data?.week?.total);
        setTransactions(data?.week?.transactions);
        setDescription('Weekly');
        break;
      case '1M':
        setTotal(data?.month?.total);
        setTransactions(data?.month?.transactions);
        setDescription('Monthly');
        break;
      case '1Y':
        setTotal(data?.year?.total);
        setTransactions(data?.year?.transactions);
        setDescription('Yearly');
        break;
      default:
        setTotal(data?.all?.total);
        setTransactions(data?.all?.transactions);
        setDescription('All');
    }
  }, [transactions, categories, selectedGraph]);

  return (
    <CustomFlatListView
      ListHeaderComponentStyle={{ zIndex: 1, marginBottom: -1 }}
      data={myTransactions
        ?.filter((transaction) => transaction?.name?.toUpperCase()?.includes(filter?.toUpperCase()))
        .sort((a, b) => (handleSort(a, b) ? -1 : 1))}
      keyExtractor={(item) => item.id}
      refreshControl={renderRefresh()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader()}
      ListEmptyComponent={renderEmptyComponent()}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      ListFooterComponent={renderFooter()}
    />
  );
}

export default CategoryView;
