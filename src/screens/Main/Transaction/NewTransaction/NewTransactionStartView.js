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
import { backgroundColor, accentColor } from '../../../../constants/constants';
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

  // function NumberPad() {
  //   function increaseTotal(number) {
  //     if (total < 1000000) {
  //       // limits to 9 digits
  //       setTotal((total * 10 + 0.01 * number).toFixed(2));
  //     }
  //   }

  //   function decreaseTotal() {
  //     if (total * 0.1 < 0.01) {
  //       setTotal(0.0);
  //     } else {
  //       setTotal((Math.floor((total / 10) * 100) / 100).toFixed(2));
  //     }
  //   }

  //   function handlePress(option, number) {
  //     if (option === 'increase' && !(total === 0 && number === 0)) {
  //       increaseTotal(number);
  //     } else if (option === 'decrease' && total !== 0) {
  //       decreaseTotal();
  //     }
  //   }

  //   function NumberButton(number) {
  //     return (
  //       <TouchableOpacity
  //         onPress={handlePress('increase', number)}
  //         style={{
  //           backgroundColor: 'white',
  //           width: scale(90),
  //           height: scale(48),
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
  //         }}
  //       >
  //         <Text style={{ fontFamily: 'BebasBold', fontSize: scale(30) }}>{number}</Text>
  //       </TouchableOpacity>
  //     );
  //   }

  //   return (
  //     <View
  //       style={{
  //         justifyContent: 'space-between',
  //         height: Dimensions.get('screen').height < 700 ? scale(320) : scale(405),
  //         backgroundColor: 'white',
  //         borderRadius: scale(15),
  //         padding: scale(20),
  //       }}
  //     >
  //       {/* Number Pad */}

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           flexWrap: 'wrap',
  //           marginHorizontal: scale(-7),
  //         }}
  //       >
  //         {NumberButton(1)}
  //         {NumberButton(2)}
  //         {NumberButton(3)}
  //         {NumberButton(4)}
  //         {NumberButton(5)}
  //         {NumberButton(6)}
  //         {NumberButton(7)}
  //         {NumberButton(8)}
  //         {NumberButton(9)}

  //         <View
  //           style={{
  //             width: scale(90),
  //             height: scale(48),
  //             marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
  //           }}
  //         />

  //         {NumberButton(0)}

  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'white',
  //             width: scale(90),
  //             height: scale(48),
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
  //           }}
  //           onPress={handlePress('decrease', 0)}
  //         >
  //           <Ionicons name="backspace" size={30} />
  //         </TouchableOpacity>
  //       </View>

  //       {/* Next Button */}

  //       <TouchableOpacity
  //         onPress={() => {
  //           handleNext();
  //         }}
  //         style={{
  //           height: scale(43),
  //           marginHorizontal: scale(10),
  //           borderRadius: 100,
  //           backgroundColor: 'black',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           flexDirection: 'row',
  //           shadowColor: '#000',
  //           shadowOffset: {
  //             width: 0,
  //             height: 1,
  //           },
  //           shadowOpacity: 0.22,
  //           shadowRadius: 2.22,
  //           elevation: 3,
  //         }}
  //       >
  //         <Text style={globalStyles.subHeader('white')}>Next</Text>
  //         <Ionicons name="arrow-forward-sharp" size={scale(15)} color="white" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
