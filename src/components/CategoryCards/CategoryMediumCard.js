import React from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';
import IconSmall from '../Icons/IconSmall';

function CategoryMediumCard({ category_id, total }) {
  const { categories, fetchCategory } = React.useContext(UserContext);
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    setCategory(fetchCategory(category_id));
  }, [categories]);

  // maybe remove dependency

  return (
    <View
      style={{
        backgroundColor: category?.color,
        height: scale(100),
        width: scale(148),
        justifyContent: 'space-between',
        borderRadius: scale(5),
        padding: scale(12),
        marginBottom: scale(15),
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
      {/* Icon & Total */}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconSmall name={category?.icon} color={category?.color} backgroundColor="white" />

        <Text
          style={{
            ...globalStyles.body('white'),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}
          numberOfLines={1}
        >
          - $
          {total.toFixed(2)}
        </Text>
      </View>

      {/* Name */}

      <Text
        style={{
          ...globalStyles.subHeader('white'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

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
