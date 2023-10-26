import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { accentColor, green, icons } from '../../constants/constants';

function IconList({
  selectedIcon, setSelectedIcon, loading, deleteLoading,
}) {
  function handleIconClick(icon) {
    if (icon === selectedIcon) {
      setSelectedIcon('');
    } else {
      setSelectedIcon(icon);
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
      {icons.map((icon) => (
        <TouchableOpacity
          onPress={() => handleIconClick(icon)}
          style={{
            padding: scale(15),
            backgroundColor: accentColor,
            borderRadius: scale(8),
            borderWidth: scale(3),
            borderColor: selectedIcon === icon ? green : '#1e1d22',
          }}
          key={icon}
          disabled={loading || deleteLoading}
        >
          <Ionicons name={icon} size={scale(25)} color="white" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default IconList;
