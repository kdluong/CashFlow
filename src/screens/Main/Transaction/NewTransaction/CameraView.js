import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView, TouchableOpacity, View, Text,
} from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../../../styles/styles.ts';

function CameraView({ bottomSheetRef, setPicture, showCamera }) {
  const cameraRef = React.useRef();
  const [flashMode, setFlashMode] = React.useState(FlashMode.off);
  const [type, setType] = React.useState(CameraType.back);

  const [disableCaptureButton, setDisableCaptureButton] = React.useState();
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);

  function toggleCameraType() {
    setFlashMode('off');
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleCameraFlash() {
    setFlashMode((current) => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }

  function handleClose() {
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
    <View>
      {/* Camera View */}

      {showCamera && (
        <Camera
          style={{ height: '100%', width: '100%' }}
          type={type}
          flashMode={flashMode}
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
            padding: scale(20),
          }}
        >
          {/* Close Camera */}

          <TouchableOpacity onPress={() => handleClose()}>
            <Ionicons name="close-circle-sharp" size={scale(25)} color="white" />
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
              disabled={type !== CameraType.back}
            >
              <Ionicons
                name={flashMode === 'off' ? 'flash-off-sharp' : 'flash-sharp'}
                size={scale(25)}
                color={type === CameraType.back ? 'white' : 'black'}
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

export default CameraView;
