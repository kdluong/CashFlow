import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconLarge = ({ name, color, backgroundColor }) => {

    return (
        <View style={{
            height: scale(40),
            width: scale(40),
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor: backgroundColor,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,
        }}>
            <Ionicons name={name} size={scale(20)} color={color} style={{ marginLeft: scale(1.5) }} />
        </View>
    );
};

export default IconLarge; 