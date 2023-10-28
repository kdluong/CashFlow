import React from 'react';
import {
  SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { UserContext } from '../../../../supabase/ViewModel';
import {
  backgroundColor,
  green,
} from '../../../../constants/constants';
import CustomTextInput from '../../../../components/TextInputs/CustomTextInput';
import BackButton from '../../../../components/Buttons/BackButton';
import CustomScrollView from '../../../../components/CustomViews/CustomScrollView';
import globalStyles from '../../../../styles/styles.ts';
import IconList from '../../../../components/Icons/IconList';
import ColorList from '../../../../components/Icons/ColorList';
import { validRegex } from '../../../../constants/constants';

function NewCategoryView({ navigation, route }) {
  const { category_id } = route.params;
  const {
    categories, fetchCategory, createCategory, updateCategory, deleteCategory,
  } = React.useContext(UserContext);

  const [name, setName] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  const [selectedIcon, setSelectedIcon] = React.useState('');

  const [isUpdate, setIsUpdate] = React.useState(false);
  const [category, setCategory] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const [validName, setValidName] = React.useState(true);
  let tempValidName = true;

  async function handleComplete() {
    if (
      isUpdate
      && category?.name === name
      && category?.icon === selectedIcon
      && category?.color === selectedColor
    ) {
      navigation.goBack();
    } else {
      let exists = false;

      if (!isUpdate || category?.name !== name) {
        for (let index = 0; index < categories.length; index += 1) {
          if (categories[index].name === name) {
            exists = true;
            Alert.alert('Category name already in use.', '\nPlease choose another category name.');
            break;
          }
        }
      }

      if (!exists) {

        // Name Validation
        if (!validRegex.test(name)) {
          tempValidName = false;
          setValidName(tempValidName);
        }
        else {
          tempValidName = true;
          setValidName(tempValidName);
        }

        if (tempValidName) {

          setLoading(true);

          if (isUpdate) {
            await updateCategory(category_id, name, selectedColor, selectedIcon);
          } else {
            await createCategory(name, selectedColor, selectedIcon);
          }

          setLoading(false);

          navigation.goBack();
        }
      }
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await deleteCategory(category_id);
    setDeleteLoading(false);

    navigation.pop(2);
  }

  function handleCompleteColor() {
    let completeColor = backgroundColor;

    if (!deleteLoading) {
      if (name === '' || selectedColor === '' || selectedIcon === '') {
        completeColor = 'gray';
      } else {
        completeColor = green;
      }
    }

    return completeColor;
  }

  React.useEffect(() => {
    // if updating category, initialize name, color,  & icon

    if (category_id != null) {
      const tempCategory = fetchCategory(category_id);

      setIsUpdate(true);
      setCategory(tempCategory);
      setName(tempCategory?.name);
      setSelectedColor(tempCategory?.color);
      setSelectedIcon(tempCategory?.icon);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView />

      <CustomScrollView style={{ gap: scale(15), paddingBottom: scale(50) }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Back Button */}

          <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>

          <Text style={globalStyles.header('white')}>
            {isUpdate ? 'Edit' : 'New'}
            {' '}
            Category
          </Text>

          {/* Icon & Loading */}

          {loading ? (
            <ActivityIndicator color="white" style={{ width: scale(35) }} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleComplete();
              }}
              disabled={name === '' || selectedColor === '' || selectedIcon === '' || deleteLoading}
              style={{ width: scale(35), alignItems: 'flex-end' }}
            >
              <Ionicons
                name="checkmark-done-sharp"
                size={scale(22)}
                color={handleCompleteColor()}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Info */}

        {!isUpdate && (
          <Text style={globalStyles.body('#d3d3d3')}>
            Keep track of your finances by entering a new category name, choosing a color, and
            selecting an icon.
          </Text>
        )}

        {/* Text Input */}

        <Text style={globalStyles.subHeader('white')}>Choose a Name</Text>

        <CustomTextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter category name"
          loading={loading || deleteLoading}
          autoCapitalize={true}
          autoCorrect={true}
          valid={validName}
          dark={false}
        />

        {/* Color List */}

        <Text style={globalStyles.subHeader('white')}>Choose a Color</Text>

        <ColorList
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          loading={loading}
          deleteLoading={deleteLoading}
        />

        {/* Icon List */}

        <Text style={globalStyles.subHeader('white')}>Choose an Icon</Text>

        <IconList
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          loading={loading}
          deleteLoading={deleteLoading}
        />

        {/* Delete Category Button ** FIX THIS ** */}

        {isUpdate && (
          <TouchableOpacity
            onPress={() => handleDelete()}
            disabled={loading || deleteLoading}
            style={{
              paddingVertical: scale(13),
              borderRadius: scale(40),
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            }}
          >
            {deleteLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={globalStyles.subHeader('white')}>Delete Category</Text>
            )}
          </TouchableOpacity>
        )}
      </CustomScrollView>
    </View>
  );
}

export default NewCategoryView;
