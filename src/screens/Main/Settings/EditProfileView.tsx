import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, SafeAreaView, Keyboard, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../../styles/styles';
import { UserContext } from '../../../supabase/ViewModel';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import BottomSheet from '@gorhom/bottom-sheet';
import CameraView from '../Transaction/NewTransaction/CameraView';
import { scale } from 'react-native-size-matters';
import BackButton from '../../../components/Buttons/BackButton';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import { backgroundColor, green } from '../../../constants/constants';
import { Camera } from 'expo-camera';

const EditProfileView = ({ navigation }: { navigation: any }) => {
  const { user, updateUser } = React.useContext(UserContext);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [picture, setPicture] = React.useState<any>(null);

  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | undefined>(undefined);

  function isValid() {
    return (
      (user.first_name != firstName || user.last_name != lastName || picture != user.image) &&
      firstName.length != 0 &&
      lastName.length != 0
    );
  }

  async function openPicker() {

    Keyboard.dismiss();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  }

  function openCamera() {

    Keyboard.dismiss();

    if (hasCameraPermission == undefined) {

      // ask for camera permission

      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.granted);

        setShowCamera(true);
        bottomSheetRef.current?.expand();
      })();

    }
    else if (hasCameraPermission) {
      setShowCamera(true);
      bottomSheetRef.current?.expand();
    }
    else {
      Alert.alert("Camera Permission Required", "\nPlease grant the camera permission in order to use this feature.");
    }

  }

  async function handleComplete() {
    setLoading(true);
    await updateUser(firstName, lastName, picture);
    setLoading(false);

    navigation.goBack();
  }

  React.useEffect(() => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setPicture(user?.image);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <CustomKeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* New Back Button */}

          <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>

          <Text style={globalStyles.header('white')}>Edit Profile</Text>

          {/* Complete */}

          {loading ? (
            <ActivityIndicator color={'white'} style={{ width: scale(35) }} />
          ) : (
            <TouchableOpacity
              onPress={() => handleComplete()}
              style={{ width: scale(35), alignItems: 'flex-end' }}
              disabled={!isValid()}
            >
              <Ionicons
                name="checkmark-done-sharp"
                size={scale(22)}
                color={isValid() ? green : 'gray'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Edit Profile */}

        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          {/* Profile Picture & Options */}

          <View style={{ gap: scale(15) }}>

            <Image
              source={
                picture == null
                  ? require('../../../../assets/blankProfilePicture.png')
                  : picture
              }
              style={{
                height: scale(130),
                width: scale(130),
                borderRadius: 100,
                borderWidth: scale(3),
                borderColor: 'white',
                alignSelf: 'center',
              }}
            />

            {/* Picture Options */}

            <View style={{ flexDirection: 'row', gap: scale(15), alignSelf: 'center' }}>
              {/* Open Picker */}

              <TouchableOpacity
                onPress={() => openPicker()}
                style={{
                  backgroundColor: 'white',
                  height: scale(32),
                  width: scale(32),
                  borderRadius: scale(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={loading}
              >
                <Ionicons name="image-outline" size={scale(18)} color={'black'} />
              </TouchableOpacity>

              {/* Open Camera */}

              <TouchableOpacity
                onPress={() => openCamera()}
                style={{
                  backgroundColor: 'white',
                  height: scale(32),
                  width: scale(32),
                  borderRadius: scale(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={loading}
              >
                <Ionicons name="camera-outline" size={scale(18)} color={'black'} />
              </TouchableOpacity>

              {/* Remove Current Picture */}

              <TouchableOpacity
                onPress={() => setPicture(null)}
                style={{
                  backgroundColor: picture == null ? 'gray' : 'red',
                  height: scale(32),
                  width: scale(32),
                  borderRadius: scale(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                disabled={picture == null || loading}
              >
                <Ionicons name="trash-outline" size={scale(18)} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Inputs */}

          <View style={{ gap: scale(10) }}>
            <CustomTextInput
              border={undefined}
              value={firstName}
              onChangeText={setFirstName}
              placeholder={'Enter a first name'}
              loading={loading}
              autoCapitalize={true}
              autoCorrect={false}
            />

            <CustomTextInput
              border={undefined}
              value={lastName}
              onChangeText={setLastName}
              placeholder={'Enter a last name'}
              loading={loading}
              autoCapitalize={true}
              autoCorrect={false}
            />
          </View>

          <View />
        </View>
      </CustomKeyboardAvoidingView>

      {/* Camera */}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%']}
        index={-1}
        onClose={() => setShowCamera(false)}
        backgroundStyle={{ backgroundColor: backgroundColor }}
      >
        <CameraView
          bottomSheetRef={bottomSheetRef}
          setPicture={setPicture}
          showCamera={showCamera}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default EditProfileView;
