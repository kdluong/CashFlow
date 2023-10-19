import { View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, ScrollView } from "react-native";
import { scale } from 'react-native-size-matters';
import React from "react";

const CustomScrollView = ({ children, style, refreshControl }) => {

    return (
        <ScrollView
            scrollIndicatorInsets={{ right: 1 }}
            contentContainerStyle={{
                ...style,
                paddingHorizontal: scale(20),
                paddingTop: (Dimensions.get('screen').height < 700 ? scale(10) : scale(5))
            }}
            refreshControl={refreshControl}
        >
            {children}
        </ScrollView>
    );
};

export default CustomScrollView; 