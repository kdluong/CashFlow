import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { green, colors } from '../../constants/constants';

function ColorList({
  selectedColor, setSelectedColor, loading, deleteLoading,
}) {
  function handleColorClick(color) {
    if (color === selectedColor) {
      setSelectedColor('');
    } else {
      setSelectedColor(color);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: scale(10),
      }}
    >
      {colors.map((color) => (
        <TouchableOpacity
          onPress={() => handleColorClick(color)}
          style={{
            height: scale(50),
            width: scale(50),
            borderRadius: 100,
            backgroundColor: color,
            borderColor: selectedColor === color ? green : '#1e1d22',
            borderWidth: scale(3),
          }}
          key={color}
          disabled={loading || deleteLoading}
        />
      ))}
    </View>
  );
}

export default ColorList;
