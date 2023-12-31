import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { green } from '../../../constants/constants';
import globalStyles from '../../../styles/styles.ts';
import logo from '../../../../assets/logo.png';
import flow from '../../../../assets/flow.gif';

function WelcomeView({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: green,
        alignItems: 'center',
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

      {/* Next Button */}

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          borderRadius: 100,
          paddingHorizontal: scale(20),
          paddingVertical: scale(13),
          position: 'absolute',
          bottom: 0,
          marginBottom: scale(40),
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={globalStyles.subHeader('white')}>Let&apos;s go!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WelcomeView;
