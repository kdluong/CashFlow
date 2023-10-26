import { View, Text } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';

function CategorySmallCard({ category_id, percentage }) {
  const { categories, fetchCategory } = React.useContext(UserContext);
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    setCategory(fetchCategory(category_id));
  }, [categories]);

  return (
    <View style={{ gap: scale(4) }}>
      {/* Name & Percentage */}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Icon & Name */}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>
          <Text style={globalStyles.body('white')}>{category?.name}</Text>
        </View>

        {/* Percent */}

        <Text style={{ fontFamily: 'BebasReg', fontSize: scale(12), color: 'gray' }}>
          {Number.isNaN(parseFloat(percentage)) ? 0 : percentage}
          %
        </Text>
      </View>

      {/* Percentage Bar */}

      <View style={{ width: '100%' }}>
        <View
          style={{
            height: scale(7),
            backgroundColor: '#3d3d3d',
            borderRadius: scale(5),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        />

        <View
          style={{
            height: scale(7),
            width: `${percentage}%`,
            backgroundColor: category?.color,
            borderRadius: scale(5),
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        />
      </View>
    </View>
  );
}

export default CategorySmallCard;
