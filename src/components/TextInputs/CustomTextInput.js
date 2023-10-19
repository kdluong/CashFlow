import React from "react";
import { TextInput } from "react-native";
import { scale } from "react-native-size-matters";

const CustomTextInput = ({ value, onChangeText, placeholder, loading, border }) => {

    return (
        <TextInput
            value={value}
            placeholderTextColor={'gray'}
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
                backgroundColor: 'white',
                borderWidth: (border != undefined ? scale(1) : 0)
            }}
            onChangeText={onChangeText}
            clearButtonMode={'while-editing'}
            autoCapitalize='words'
            keyboardAppearance='dark'
            editable={!loading}
            selectTextOnFocus={!loading}
        />
    );
};

export default CustomTextInput;