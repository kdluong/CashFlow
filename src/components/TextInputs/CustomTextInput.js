import React from 'react';
import { TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

// borderWidth: border === undefined ? scale(1.5) : 0,
// borderColor: '#f0f0f0',

function CustomTextInput({
  value, onChangeText, placeholder, loading, autoCapitalize, autoCorrect, valid, dark,
}) {
  return (
    <TextInput
      value={value}
      placeholderTextColor="gray"
      placeholder={placeholder}
      style={{
        width: '100%',
        height: scale(35),
        fontFamily: 'BebasReg',
        fontSize: scale(15),
        color: 'black',
        borderRadius: scale(5),
        paddingLeft: scale(10),
        paddingRight: scale(3),
        backgroundColor: dark ? '#d9d9db' : 'white',
        borderColor: valid ? 'black' : '#FF0000',
        borderWidth: valid ? 0 : scale(1.3),
      }}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
      keyboardAppearance="dark"
      editable={!loading}
      selectTextOnFocus={!loading}
      textContentType="oneTimeCode"
      autoComplete="off"
      autoCapitalize={autoCapitalize ? 'words' : 'none'}
      autoCorrect={autoCorrect}
    />
  );
}

export default CustomTextInput;
