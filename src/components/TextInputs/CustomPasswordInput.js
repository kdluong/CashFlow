import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from "react-native-size-matters";

const CustomPasswordInput = ({ value, onChangeText, placeholder, loading }) => {

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
                flexDirection: 'row'
            }}
        >

            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={'gray'}
                onChangeText={onChangeText}
                autoCapitalize='none'
                keyboardAppearance="dark"
                returnKeyType='done'
                secureTextEntry={!showPass}
                style={{
                    fontFamily: 'BebasReg',
                    color: 'black',
                    fontSize: scale(15),
                    width: '90%',
                }}
                editable={!loading}
                selectTextOnFocus={!loading}
            />

            <TouchableOpacity onPress={() => { setShowPass(!showPass) }}>
                <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={scale(18)} color={'black'} />
            </TouchableOpacity>

        </View>
    );
};

export default CustomPasswordInput;