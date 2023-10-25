import { TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

function CustomTextInput({ value, onChangeText, placeholder, loading, border }) {
  return (
    <TextInput
      value={value}
      placeholderTextColor="gray"
      placeholder={placeholder}
      style={{
        width: '100%',
        height: scale(33),
        fontFamily: 'BebasReg',
        fontSize: scale(15),
        color: 'black',
        borderRadius: scale(5),
        paddingLeft: scale(10),
        paddingRight: scale(3),
        backgroundColor: '#f3f3f3',
        borderColor: '#f0f0f0',
        borderWidth: border == undefined ? scale(1.5) : 0,
      }}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
      autoCapitalize="words"
      keyboardAppearance="dark"
      editable={!loading}
      selectTextOnFocus={!loading}
    />
  );
}

export default CustomTextInput;
