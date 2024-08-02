import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    TouchableOpacity, View,
} from 'react-native';
import { Camera, CameraView, CameraType } from 'expo-camera';
import { scale } from 'react-native-size-matters';
import IconSmall from '../Icons/IconSmall';
import CancelButton from '../Buttons/CancelButton';


function CameraComponent({ bottomSheetRef, setPicture, showCamera }) {
    const cameraRef = React.useRef();
    const [flashMode, setFlashMode] = React.useState('off');
    const [facing, setFacing] = React.useState('back');
    const [cameraReady, setCameraReady] = React.useState(false);

    function toggleCameraType() {
        setFlashMode('off');
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    function toggleCameraFlash() {
        setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
    }

    function handleClose() {
        setFlashMode('off')
        setCameraReady(false)
        bottomSheetRef.current.forceClose();
    }

    async function takePicture() {
        setCameraReady(false)

        const photo = await cameraRef.current.takePictureAsync(); // take & save photo
        setPicture(photo.uri);

        handleClose();
    }

    return (
        <View >
            {/* Camera View */}

            {showCamera && (
                <CameraView
                    style={{ height: '100%', marginTop: scale(10), borderTopLeftRadius: scale(25), borderTopRightRadius: scale(25), overflow: 'hidden' }}
                    facing={facing}
                    flash={flashMode}
                    ref={cameraRef}
                    onCameraReady={() => { setCameraReady(true) }}
                />
            )}

            {/* Camera Buttons */}

            {cameraReady && (
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

                        <TouchableOpacity onPress={() => { takePicture() }}>
                            <Ionicons name="ellipse-outline" size={scale(80)} color="white" />
                        </TouchableOpacity>

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

export default CameraComponent;

