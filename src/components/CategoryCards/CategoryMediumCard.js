import React from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';
import IconSmall from '../Icons/IconSmall';
import { accentColor } from '../../constants/constants.js';

function CategoryMediumCard({ category_id, total }) {
  const { categories, fetchCategory } = React.useContext(UserContext);
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    setCategory(fetchCategory(category_id));
  }, [categories]);

  return (
    <View
      style={{
        backgroundColor: accentColor,
        height: scale(105),
        width: scale(148),
        justifyContent: 'space-between',
        borderRadius: scale(10),
        padding: scale(12),
        marginBottom: scale(15),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.28,
        shadowRadius: 16.0,
        elevation: 24,
      }}
    >
      {/* Icon & Total */}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconSmall name={category?.icon} color={'white'} backgroundColor={category?.color} />

        <Text
          style={{
            ...globalStyles.subHeader('white'),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 20.0,

            elevation: 24,
          }}
          numberOfLines={1}
        >
          ${total.toFixed(2)}
        </Text>
      </View>

      {/* Name */}

      <Text
        style={{
          ...globalStyles.body('white'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 20.0,
          elevation: 24,
        }}
        numberOfLines={1}
      >
        {category?.name}
      </Text>
    </View>
  );
}

export default CategoryMediumCard;
