import {
  Text, TouchableOpacity, View, RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../supabase/ViewModel';
import CustomSwitchSelector from '../../../components/SwitchSelector/CustomSwitchSelector';
import globalStyles from '../../../styles/styles.ts';
import CategoryMediumCard from '../../../components/CategoryCards/CategoryMediumCard';
import SearchPicker from '../../../components/TextInputs/SearchPicker';
import {
  switchOptions, green,
} from '../../../constants/constants';
import OpenDrawerButton from '../../../components/Buttons/OpenDrawerButton';
import CustomFlatListView from '../../../components/CustomViews/CustomFlatListView';
import SpendingDistributionChart from '../../../components/SpendingDistributionChart/SpendingDistributionChart';
import TopCategoriesChart from '../../../components/TopCategoriesChart/TopCategoriesChart';

function CategoryAllView({ navigation }) {
  const { categories, spendingDistribution, getAll } = React.useContext(UserContext);
  const [sort, setSort] = React.useState();
  const [filter, setFilter] = React.useState('');
  const [selectedGraph, setSelectedGraph] = React.useState('1Y');
  const [total, setTotal] = React.useState('0.00');
  const [myCategories, setCategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  async function handleRefresh() {
    setRefresh(true);

    await getAll();

    setRefresh(false);
  }

  function handleSort(a, b) {
    let sortChoice;

    switch (sort) {
      case 'A-Z':
        sortChoice = a?.name < b?.name;
        break;
      case 'Z-A':
        sortChoice = a?.name > b?.name;
        break;
      case '$-$$':
        sortChoice = a?.value < b?.value;
        break;
      default:
        sortChoice = a?.value > b?.value;
    }

    return sortChoice;
  }

  const renderHeader = () => (
    <View style={{ gap: scale(20) }}>
      {/* Header */}

      <View style={{ gap: scale(10) }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {/* Open Drawer */}

          <OpenDrawerButton onPress={() => navigation.openDrawer()} />

          {/* Name & Icon */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>
            <Text style={globalStyles.header('white')}>Categories</Text>
            <Ionicons name="pie-chart" size={scale(16)} color="white" />
          </View>

          {/* New Category */}

          <TouchableOpacity
            onPress={() => navigation.navigate('SharedStack', {
              screen: 'NewCategoryView',
              params: {
                category_id: null,
              },
            })}
          >
            <Ionicons name="add" size={scale(25)} color={green} />
          </TouchableOpacity>
        </View>

        {/* Switch */}

        <CustomSwitchSelector
          handlePress={(value) => setSelectedGraph(value)}
          startIndex={2}
        />
      </View>

      {/* Category Analytics */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Spending Distribution */}

        <SpendingDistributionChart
          categories={myCategories}
          total={total}
        />

        {/* Top Categories */}

        <TopCategoriesChart
          categories={myCategories}
          total={total}
          selectedGraph={selectedGraph}
          navigation={navigation}
        />
      </View>

      {/* Search  & Categories */}

      <View style={{ gap: scale(10) }}>

        <SearchPicker
          setFilter={setFilter}
          setSort={setSort}
          option="category"
          border={undefined}
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryView', {
        category_id: item?.id,
        startGraph: switchOptions.findIndex((graph) => graph?.label === selectedGraph),
      })}
      key={item?.id}
    >
      <CategoryMediumCard category_id={item?.id} total={item?.value} />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={{ height: '35%', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Text style={globalStyles.body('white')}>No Categories</Text>
    </View>
  );

  const renderRefresh = () => (
    <RefreshControl refreshing={refresh} onRefresh={() => handleRefresh()} tintColor="white" />
  );

  React.useEffect(() => {
    let copiedArray = [];

    switch (selectedGraph) {
      case '1W':

        if (spendingDistribution?.week?.categories !== undefined) {
          copiedArray = [...spendingDistribution.week.categories];
          copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));
        }
        setTotal(spendingDistribution?.week?.total);

        break;
      case '1M':

        if (spendingDistribution?.month?.categories !== undefined) {
          copiedArray = [...spendingDistribution.month.categories];
          copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));
          setTotal(spendingDistribution?.month?.total);
        }

        break;
      case '1Y':

        if (spendingDistribution?.year?.categories !== undefined) {
          copiedArray = [...spendingDistribution.year.categories];
          copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));
          setTotal(spendingDistribution?.year?.total);
        }

        break;
      default:

        if (spendingDistribution?.all?.categories !== undefined) {
          copiedArray = [...spendingDistribution.all.categories];
          copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));
          setTotal(spendingDistribution?.all?.total);
        }
    }

    setCategories(copiedArray);

  }, [categories, selectedGraph, spendingDistribution]);

  return (
    <CustomFlatListView
      ListHeaderComponentStyle={{ paddingBottom: scale(15), zIndex: 1 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      data={myCategories
        ?.filter((category) => category?.name?.toUpperCase()?.includes(filter?.toUpperCase()))
        .sort((a, b) => (handleSort(a, b) ? -1 : 1))}
      keyExtractor={(item) => item.id}
      refreshControl={renderRefresh()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader()}
      ListEmptyComponent={renderEmptyComponent()}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      numColumns={2}
    />
  );
}

export default CategoryAllView;
