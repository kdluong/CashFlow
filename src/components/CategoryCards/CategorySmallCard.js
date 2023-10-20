import { View, Text } from "react-native";
import globalStyles from "../../styles/styles";
import React from "react";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from "react-native-size-matters";

const CategorySmallCard = ({ category_id, percentage }) => {

    const { categories, fetchCategory } = React.useContext(UserContext);
    const [category, setCategory] = React.useState(null);

    React.useEffect(() => {
        setCategory(fetchCategory(category_id));
    }, [categories]);

    return (
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>

            {/* Icon & Name */}

            <View style={{ flexDirection: 'row', alignItems: "center", gap: scale(5) }}>
                <View style={{ height: scale(15), width: scale(15), backgroundColor: category?.color, borderRadius: 100 }} />
                <Text style={globalStyles.subHeader('white')}>{category?.name}</Text>
            </View>

            {/* Percent */}

            <Text style={globalStyles.body('white')}>{percentage}%</Text>

        </View>
    );
};

export default CategorySmallCard;