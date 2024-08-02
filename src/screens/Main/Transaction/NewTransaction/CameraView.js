import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  TouchableOpacity, View,
} from 'react-native';
import { Camera, CameraView, CameraType } from 'expo-camera';
import { scale } from 'react-native-size-matters';
import IconSmall from '../../../../components/Icons/IconSmall';
import CancelButton from '../../../../components/Buttons/CancelButton';


function MyCameraView({ bottomSheetRef, setPicture, showCamera }) {
  const cameraRef = React.useRef();
  const [flashMode, setFlashMode] = React.useState('off');
  const [facing, setFacing] = React.useState('back');

  const [disableCaptureButton, setDisableCaptureButton] = React.useState();

  function toggleCameraType() {
    setFlashMode('off');
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleCameraFlash() {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
  }

  function handleClose() {
    setFlashMode('off')
    bottomSheetRef.current.forceClose();
  }

  async function takePicture() {
    setDisableCaptureButton(true); // hide buttons

    const photo = await cameraRef.current.takePictureAsync(); // take & save photo
    setPicture(photo.uri);

    setDisableCaptureButton(false);
    handleClose();
  }

  return (
    <View >
      {/* Camera View */}

      {showCamera && (
        <CameraView
          style={{ height: '100%', width: '100%' }}
          facing={facing}
          flash={flashMode}
          ref={cameraRef}
        />
      )}

      {/* Camera Buttons */}

      {!disableCaptureButton && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            paddingHorizontal: scale(20),
            paddingVertical: scale(40)
          }}
        >
          {/* Close Camera */}

          <TouchableOpacity onPress={() => handleClose()} style={{ alignSelf: 'flex-start' }}>
            <CancelButton />
          </TouchableOpacity>

          {/* Flash, Capture, & Flip */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {/* Flash */}

            <TouchableOpacity
              onPress={() => toggleCameraFlash()}
              disabled={facing !== 'back'}
            >
              <Ionicons
                name={flashMode === 'off' ? 'flash-off-sharp' : 'flash-sharp'}
                size={scale(25)}
                color={facing === 'back' ? 'white' : 'black'}
              />
            </TouchableOpacity>

            {/* Capture */}

            <View
              style={{
                height: scale(65),
                width: scale(65),
                backgroundColor: 'black',
                borderRadius: 100,
                borderColor: 'white',
                borderWidth: scale(2),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  height: scale(55),
                  width: scale(55),
                  backgroundColor: 'white',
                  borderRadius: 100,
                }}
                onPress={() => {
                  takePicture();
                }}
              />
            </View>

            {/* Flip Camera */}

            <TouchableOpacity onPress={() => toggleCameraType()}>
              <Ionicons name="camera-reverse-sharp" size={scale(25)} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default MyCameraView;
