import { Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../supabase/ViewModel';
import { CustomSwitchSelector } from '../../../components/SwitchSelector/CustomSwitchSelector';
import globalStyles from '../../../styles/styles';
import CategoryMediumCard from '../../../components/CategoryCards/CategoryMediumCard';
import CategorySmallCard from '../../../components/CategoryCards/CategorySmallCard';
import SearchPicker from '../../../components/TextInputs/SearchPicker';
import { switchOptions, backgroundColor, green, accentColor } from '../../../constants/constants';
import OpenDrawerButton from '../../../components/Buttons/OpenDrawerButton';
import CustomFlatListView from '../../../components/CustomViews/CustomFlatListView';

function CategoryAllView({ navigation }) {
  const { spendingDistribution, getAll } = React.useContext(UserContext);
  const [sort, setSort] = React.useState();
  const [filter, setFilter] = React.useState('');
  const [selectedGraph, setSelectedGraph] = React.useState('1Y');
  const [total, setTotal] = React.useState('0.00');
  const [categories, setCategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  function SpendingDistribution() {
    const copiedArray = [...categories];

    return (
      <View
        style={{
          gap: scale(15),
          width: '48%',
          alignItems: 'center',
          backgroundColor: accentColor,
          padding: scale(15),
          borderRadius: scale(10),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <Text style={{ ...globalStyles.subHeader('white') }}>Spending Distribution</Text>

        <PieChart
          data={total == 0 ? [{ value: 1, color: 'white' }] : copiedArray}
          radius={scale(60)}
          innerRadius={scale(42)}
          strokeWidth={scale(1)}
          strokeColor={accentColor}
          innerCircleColor={accentColor}
          centerLabelComponent={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'BebasReg', fontSize: scale(15), color: 'white' }}>$</Text>
              <Text style={{ ...globalStyles.subHeader('white') }} numberOfLines={1}>
                {total}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }

  function TopCategories() {
    const copiedArray = [...categories];

    return (
      <View
        style={{
          backgroundColor: accentColor,
          gap: scale(10),
          width: '48%',
          alignItems: 'center',
          padding: scale(15),
          borderRadius: scale(10),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <Text style={{ ...globalStyles.subHeader('white'), alignSelf: 'center' }}>
          Top Categories
        </Text>

        <View style={{ gap: scale(8), width: scale(120) }}>
          {copiedArray
            ?.filter((a) => a.value != 0)
            .splice(0, 4)
            .map((category, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryView', {
                    category_id: category?.id,
                    startGraph: switchOptions.findIndex((item) => item?.label == selectedGraph),
                  })
                }
                key={index}
              >
                <CategorySmallCard
                  category_id={category?.id}
                  percentage={((parseFloat(category?.value) / parseFloat(total)) * 100).toFixed(0)}
                />
              </TouchableOpacity>
            ))}
        </View>

        {/* <View /> */}
      </View>
    );
  }

  async function handleRefresh() {
    setRefresh(true);

    await getAll();

    setRefresh(false);
  }

  function handleSort(a, b) {
    switch (sort) {
      case 'A-Z':
        return a?.name < b?.name;
        break;
      case 'Z-A':
        return a?.name > b?.name;
        break;
      case '$-$$':
        return a?.value < b?.value;
        break;
      default:
    }
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
            onPress={() =>
              navigation.navigate('SharedStack', {
                screen: 'NewCategoryView',
                params: {
                  category_id: null,
                },
              })
            }
          >
            <Ionicons name="add" size={scale(25)} color={green} />
          </TouchableOpacity>
        </View>

        {/* Switch */}

        <CustomSwitchSelector
          handlePress={(value) => {
            value != selectedGraph && setSelectedGraph(value);
          }}
          startIndex={2}
        />
      </View>

      {/* Category Analytics */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* Spending Distribution */}

        <SpendingDistribution />

        {/* Top Categories */}

        <TopCategories />
      </View>

      {/* Search  & Categories */}

      <View style={{ gap: scale(10) }}>
        {/* <Text style={globalStyles.header('white')}>All Categories</Text> */}

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
      onPress={() =>
        navigation.navigate('CategoryView', {
          category_id: item?.id,
          startGraph: switchOptions.findIndex((item) => item?.label == selectedGraph),
        })
      }
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
    <RefreshControl refreshing={refresh} onRefresh={handleRefresh} tintColor="white" />
  );

  React.useEffect(() => {
    let copiedArray = [];

    switch (selectedGraph) {
      case '1W':
        copiedArray = [...spendingDistribution?.week?.categories];
        copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));

        setCategories(copiedArray);
        setTotal(spendingDistribution?.week?.total);

        break;
      case '1M':
        copiedArray = [...spendingDistribution?.month?.categories];
        copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));

        setCategories(copiedArray);
        setTotal(spendingDistribution?.month?.total);

        break;
      case '1Y':
        copiedArray = [...spendingDistribution?.year?.categories];
        copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));

        setCategories(copiedArray);
        setTotal(spendingDistribution?.year?.total);

        break;
      default:
        copiedArray = [...spendingDistribution?.all?.categories];
        copiedArray.sort((a, b) => (a.value > b.value ? -1 : 1));

        setCategories(copiedArray);
        setTotal(spendingDistribution?.all?.total);
    }
  }, [selectedGraph, spendingDistribution]);

  return (
    <CustomFlatListView
      ListHeaderComponentStyle={{ paddingBottom: scale(15), zIndex: 1 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      data={categories
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
