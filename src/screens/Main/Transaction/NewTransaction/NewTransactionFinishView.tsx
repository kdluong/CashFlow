import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Alert, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Image } from 'expo-image';
import { UserContext } from '../../../../supabase/ViewModel';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomTextInput from '../../../../components/TextInputs/CustomTextInput';
import CameraView from './CameraView';
import * as ImagePicker from 'expo-image-picker';
import { scale } from 'react-native-size-matters';
import { getDateLong, getTime } from '../../../../functions/functions';
import BackButton from '../../../../components/Buttons/BackButton';
import CustomView from '../../../../components/CustomViews/CustomView';
import IconLarge from '../../../../components/Icons/IconLarge';
import { backgroundColor, green } from '../../../../constants/constants';
import globalStyles from '../../../../styles/styles';
import { Camera } from 'expo-camera';


const NewTransactionFinishView = ({ navigation, route }: { navigation: any; route: any }) => {
  const { transaction_id, category_id, total, returnScreen } = route.params;
  const { createTransaction, updateTransaction, fetchTransaction, fetchCategory } =
    React.useContext(UserContext);

  const [category, setCategory] = React.useState<any>(null);
  const [transaction, setTransaction] = React.useState<any>(null);
  const [name, setName] = React.useState('');
  const [images, setImages] = React.useState<string | undefined>('');

  const currentDate = new Date();

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | undefined>(undefined);


  async function handleComplete() {
    var imageUri = null;

    if (images != '') {
      imageUri = images;
    }

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
        await updateTransaction(transaction_id, category?.id, name, total, imageUri);
      }
    } else {
      // create new transaction

      await createTransaction(category?.id, name, total, imageUri);
    }

    setLoading(false);

    // handle return

    if (returnScreen == 'DashboardView') {
      navigation.navigate('DashboardStack', {
        screen: returnScreen,
      });
    } else if (returnScreen == 'TransactionAllView') {
      navigation.navigate('TransactionStack', {
        screen: returnScreen,
      });
    } else if (returnScreen == 'CategoryView') {
      navigation.navigate('CategoryStack', {
        screen: returnScreen,
        params: {
          category_id: category_id,
        },
      });
    } else {
      navigation.pop(2);
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
                name != '' && handleComplete();
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
          border={undefined}
          value={name}
          onChangeText={setName}
          placeholder={'Enter transaction name'}
          loading={loading}
          autoCapitalize={true}
          autoCorrect={true}
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
              <TouchableOpacity onPress={() => setImages('')} disabled={loading}>
                <Ionicons name="close-circle-sharp" color={'white'} size={scale(25)} />
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
            borderRadius: scale(5),
            height: scale(70),
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: scale(15),
            alignItems: 'center',
          }}
        >
          {/* Icon & Name */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
            <IconLarge name={category?.icon} color={'white'} backgroundColor={category?.color} />

            <View>
              <Text style={globalStyles.subHeader('black')}>
                {name == '' ? 'Transaction Name' : name}
              </Text>
              <Text style={globalStyles.body('gray')}>{category?.name}</Text>
            </View>
          </View>

          {/* Total & Date */}

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={globalStyles.subHeader('black')}>- ${total}</Text>
            <Text style={globalStyles.body('gray')}>
              {getDateLong(currentDate)} @ {getTime(currentDate)}
            </Text>
          </View>
        </View>
      </CustomView>

      {/* Camera */}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%']}
        index={-1}
        onClose={() => setShowCamera(false)}
        backgroundStyle={{ backgroundColor: 'black' }}
      >
        <CameraView
          bottomSheetRef={bottomSheetRef}
          setPicture={setImages}
          showCamera={showCamera}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default NewTransactionFinishView;
