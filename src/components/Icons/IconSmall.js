import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconSmall({ name, color, backgroundColor }) {
  return (
    <View
      style={{
        height: scale(35),
        width: scale(35),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}
    >
      <Ionicons name={name} size={scale(15)} color={color} style={{ marginLeft: scale(1) }} />
    </View>
  );
}

export default IconSmall;
