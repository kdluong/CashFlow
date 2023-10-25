import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { scale } from 'react-native-size-matters';
import { accentColor } from '../../constants/constants';

function CustomSwitchSelector({ handlePress, categoryColor, startIndex }) {
  const switchOptions = [
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' },
  ];

  let color = 'white';
  let index = 2;

  if (categoryColor !== undefined) {
    color = categoryColor;
  }

  if (startIndex !== undefined) {
    index = startIndex;
  }

  return (
    <SwitchSelector
      options={switchOptions}
      borderRadius={5}
      initial={index}
      textColor="gray"
      selectedColor="black"
      buttonColor={color}
      backgroundColor={accentColor}
      fontSize={scale(10)}
      bold
      onPress={handlePress}
      height={scale(33)}
    />
  );
}

export default CustomSwitchSelector;
