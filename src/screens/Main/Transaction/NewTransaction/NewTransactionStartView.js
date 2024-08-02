import {
  View, Text, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../../../styles/styles.ts';
import { UserContext } from '../../../../supabase/ViewModel';
import BackButton from '../../../../components/Buttons/BackButton';
import CustomView from '../../../../components/CustomViews/CustomView';
import IconSmall from '../../../../components/Icons/IconSmall';
import { backgroundColor, accentColor, green } from '../../../../constants/constants';
import NumberPad from '../../../../components/NumberPad/NumberPad';

function NewTransactionStartView({ navigation, route }) {
  const { transaction_id, category_id, returnScreen } = route.params;
  const { fetchTransaction, fetchCategory } = React.useContext(UserContext);
  const isMounted = React.useRef(false);
  const [category, setCategory] = React.useState(null);
  const [total, setTotal] = React.useState(0.0);
  const [isConstant, setIsConstant] = React.useState(false); // prevent change of category

  function handleNext() {
    if (total !== 0.0 && category != null) {
      navigation.navigate('NewTransactionFinishView', {
        transaction_id,
        category_id: category?.id,
        total,
        returnScreen,
      });
    }
  }

  React.useEffect(() => {
    if (transaction_id != null) {
      // update transaction

      const data = fetchTransaction(transaction_id);

      setTotal(data?.transaction?.total?.toFixed(2));
      setCategory(data?.category);
    } else if (category_id != null) {
      // new transaction from category view

      setCategory(fetchCategory(category_id));
      setIsConstant(true);
    }
  }, []);

  React.useEffect(() => {
    // handle change of category

    if (isMounted.current === true) {
      if (route.params?.category_id != null) {
        setCategory(fetchCategory(route.params?.category_id));
      } else {
        setCategory(null);
      }
    } else {
      isMounted.current = true;
    }
  }, [route.params]);

  return (
    <CustomView
      backgroundColor={backgroundColor}
      style={{ flex: 1, justifyContent: 'space-between' }}
    >
      {/* Back Button */}

      <TouchableOpacity style={{ alignSelf: 'baseline' }} onPress={() => navigation.goBack()}>
        <BackButton />
      </TouchableOpacity>

      {/* Amount */}

      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'BebasReg',
              fontSize: scale(47),
              color: category == null ? '#d3d3d3' : category.color,
            }}
          >
            $
          </Text>
          <Text style={globalStyles.logo}>
            {total === 0 ? '0.00' : total}
            {' '}
          </Text>
        </View>

        <Text style={globalStyles.body('white')}>Enter an Amount</Text>
      </View>

      {/* Category & Number Pad */}

      <View style={{ gap: scale(12) }}>
        {/* Category */}

        <TouchableOpacity
          style={{
            backgroundColor: category == null ? accentColor : category.color,
            height: scale(65),
            borderRadius: scale(15),
            paddingHorizontal: scale(15),
            shadowColor: '#000',
            justifyContent: 'center',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          disabled={isConstant}
          onPress={() => navigation.navigate('ChooseCategoryView', {
            category_id: category == null ? null : category?.id,
          })}
        >
          {category == null ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ width: scale(15) }} />
              <Text style={globalStyles.subHeader('white')}>Select a Category</Text>
              <Ionicons name="chevron-forward-sharp" size={scale(15)} color="white" />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconSmall name={category?.icon} color={category?.color} backgroundColor="white" />

              <Text style={globalStyles.header('white')}>{category?.name}</Text>

              <View style={{ width: scale(35), alignItems: 'flex-end' }}>
                <Ionicons
                  name="chevron-forward-sharp"
                  size={scale(15)}
                  color={isConstant ? category?.color : 'white'}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Number Pad */}

        <NumberPad total={total} setTotal={setTotal} handleNext={() => handleNext()} />
      </View>
    </CustomView>
  );
}

export default NewTransactionStartView;
