import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';

function CustomPasswordInput({
  value, onChangeText, placeholder, loading, valid
}) {
  const [showPass, setShowPass] = React.useState(false);

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: scale(33),
        paddingHorizontal: scale(10),
        borderRadius: scale(5),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: valid ? 'black' : '#FF0000',
        borderWidth: valid ? 0 : scale(1.3),
      }}
    >
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="gray"
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="done"
        secureTextEntry={!showPass}
        style={{
          fontFamily: 'BebasReg',
          color: 'black',
          fontSize: scale(15),
          width: '90%'
        }}
        editable={!loading}
        selectTextOnFocus={!loading}
        textContentType='oneTimeCode'
        autoComplete='off'
      />

      <TouchableOpacity
        onPress={() => {
          setShowPass(!showPass);
        }}
        disabled={loading}
      >
        <Ionicons
          name={showPass ? 'eye-outline' : 'eye-off-outline'}
          size={scale(18)}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

export default CustomPasswordInput;
