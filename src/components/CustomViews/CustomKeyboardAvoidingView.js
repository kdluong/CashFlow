import { View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { scale } from 'react-native-size-matters';
import React from "react";

const CustomKeyboardAvoidingView = ({ children, style }) => {

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            ...style,
                            paddingHorizontal: scale(20),
                            paddingVertical: (Dimensions.get('screen').height < 700 ? scale(10) : scale(5)),
                        }}
                    >
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CustomKeyboardAvoidingView; 