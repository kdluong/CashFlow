import { Text, TouchableOpacity, View, RefreshControl } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from "../../../supabase/ViewModel";
import React from "react";
import { CustomSwitchSelector } from "../../../components/SwitchSelector/CustomSwitchSelector";
import { PieChart } from "react-native-gifted-charts";
import globalStyles from "../../../styles/styles";
import { scale } from 'react-native-size-matters';
import CategoryMediumCard from "../../../components/CategoryCards/CategoryMediumCard";
import CategorySmallCard from "../../../components/CategoryCards/CategorySmallCard";
import SearchPicker from "../../../components/TextInputs/SearchPicker";
import { switchOptions, backgroundColor, green } from "../../../constants/constants";
import OpenDrawerButton from "../../../components/Buttons/OpenDrawerButton";
import CustomFlatListView from "../../../components/CustomViews/CustomFlatListView";

const CategoryAllView = ({ navigation }) => {

    const { spendingDistribution, getAll } = React.useContext(UserContext);
    const [sort, setSort] = React.useState();
    const [filter, setFilter] = React.useState('');
    const [selectedGraph, setSelectedGraph] = React.useState("1Y");
    const [total, setTotal] = React.useState('0.00');
    const [categories, setCategories] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    const PieChartDistribution = () => {

        return (
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>

                {/* Pie Chart */}

                <View style={{ overflow: 'hidden', marginBottom: scale(-14) }}>
                    <PieChart
                        data={total == 0 ? [{ value: 1, color: 'white' }] : categories.sort((a, b) => a.value > b.value ? -1 : 1)}
                        radius={scale(70)}
                        innerRadius={scale(50)}
                        strokeWidth={scale(2)}
                        strokeColor={backgroundColor}
                        innerCircleColor={backgroundColor}
                        centerLabelComponent={() => {
                            return (
                                <Text style={globalStyles.header('white')} numberOfLines={1}>${total}</Text>
                            );
                        }}
                    />
                </View>

                {/* Top Categories */}

                <View style={{ gap: scale(15), width: scale(130) }}>

                    {
                        categories?.filter(a => a.value != 0).splice(0, 3).map((category, index) =>
                            <View key={index}>
                                <CategorySmallCard category_id={category?.id} percentage={((parseFloat(category?.value) / parseFloat(total)) * 100).toFixed(0)} />
                            </View>
                        )
                    }

                </View>

            </View>
        );
    };

    async function handleRefresh() {

        setRefresh(true);

        await getAll();

        setRefresh(false);
    };

    function handleSort(a, b) {

        switch (sort) {
            case "A-Z":
                return (a?.name < b?.name)
                break;
            case "Z-A":
                return (a?.name > b?.name)
                break;
            case "$$-$":
                return (a?.value > b?.value)
                break;
            default:
                return (a?.value < b?.value)
        }
    };

    const renderHeader = () => {
        return (
            <View style={{ gap: scale(20) }}>

                {/* Header */}

                <View style={{ gap: scale(10) }}>

                    {/* Header */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>

                        {/* Open Drawer */}

                        <OpenDrawerButton onPress={() => navigation.openDrawer()} />

                        {/* Name & Icon */}

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(5) }}>
                            <Text style={globalStyles.header('white')}>Categories</Text>
                            <Ionicons name="pie-chart" size={scale(16)} color={'white'} />
                        </View>

                        {/* New Category */}

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SharedStack', {
                                screen: 'NewCategoryView',
                                params: {
                                    category_id: null,
                                }
                            })}
                        >
                            <Ionicons name="add" size={scale(25)} color={green} />
                        </TouchableOpacity>

                    </View>

                    {/* Switch */}

                    <CustomSwitchSelector
                        handlePress={(value) => { value != selectedGraph && setSelectedGraph(value) }}
                        startIndex={2}
                    />

                </View>

                {/* Pie Chart */}

                <View style={{ gap: scale(10) }}>

                    <Text style={globalStyles.header('white')}>Spending Distribution</Text>

                    {categories != null &&
                        <PieChartDistribution />
                    }

                </View>

                {/* Categories Header & Search */}

                <View style={{ gap: scale(10) }}>

                    <Text style={globalStyles.header('white')}>All Categories</Text>

                    <SearchPicker
                        setFilter={setFilter}
                        setSort={setSort}
                        option={'category'}
                        border={undefined}
                    />

                </View>

            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('CategoryView', { category_id: item?.id, startGraph: switchOptions.findIndex((item) => item?.label == selectedGraph) })}
                key={item?.id}
            >
                <CategoryMediumCard category_id={item?.id} total={item?.value} />
            </TouchableOpacity>
        );
    };

    const renderEmptyComponent = () => {
        return (
            <View style={{ height: '35%', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={globalStyles.body('white')}>No Categories</Text>
            </View>
        );
    };

    const renderRefresh = () => {
        return (
            <RefreshControl
                refreshing={refresh}
                onRefresh={handleRefresh}
                tintColor="white"
            />
        );
    };

    React.useEffect(() => {
        switch (selectedGraph) {
            case "1W":
                setCategories(spendingDistribution?.week?.categories);
                setTotal(spendingDistribution?.week?.total);
                break;
            case "1M":
                setCategories(spendingDistribution?.month?.categories);
                setTotal(spendingDistribution?.month?.total);
                break;
            case "1Y":
                setCategories(spendingDistribution?.year?.categories);
                setTotal(spendingDistribution?.year?.total);
                break;
            default:
                setCategories(spendingDistribution?.all?.categories);
                setTotal(spendingDistribution?.all?.total);
        }
    }, [selectedGraph, spendingDistribution]);

    return (
        <CustomFlatListView
            ListHeaderComponentStyle={{ paddingBottom: scale(15), zIndex: 1 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}

            data={categories?.filter((category) => category?.name?.toUpperCase()?.includes(filter?.toUpperCase())).sort((a, b) => handleSort(a, b) ? -1 : 1)}
            keyExtractor={item => item.id}
            refreshControl={renderRefresh()}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader()}
            ListEmptyComponent={renderEmptyComponent()}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            numColumns={2}
        />
    );
};

export default CategoryAllView;