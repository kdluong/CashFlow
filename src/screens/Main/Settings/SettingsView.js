import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { UserContext } from "../../../supabase/ViewModel";
import React from "react";
import globalStyles from "../../../styles/styles";
import { scale } from 'react-native-size-matters';
import OpenDrawerButton from "../../../components/Buttons/OpenDrawerButton";
import CustomView from "../../../components/CustomViews/CustomView";
import { monthNames, backgroundColor, accentColor } from "../../../constants/constants";

const SettingsView = ({ navigation }) => {

    const { user, session } = React.useContext(UserContext);
    const startDate = new Date(session.user.email_confirmed_at);

    return (
        <CustomView backgroundColor={backgroundColor} style={{ flex: 1, justifyContent: 'space-between' }}>

            {/* Header */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>

                {/* Open Drawer */}

                <OpenDrawerButton onPress={() => navigation.openDrawer()} />

                {/* Name & Icon */}

                <Text style={globalStyles.header('white')}>Account Settings</Text>

                {/* New Category */}

                <View style={{ width: scale(25) }} />

            </View>

            {/* Info & Options */}

            <View style={{ flex: 1, justifyContent: "space-evenly" }}>

                {/* Profile Picture & User Info */}

                <View style={{ gap: scale(10), alignItems: "center" }}>

                    <Image
                        source={user?.image == null ? require('../../../../assets/blankProfilePicture.png') : user?.image}
                        style={{ height: scale(150), width: scale(150), borderRadius: 100, borderWidth: scale(3), borderColor: 'white' }}
                    />

                    <View style={{ alignItems: 'center', gap: scale(5) }}>
                        <Text style={globalStyles.header('white')}>{user?.first_name} {user?.last_name}</Text>
                        <Text style={globalStyles.body('#d3d3d3')}>Member since {monthNames[startDate.getMonth()]} {startDate.getFullYear()}</Text>
                    </View>

                </View>

                {/* Options */}

                <View style={{ gap: scale(10) }}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfileView')}
                        style={{ height: scale(40), backgroundColor: accentColor, borderRadius: scale(10), justifyContent: 'center', alignItems: "center" }}
                    >
                        <Text style={globalStyles.subHeader('white')}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditAccountView', { option: 'email' })}
                        style={{ height: scale(40), backgroundColor: accentColor, borderRadius: scale(10), justifyContent: 'center', alignItems: "center" }}
                    >
                        <Text style={globalStyles.subHeader('white')}>Change Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditAccountView', { option: 'password' })}
                        style={{ height: scale(40), backgroundColor: accentColor, borderRadius: scale(10), justifyContent: 'center', alignItems: "center" }}
                    >
                        <Text style={globalStyles.subHeader('white')}>Change Password</Text>
                    </TouchableOpacity>

                </View>

                <View />

            </View>

        </CustomView>
    );
};

export default SettingsView;