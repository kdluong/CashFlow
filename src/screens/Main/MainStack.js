import { createDrawerNavigator, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { scale } from 'react-native-size-matters';
import { SafeAreaView, View, Text } from "react-native";
import { Image } from "expo-image";
import globalStyles from "../../styles/styles";
import { UserContext } from "../../supabase/ViewModel";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut } from "../../supabase/supabaseFunctions";
import { backgroundColor, accentColor, green } from "../../constants/constants";

import DashboardView from "./Dashboard/DashboardView";
import TransactionAllView from "./Transaction/TransactionAllView";
import TransactionView from "./Transaction/TransactionView";
import CategoryAllView from "./Category/CategoryAllView";
import CategoryView from "./Category/CategoryView";
import SettingsView from "./Settings/SettingsView";
import NewCategoryView from "./Category/NewCategory/NewCategoryView";
import EditAccountView from "./Settings/EditAccountView";
import EditProfileView from "./Settings/EditProfileView";
import CameraView from "./Transaction/NewTransaction/CameraView";
import NewTransactionStartView from "./Transaction/NewTransaction/NewTransactionStartView";
import NewTransactionFinishView from "./Transaction/NewTransaction/NewTransactionFinishView";
import ChooseCategoryView from "./Transaction/NewTransaction/ChooseCategoryView";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="DashboardView"
                component={DashboardView}
            />
            <Stack.Screen
                name="SharedStack"
                component={SharedStack}
            />
        </Stack.Navigator>
    );
}

const TransactionStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="TransactionAllView"
                component={TransactionAllView}
            />
            <Stack.Screen
                name="SharedStack"
                component={SharedStack}
            />
        </Stack.Navigator>
    );
}

const CategoryStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="CategoryAllView"
                component={CategoryAllView}
            />
            <Stack.Screen
                name="CategoryView"
                component={CategoryView}
            />
            <Stack.Screen
                name="SharedStack"
                component={SharedStack}
            />
        </Stack.Navigator>
    );
}

const SettingsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="SettingsView"
                component={SettingsView}
            />
            <Stack.Screen
                name="EditAccountView"
                component={EditAccountView}
            />
            <Stack.Screen
                name="EditProfileView"
                component={EditProfileView}
            />
            <Stack.Screen
                name="CameraView"
                component={CameraView}
            />
        </Stack.Navigator>
    );
}

const SharedStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="NewTransactionStartView"
                    component={NewTransactionStartView}
                />
                <Stack.Screen
                    name="ChooseCategoryView"
                    component={ChooseCategoryView}
                />
                <Stack.Screen
                    name="NewTransactionFinishView"
                    component={NewTransactionFinishView}
                />
            </Stack.Group>
            <Stack.Screen
                name="TransactionView"
                component={TransactionView}
            />
            <Stack.Screen
                name="NewCategoryView"
                component={NewCategoryView}
            />
        </Stack.Navigator>
    );
}

const MainStack = () => {

    const { user, session } = React.useContext(UserContext);

    return (
        <Drawer.Navigator
            screenOptions={{
                swipeEnabled: false,
                headerShown: false,
                drawerLabelStyle: { fontFamily: 'BebasBold', fontSize: scale(16) },
                drawerInactiveTintColor: 'white',
                drawerActiveTintColor: green,
                drawerActiveBackgroundColor: accentColor,
            }}
            drawerContent={props => {
                return (
                    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: backgroundColor }}>

                        {/* Info & Screens */}

                        <View style={{ gap: scale(30), padding: scale(10) }}>

                            {/* Picture & Info */}

                            <View style={{ gap: scale(10), flexDirection: "row", alignItems: 'center', paddingLeft: scale(10) }}>


                                <Image
                                    source={user?.image == null ? require('../../../assets/blankProfilePicture.png') : user.image}
                                    style={{ height: scale(55), width: scale(55), borderRadius: 100, borderWidth: scale(2.5), borderColor: 'white', alignSelf: 'center' }}
                                />


                                <View>
                                    <Text style={globalStyles.header('white')}>{user?.first_name} {user?.last_name}</Text>
                                    <Text style={globalStyles.body('#d3d3d3')}>{session?.user?.email}</Text>
                                </View>
                            </View>

                            {/* Screens */}

                            <View>
                                <DrawerItemList {...props} />
                            </View>

                        </View>

                        {/* Sign Out */}

                        <View style={{ padding: scale(10) }}>

                            <View style={{ height: '1.5%', backgroundColor: accentColor }} />

                            <DrawerItem
                                label={"Sign Out"} onPress={() => signOut()}
                                labelStyle={globalStyles.subHeader('white')}
                                icon={() => <Ionicons name="exit-outline" size={scale(18)} color={'white'} />}
                            />

                        </View>

                    </SafeAreaView>
                );
            }}
        >
            <Drawer.Screen
                name="DashboardStack"
                component={DashboardStack}
                options={{
                    drawerLabel: 'Dashboard',
                    drawerIcon: ({ color }) => (<Ionicons name={color != "white" ? "bar-chart-sharp" : "bar-chart-outline"} size={scale(18)} color={color} />)
                }}
            />
            <Drawer.Screen
                name="TransactionStack"
                component={TransactionStack}
                options={{
                    drawerLabel: 'Transactions',
                    drawerIcon: ({ color }) => (<Ionicons name={color != "white" ? "receipt-sharp" : "receipt-outline"} size={scale(18)} color={color} />)
                }}
            />
            <Drawer.Screen
                name="CategoryStack"
                component={CategoryStack}
                options={{
                    drawerLabel: 'Categories',
                    drawerIcon: ({ color }) => (<Ionicons name={color != "white" ? "pie-chart-sharp" : "pie-chart-outline"} size={scale(18)} color={color} />)
                }}
            />
            <Drawer.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{
                    drawerLabel: "Account Settings",
                    drawerIcon: ({ color }) => (<Ionicons name={color != "white" ? "cog-sharp" : "cog-outline"} size={scale(18)} color={color} />)
                }}
            />
        </Drawer.Navigator>
    );
};

export default MainStack;