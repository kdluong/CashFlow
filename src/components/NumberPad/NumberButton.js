import React from 'react';
import { TouchableOpacity, Dimensions, Text } from 'react-native';
import { scale } from 'react-native-size-matters';

function NumberButton({ number, total, setTotal }) {
  function handlePress() {
    if (!(total === 0 && number === 0) && total < 1000000) {
      // limits to 9 digits
      setTotal((total * 10 + 0.01 * number).toFixed(2));
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handlePress(number)}
      style={{
        backgroundColor: 'white',
        width: scale(90),
        height: scale(48),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Dimensions.get('screen').height < 700 ? scale(4) : scale(15),
      }}
    >
      <Text style={{ fontFamily: 'BebasBold', fontSize: scale(30) }}>{number}</Text>
    </TouchableOpacity>
  );
}

export default NumberButton;
