import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../styles/styles.ts';
import logo from '../../../assets/logoClear.png';
import flow from '../../../assets/flow.gif';
import { backgroundColor } from '../../constants/constants';

function LoadingScreen() {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor,
        justifyContent: 'center',
      }}
    >
      {/* Logo */}

      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Text style={globalStyles.logo}>CASHFLOW</Text>
        <Image
          style={{
            height: scale(40),
            width: scale(40),
            marginLeft: scale(5),
            marginBottom: scale(10),
          }}
          source={logo}
        />
      </View>

      {/* Slogan */}

      <Text style={globalStyles.body('white')}>Money management, redefined.</Text>

      {/* gif */}

      <Image
        style={{ height: scale(250), width: scale(250), position: 'absolute' }}
        source={flow}
      />

    </View>
  );
}

export default LoadingScreen;
