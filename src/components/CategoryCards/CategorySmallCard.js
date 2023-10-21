import { View, Text } from "react-native";
import globalStyles from "../../styles/styles";
import React from "react";
import { UserContext } from "../../supabase/ViewModel";
import { scale } from "react-native-size-matters";
import { accentColor } from "../../constants/constants";

const CategorySmallCard = ({ category_id, percentage }) => {

    const { categories, fetchCategory } = React.useContext(UserContext);
    const [category, setCategory] = React.useState(null);

    function getSecondaryColor(color) {

        const hexCode = color?.substr(1);
        const factor = 0.5;

        // convert the hex code to RGB values

        const r = parseInt(hexCode?.substr(0, 2), 16);
        const g = parseInt(hexCode?.substr(2, 2), 16);
        const b = parseInt(hexCode?.substr(4, 2), 16);

        // darken the RGB values by applying a factor(0.0 to 1.0)

        const darkenedR = Math.max(0, Math.round(r - r * factor));
        const darkenedG = Math.max(0, Math.round(g - g * factor));
        const darkenedB = Math.max(0, Math.round(b - b * factor));

        const darkHexCode = `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;

        return darkHexCode;
    };

    React.useEffect(() => {
        setCategory(fetchCategory(category_id));
    }, [categories]);

    return (
        <View style={{ gap: scale(4) }}>

            {/* Name & Percentage */}

            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>

                {/* Icon & Name */}

                <View style={{ flexDirection: 'row', alignItems: "center", gap: scale(5) }}>
                    {/* <View style={{ height: scale(15), width: scale(15), backgroundColor: category?.color, borderRadius: 100 }} /> */}
                    <Text style={globalStyles.body('white')}>{category?.name}</Text>
                </View>

                {/* Percent */}

                <Text style={{ fontFamily: "BebasReg", fontSize: scale(12), color: 'gray' }}>{percentage}%</Text>

            </View>

            {/* Percentage Bar */}

            <View style={{ width: "100%" }}>


                <View
                    style={{
                        height: scale(7),
                        // backgroundColor: getSecondaryColor(category?.color),
                        backgroundColor: '#3d3d3d',
                        borderRadius: scale(5),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 1.00,

                        elevation: 1,
                    }}
                />

                <View
                    style={{
                        height: scale(7),
                        width: percentage + '%',
                        backgroundColor: category?.color,
                        borderRadius: scale(5),
                        position: "absolute",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                />
            </View>

        </View>
    );
};

export default CategorySmallCard;