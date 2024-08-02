import { createDrawerNavigator, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { scale } from 'react-native-size-matters';
import { SafeAreaView, View, Text } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../styles/styles.ts';
import { UserContext } from '../../supabase/ViewModel';
import { signOut } from '../../supabase/supabaseFunctions';
import { backgroundColor, accentColor, green } from '../../constants/constants';

import DashboardView from './Dashboard/DashboardView';
import TransactionAllView from './Transaction/TransactionAllView';
import TransactionView from './Transaction/TransactionView';
import CategoryAllView from './Category/CategoryAllView';
import CategoryView from './Category/CategoryView';
import SettingsView from './Settings/SettingsView';
import NewCategoryView from './Category/NewCategory/NewCategoryView';
import EditAccountView from './Settings/EditAccountView';
import EditProfileView from './Settings/EditProfileView.tsx';
import NewTransactionStartView from './Transaction/NewTransaction/NewTransactionStartView';
import NewTransactionFinishView from './Transaction/NewTransaction/NewTransactionFinishView.tsx';
import ChooseCategoryView from './Transaction/NewTransaction/ChooseCategoryView';

import blankProfilePicture from '../../../assets/blankProfilePicture.png';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function SharedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="NewTransactionStartView" component={NewTransactionStartView} />
        <Stack.Screen name="ChooseCategoryView" component={ChooseCategoryView} />
        <Stack.Screen name="NewTransactionFinishView" component={NewTransactionFinishView} />
      </Stack.Group>
      <Stack.Screen name="TransactionView" component={TransactionView} />
      <Stack.Screen name="NewCategoryView" component={NewCategoryView} />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardView" component={DashboardView} />
      <Stack.Screen name="SharedStack" component={SharedStack} />
    </Stack.Navigator>
  );
}

function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransactionAllView" component={TransactionAllView} />
      <Stack.Screen name="SharedStack" component={SharedStack} />
    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoryAllView" component={CategoryAllView} />
      <Stack.Screen name="CategoryView" component={CategoryView} />
      <Stack.Screen name="SharedStack" component={SharedStack} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsView" component={SettingsView} />
      <Stack.Screen name="EditAccountView" component={EditAccountView} />
      <Stack.Screen name="EditProfileView" component={EditProfileView} />
    </Stack.Navigator>
  );
}

const renderIcon = (name, color) => (
  <Ionicons
    name={color !== 'white' ? `${name}-sharp` : `${name}-outline`}
    size={scale(18)}
    color={color}
  />
);

const renderDrawerContent = (props, user, session) => (
  <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor }}>
    {/* Info & Screens */}

    <View style={{ gap: scale(30), padding: scale(10) }}>
      {/* Picture & Info */}

      <View
        style={{
          gap: scale(10),
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: scale(10),
        }}
      >
        <Image
          source={
            user?.image == null
              ? blankProfilePicture
              : user.image
          }
          style={{
            height: scale(55),
            width: scale(55),
            borderRadius: 100,
            borderWidth: scale(2.5),
            borderColor: 'white',
            alignSelf: 'center',
          }}
        />

        <View>
          <Text style={globalStyles.header('white')}>
            {user?.first_name}
            {' '}
            {user?.last_name}
          </Text>
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
        label="Sign Out"
        onPress={() => signOut()}
        labelStyle={globalStyles.subHeader('white')}
        icon={() => <Ionicons name="exit-outline" size={scale(18)} color="white" />}
      />
    </View>
  </SafeAreaView>
);

function MainStack() {
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
      drawerContent={(props) => renderDrawerContent(props, user, session)}
    >
      <Drawer.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color }) => renderIcon('bar-chart', color),
        }}
      />
      <Drawer.Screen
        name="TransactionStack"
        component={TransactionStack}
        options={{
          drawerLabel: 'Transactions',
          drawerIcon: ({ color }) => renderIcon('receipt', color),
        }}
      />
      <Drawer.Screen
        name="CategoryStack"
        component={CategoryStack}
        options={{
          drawerLabel: 'Categories',
          drawerIcon: ({ color }) => renderIcon('pie-chart', color),
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          drawerLabel: 'Account Settings',
          drawerIcon: ({ color }) => renderIcon('cog', color),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainStack;
