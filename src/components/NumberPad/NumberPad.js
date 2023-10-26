import React from 'react';
import {
  TouchableOpacity, Text, Dimensions, View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../styles/styles.ts';
import NumberButton from './NumberButton';

function NumberPad({ total, setTotal, handleNext }) {
  function decreaseTotal() {
    if (total * 0.1 < 0.01) {
      setTotal(0.0);
    } else {
      setTotal((Math.floor((total / 10) * 100) / 100).toFixed(2));
    }
  }

  return (
    <View
      style={{
        justifyContent: 'space-between',
        height: Dimensions.get('screen').height < 700 ? scale(320) : scale(405),
        backgroundColor: 'white',
        borderRadius: scale(15),
        padding: scale(20),
      }}
    >
      {/* Number Pad */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginHorizontal: scale(-7),
        }}
      >
        <NumberButton number={1} total={total} setTotal={setTotal} />
        <NumberButton number={2} total={total} setTotal={setTotal} />
        <NumberButton number={3} total={total} setTotal={setTotal} />
        <NumberButton number={4} total={total} setTotal={setTotal} />
        <NumberButton number={5} total={total} setTotal={setTotal} />
        <NumberButton number={6} total={total} setTotal={setTotal} />
        <NumberButton number={7} total={total} setTotal={setTotal} />
        <NumberButton number={8} total={total} setTotal={setTotal} />
        <NumberButton number={9} total={total} setTotal={setTotal} />

        <View
          style={{
            width: scale(90),
            height: scale(48),
            marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
          }}
        />

        <NumberButton number={0} total={total} setTotal={setTotal} />

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: scale(90),
            height: scale(48),
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
          }}
          onPress={() => decreaseTotal()}
        >
          <Ionicons name="backspace" size={30} />
        </TouchableOpacity>
      </View>

      {/* Next Button */}

      <TouchableOpacity
        onPress={() => {
          handleNext();
        }}
        style={{
          height: scale(43),
          marginHorizontal: scale(10),
          borderRadius: 100,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <Text style={globalStyles.subHeader('white')}>Next</Text>
        <Ionicons name="arrow-forward-sharp" size={scale(15)} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default NumberPad;
