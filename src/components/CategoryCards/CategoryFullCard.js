import { Text, View } from "react-native";
import globalStyles from "../../styles/styles";
import React from "react";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from 'react-native-size-matters';
import IconSmall from "../Icons/IconSmall";

const CategoryFullCard = ({ category_id }) => {

    const { fetchCategory, categories } = React.useContext(UserContext);
    const [category, setCategory] = React.useState(null);

    React.useEffect(() => {
        setCategory(fetchCategory(category_id));
    }, [categories]);

    return (
        <View
            style={{
                backgroundColor: category?.color,
                height: scale(65),
                borderRadius: scale(15),
                paddingHorizontal: scale(15),
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,
                elevation: 1,
            }}
        >

            <IconSmall name={category?.icon} color={category?.color} backgroundColor={'white'} />

            <Text style={globalStyles.header('white')}>{category?.name}</Text>

            <View style={{ width: scale(35) }} />

        </View>
    );
};

export default CategoryFullCard; 