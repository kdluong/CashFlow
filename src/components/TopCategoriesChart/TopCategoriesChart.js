import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import uuid from 'react-uuid';
import { accentColor, switchOptions } from '../../constants/constants';
import globalStyles from '../../styles/styles.ts';
import CategorySmallCard from '../CategoryCards/CategorySmallCard';

function TopCategoriesChart({
  categories, total, selectedGraph, navigation,
}) {
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
          ?.splice(0, 4)
          .map((category) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CategoryView', {
                category_id: category?.id,
                startGraph: switchOptions.findIndex((item) => item?.label === selectedGraph),
              })}
              key={uuid()}
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

export default TopCategoriesChart;
