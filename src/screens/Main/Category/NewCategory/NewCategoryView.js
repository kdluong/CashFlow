import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from "../../../../supabase/ViewModel";
import { colors, icons, backgroundColor, green, accentColor } from "../../../../constants/constants";
import CustomTextInput from "../../../../components/TextInputs/CustomTextInput";
import { scale } from 'react-native-size-matters';
import BackButton from "../../../../components/Buttons/BackButton";
import CustomScrollView from "../../../../components/CustomViews/CustomScrollView";
import globalStyles from "../../../../styles/styles";

const NewCategoryView = ({ navigation, route }) => {

    const { category_id } = route.params;
    const { categories, fetchCategory, createCategory, updateCategory, deleteCategory } = React.useContext(UserContext);

    const [name, setName] = React.useState('');
    const [selectedColor, setSelectedColor] = React.useState('');
    const [selectedIcon, setSelectedIcon] = React.useState('');

    const [isUpdate, setIsUpdate] = React.useState(false);
    const [category, setCategory] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    const ColorList = () => {

        function handleColorClick(color) {
            if (color == selectedColor) {
                setSelectedColor('');
            }
            else {
                setSelectedColor(color);
            }
        }

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: scale(10) }}>
                {colors.map((color, index) =>
                    <TouchableOpacity
                        onPress={() => handleColorClick(color)}
                        style={{ height: scale(50), width: scale(50), borderRadius: 100, backgroundColor: color, borderColor: (selectedColor == color ? green : '#1e1d22'), borderWidth: scale(3) }}
                        key={index}
                        disabled={loading || deleteLoading}
                    />
                )}
            </View>
        );
    };

    const IconList = () => {

        function handleIconClick(icon) {
            if (icon == selectedIcon) {
                setSelectedIcon('');
            }
            else {
                setSelectedIcon(icon);
            }
        }

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: scale(10) }}>
                {icons.map((icon, index) =>
                    <TouchableOpacity
                        onPress={() => handleIconClick(icon)}
                        style={{ padding: scale(15), backgroundColor: accentColor, borderRadius: scale(8), borderWidth: scale(3), borderColor: (selectedIcon == icon ? green : '#1e1d22') }}
                        key={index}
                        disabled={loading || deleteLoading}
                    >
                        <Ionicons name={icon} size={scale(25)} color={'white'} />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    async function handleComplete() {

        if (isUpdate &&
            category?.name == name &&
            category?.icon == selectedIcon &&
            category?.color == selectedColor) {

            navigation.goBack();
        }
        else {
            var exists = false;

            if (!isUpdate || category?.name != name) {

                for (let index = 0; index < categories.length; index++) {
                    if (categories[index].name == name) {
                        exists = true;
                        Alert.alert('Category name already in use.', '\nPlease choose another category name.');
                        break;
                    }
                }
            }

            if (!exists) {

                setLoading(true);

                if (isUpdate) {

                    await updateCategory(category_id, name, selectedColor, selectedIcon);
                }
                else {
                    await createCategory(name, selectedColor, selectedIcon);
                }

                setLoading(false);

                navigation.goBack();
            }
        }

    };

    async function handleDelete() {

        setDeleteLoading(true);
        await deleteCategory(category_id);
        setDeleteLoading(false);

        navigation.pop(2);
    };

    React.useEffect(() => {

        // if updating category, initialize name, color,  & icon

        if (category_id != null) {

            const tempCategory = fetchCategory(category_id);

            setIsUpdate(true);
            setCategory(tempCategory);
            setName(tempCategory?.name);
            setSelectedColor(tempCategory?.color);
            setSelectedIcon(tempCategory?.icon);
        }

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>

            <SafeAreaView />

            <CustomScrollView style={{ gap: scale(15), paddingBottom: scale(50) }}>

                {/* Header */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Back Button */}

                    <TouchableOpacity
                        disabled={loading}
                        onPress={() => navigation.goBack()}
                    >
                        <BackButton />
                    </TouchableOpacity>

                    <Text style={globalStyles.header('white')}>{isUpdate ? "Edit" : "New"} Category</Text>

                    {/* Icon & Loading */}

                    {
                        loading
                            ?
                            <ActivityIndicator color={'white'} style={{ width: scale(35) }} />
                            :
                            <TouchableOpacity
                                onPress={() => { handleComplete() }}
                                disabled={name == '' || selectedColor == '' || selectedIcon == '' || deleteLoading}
                                style={{ width: scale(35), alignItems: "flex-end" }}
                            >
                                <Ionicons
                                    name="checkmark-done-sharp"
                                    size={scale(22)}
                                    color={

                                        deleteLoading
                                            ?
                                            backgroundColor
                                            :
                                            name == '' || selectedColor == '' || selectedIcon == ''
                                                ?
                                                'gray'
                                                :
                                                green
                                    }
                                />
                            </TouchableOpacity>
                    }

                </View>

                {/* Info */}

                {!isUpdate &&
                    <Text style={globalStyles.body('#d3d3d3')}>
                        Keep track of your finances by entering a new category name, choosing a color, and selecting an icon.
                    </Text>
                }

                {/* Text Input */}

                <Text style={globalStyles.subHeader('white')}>Choose a Name</Text>

                <CustomTextInput
                    value={name}
                    onChangeText={setName}
                    placeholder={'Enter category name'}
                    loading={loading || deleteLoading}
                />

                {/* Color List */}

                <Text style={globalStyles.subHeader('white')}>Choose a Color</Text>

                <ColorList />

                {/* Icon List */}

                <Text style={globalStyles.subHeader('white')}>Choose an Icon</Text>

                <IconList />

                {/* Delete Category Button ** FIX THIS ** */}

                {
                    isUpdate &&

                    <TouchableOpacity
                        onPress={() => handleDelete()}
                        disabled={loading || deleteLoading}
                        style={{
                            paddingVertical: scale(13),
                            borderRadius: scale(40),
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,
                            elevation: 1,
                        }}
                    >

                        {deleteLoading
                            ?
                            <ActivityIndicator color={'white'} />
                            :
                            <Text style={globalStyles.subHeader('white')}>Delete Category</Text>
                        }

                    </TouchableOpacity>
                }

            </CustomScrollView>

        </View>
    );
};

export default NewCategoryView;