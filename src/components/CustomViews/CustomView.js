import { View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { scale } from 'react-native-size-matters';
import React from "react";

const CustomView = ({ children, style, backgroundColor }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        ...style,
                        paddingHorizontal: scale(20),
                        paddingTop: (Dimensions.get('screen').height < 700 ? scale(10) : scale(5)),
                        paddingBottom: (Dimensions.get('screen').height < 700 ? scale(20) : 0),
                    }}
                >
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default CustomView; 