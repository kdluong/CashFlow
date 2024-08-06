import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Keyboard } from 'react-native';
import { UserContext } from '../../../../supabase/ViewModel';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import CameraComponent from '../../../../components/Camera/CameraComponent';
import { scale } from 'react-native-size-matters';
import { getDateLong, getTime } from '../../../../functions/functions';
import { backgroundColor, green } from '../../../../constants/constants';
import globalStyles from '../../../../styles/styles';
import CustomTextInput from '../../../../components/TextInputs/CustomTextInput';
import { validRegex } from '../../../../constants/constants';
import CustomView from '../../../../components/CustomViews/CustomView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconLarge from '../../../../components/Icons/IconLarge';
import BackButton from '../../../../components/Buttons/BackButton';
import CancelButton from '../../../../components/Buttons/CancelButton';
import LoadingScreen from '../../../Loading/LoadingScreen';



const NewTransactionFinishView = ({ navigation, route }: { navigation: any; route: any }) => {
  const { transaction_id, category_id, total, returnScreen } = route.params;
  const { createTransaction, updateTransaction, fetchTransaction, fetchCategory } =
    React.useContext(UserContext);

  const [category, setCategory] = React.useState<any>(null);
  const [transaction, setTransaction] = React.useState<any>(null);
  const [name, setName] = React.useState('');
  const [images, setImages] = React.useState<string | undefined>('');

  const currentDate = new Date();

  const cameraSheetRef = React.useRef<BottomSheet>(null);
  const successSheetRef = React.useRef<BottomSheet>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | undefined>(undefined);

  const [validName, setValidName] = React.useState(true);


  function handleSuccess() {

    if (returnScreen == 'DashboardView') {
      navigation.navigate('DashboardStack', {
        screen: returnScreen,
      });
    } else if (returnScreen == 'TransactionAllView') {
      navigation.navigate('TransactionStack', {
        screen: returnScreen,
      });
    } else {
      navigation.navigate('CategoryStack', {
        screen: returnScreen,
        params: {
          category_id: category_id,
        },
      });
    }
  }

  async function processTransaction() {

    var imageUri = null;
    let tempValidName = false;
    let successFlag = false;

    // Check for image
    if (images != '') {
      imageUri = images;
    }

    // Name Validation
    if (validRegex.test(name)) {
      tempValidName = true;
    }

    setValidName(tempValidName);

    if (tempValidName) {

      // create/update transaction

      setLoading(true);

      if (transaction_id != null) {
        // update transaction

        if (
          transaction?.category_id != category?.id ||
          transaction?.name != name ||
          transaction?.total != total ||
          transaction?.image != imageUri
        ) {
          successFlag = await updateTransaction(transaction_id, category?.id, name, total, imageUri);
        }
      } else {
        // create new transaction

        successFlag = await createTransaction(category?.id, name, total, imageUri);
      }

      setLoading(false);

      // Navigate if success, return if fail

      if (successFlag) {
        if (returnScreen != null) {
          successSheetRef.current?.expand();
        } else {
          navigation.pop(2);
        }
      }
    }
  }

  async function openImagePicker() {

    Keyboard.dismiss();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets[0].uri);
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
        cameraSheetRef.current?.expand();
      })();

    }
    else if (hasCameraPermission) {
      setShowCamera(true);
      cameraSheetRef.current?.expand();
    }
    else {
      Alert.alert("Camera Permission Required", "\nPlease grant the camera permission in order to use this feature.");
    }
  }

  React.useEffect(() => {
    // initialize transaction data (if exists)

    if (transaction_id != null) {
      var data = fetchTransaction(transaction_id);

      setTransaction(data?.transaction);
      setName(data?.transaction?.name);

      if (data?.transaction?.image != null) {
        setImages(data?.transaction?.image);
      }
    }

    // initialize category from prev screen

    setCategory(fetchCategory(category_id));
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      {loading
        ?
        <LoadingScreen />
        :
        <CustomView
          backgroundColor={backgroundColor}
          style={{ flex: 1, justifyContent: 'space-between' }}
        >
          {/* Header */}

          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {/* Back Button */}

            <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
              <BackButton />
            </TouchableOpacity>

            <Text style={globalStyles.header('white')}>Confirm Transaction</Text>

            {/* Complete & Loading */}

            {loading ? (
              <ActivityIndicator color={'white'} style={{ width: scale(35) }} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  name != '' && processTransaction();
                }}
                disabled={name == ''}
                style={{ width: scale(35), alignItems: 'flex-end' }}
              >
                <Ionicons
                  name="checkmark-done-sharp"
                  size={scale(22)}
                  color={name == '' ? 'gray' : green}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Text Input */}

          <CustomTextInput
            value={name}
            onChangeText={setName}
            placeholder={'Enter transaction name'}
            loading={loading}
            autoCapitalize={true}
            autoCorrect={true}
            valid={validName}
            dark={false}
          />

          {/* Transaction Card */}

          <View
            style={{
              height: Dimensions.get('screen').height < 700 ? scale(395) : scale(495),
              backgroundColor: category?.color,
              borderRadius: scale(5),
              overflow: 'hidden',
              justifyContent: 'space-between',
            }}
          >
            {images != '' ? (
              <Image
                source={images}
                style={{
                  height: '100%',
                  flexDirection: 'row',
                  padding: scale(15),
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity onPress={() => setImages('')} disabled={loading} style={{ alignSelf: 'flex-start' }}>
                  <CancelButton />
                </TouchableOpacity>
              </Image>
            ) : (
              <View>
                {/* Open Camera */}

                <TouchableOpacity
                  onPress={() => openCamera()}
                  style={{
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={loading}
                >
                  <Ionicons name="camera-sharp" size={scale(25)} />
                </TouchableOpacity>

                <View style={{ backgroundColor: backgroundColor, height: scale(5) }} />

                {/* Open Image Picker */}

                <TouchableOpacity
                  onPress={() => openImagePicker()}
                  style={{
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  disabled={loading}
                >
                  <Ionicons name="image-sharp" size={scale(25)} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Transaction Info */}

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: scale(10),
              height: scale(70),
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: scale(15),
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
          >
            {/* Icon & Name */}

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(13) }}>
              <IconLarge name={category?.icon} color={'white'} backgroundColor={category?.color} />

              <View style={{ gap: scale(2) }}>
                <Text style={globalStyles.subHeader('black')}>
                  {name == '' ? 'Transaction Name' : name}
                </Text>
                <Text style={globalStyles.body('#5b647d')}>{category?.name}</Text>
              </View>
            </View>

            {/* Total & Date */}

            <View style={{ alignItems: 'flex-end', gap: scale(2), }}>
              <Text style={globalStyles.subHeader('black')}>${total}</Text>
              <Text style={globalStyles.body('#5b647d')}>
                {getDateLong(currentDate)} @ {getTime(currentDate)}
              </Text>
            </View>
          </View>
        </CustomView>
      }

      {/* Camera View*/}

      <BottomSheet
        ref={cameraSheetRef}
        snapPoints={['100%']}
        index={-1}
        backgroundStyle={{ backgroundColor: 'black' }}
        onClose={() => setShowCamera(false)}
      >
        <CameraComponent
          bottomSheetRef={cameraSheetRef}
          setPicture={setImages}
          showCamera={showCamera}
        />
      </BottomSheet>

      {/* Success View */}

      <BottomSheet
        ref={successSheetRef}
        snapPoints={['100%']}
        index={-1}
        backgroundStyle={{ backgroundColor: green }}
      >
        <View style={{ alignItems: "center", justifyContent: 'space-between', height: '100%', paddingBottom: scale(50) }}>

          <View />

          {/* Success Message */}

          <View style={{ alignItems: "center" }}>
            <Ionicons name='checkmark-done-circle-sharp' size={scale(200)} color={'white'} style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }} />
            <Text style={[globalStyles.logo, {}]}>Success!</Text>
            <Text style={[globalStyles.subHeader('white'), { paddingTop: scale(0) }]}>Your transaction of ${total} was successfully processed.</Text>
          </View>

          {/* Done Button */}

          <TouchableOpacity
            onPress={() => {
              handleSuccess()
            }}
            style={{
              height: scale(43),
              paddingHorizontal: 50,
              borderRadius: 100,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
          >
            <Text style={globalStyles.subHeader('white')}>Done</Text>
          </TouchableOpacity>

        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default NewTransactionFinishView;
