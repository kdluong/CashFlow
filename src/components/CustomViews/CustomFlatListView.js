import { View, SafeAreaView, Dimensions, FlatList } from "react-native";
import { scale } from 'react-native-size-matters';

const CustomFlatListView = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#17181a' }}>

            <SafeAreaView />

            <FlatList
                scrollIndicatorInsets={{ right: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: scale(20),
                    paddingBottom: (Dimensions.get('screen').height < 700 ? scale(5) : scale(15)),
                    paddingTop: (Dimensions.get('screen').height < 700 ? scale(10) : scale(5))
                }}
                {...props}
            />

        </View>
    );
};

export default CustomFlatListView; 