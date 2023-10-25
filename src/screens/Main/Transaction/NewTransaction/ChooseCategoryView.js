import React from 'react';
import { Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../../supabase/ViewModel';
import CategoryFullCard from '../../../../components/CategoryCards/CategoryFullCard';
import globalStyles from '../../../../styles/styles';
import SearchPicker from '../../../../components/TextInputs/SearchPicker';
import BackButton from '../../../../components/Buttons/BackButton';
import CustomFlatListView from '../../../../components/CustomViews/CustomFlatListView';

function ChooseCategoryView({ navigation, route }) {
  const { category_id } = route.params;
  const { categories, getCategories } = React.useContext(UserContext);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);

  const [sort, setSort] = React.useState();
  const [filter, setFilter] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  async function handleRefresh() {
    setRefresh(true);

    await getCategories();

    setRefresh(false);
  }

  function handleClick(currCategory) {
    if (selectedCategoryId == null || selectedCategoryId != currCategory?.id) {
      navigation.navigate({
        name: 'NewTransactionStartView',
        params: { category_id: currCategory?.id },
        merge: true,
      });
    } else {
      setSelectedCategoryId(null);
    }
  }

  function handleBack() {
    navigation.navigate({
      name: 'NewTransactionStartView',
      params: { category_id: selectedCategoryId },
      merge: true,
    });
  }

  function handleSort(a, b) {
    switch (sort) {
      case 'A-Z':
        return a?.name < b?.name;
        break;
      default:
        return a?.name > b?.name;
    }
  }

  const renderHeader = () => (
    <View style={{ gap: scale(15) }}>
      {/* Header  */}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => handleBack()}>
          <BackButton />
        </TouchableOpacity>

        <Text style={globalStyles.header('white')}>Select a Category</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('NewCategoryView', { category_id: null })}
          style={{ width: scale(35), alignItems: 'flex-end' }}
        >
          <Ionicons name="add" size={scale(22)} color="#32d584" />
        </TouchableOpacity>
      </View>

      {/* Search */}

      <SearchPicker
        border={undefined}
        setFilter={setFilter}
        setSort={setSort}
        option="categoryOption"
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleClick(item)}
      key={item.id}
      style={{ justifyContent: 'center', marginBottom: scale(15) }}
    >
      <CategoryFullCard category_id={item.id} />

      <Ionicons
        name={
          selectedCategoryId != null && selectedCategoryId == item.id
            ? 'checkmark-circle-sharp'
            : 'checkmark-circle-outline'
        }
        size={scale(25)}
        style={{ position: 'absolute', alignSelf: 'center', right: scale(12) }}
      />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={{ height: '210%', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Text style={globalStyles.body('white')}>No Categories</Text>
    </View>
  );

  const renderRefresh = () => (
    <RefreshControl refreshing={refresh} onRefresh={handleRefresh} tintColor="white" />
  );

  React.useEffect(() => {
    setSelectedCategoryId(category_id);
  }, []);

  return (
    <CustomFlatListView
      ListHeaderComponentStyle={{ zIndex: 1, paddingBottom: scale(15) }}
      data={categories
        ?.filter((category) => category?.name?.toUpperCase()?.includes(filter?.toUpperCase()))
        .sort((a, b) => (handleSort(a, b) ? -1 : 1))}
      keyExtractor={(item) => item.id}
      refreshControl={renderRefresh()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader()}
      ListEmptyComponent={renderEmptyComponent()}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
    />
  );
}

export default ChooseCategoryView;
