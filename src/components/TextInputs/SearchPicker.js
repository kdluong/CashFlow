import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';
import { scale } from 'react-native-size-matters';
import {
  transactionSortOptions,
  categorySortOptions,
  categoryLimitedSortOptions,
  accentColor,
} from '../../constants/constants';
import CustomTextInput from './CustomTextInput';

function SearchPicker({
  setFilter, setSort, option, size, dark
}) {
  let placeholder = '';
  let sortOption = [];
  let height = 0;

  if (option.toLowerCase() === 'transaction') {
    placeholder = 'Search for a transaction';
    sortOption = transactionSortOptions;
    height = 220;
  } else if (option.toLowerCase() === 'category') {
    placeholder = 'Search for a category';
    sortOption = categorySortOptions;
    height = 150;
  } else {
    placeholder = 'Search for a category';
    sortOption = categoryLimitedSortOptions;
    height = 85;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Text Input */}

      <View style={{ width: size !== undefined ? '72%' : '75%' }}>
        <CustomTextInput
          value={null}
          onChangeText={setFilter}
          placeholder={placeholder}
          loading={null}
          autoCapitalize={false}
          autoCorrect={true}
          valid={true}
          dark={dark}
        />
      </View>

      {/* Picker */}

      <View style={{ position: 'absolute', right: 0 }}>
        <SelectList
          setSelected={setSort}
          data={sortOption}
          save="value"
          fontFamily="BebasReg"
          search={false}
          defaultOption={sortOption[0]}
          inputStyles={{ fontSize: scale(14), color: 'white' }}
          dropdownTextStyles={{ fontSize: scale(14), color: 'white' }}
          arrowicon={<Ionicons name="chevron-down-sharp" size={scale(12)} color="white" />}
          boxStyles={{
            backgroundColor: accentColor,
            borderWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(5),
            width: scale(70),
            height: scale(35),
          }}
          dropdownStyles={{
            height,
            backgroundColor: accentColor,
            borderWidth: 0,
            alignItems: 'center',
            borderRadius: scale(5),
          }}
          maxHeight={height}
        />
      </View>
    </View>
  );
}

export default SearchPicker;
