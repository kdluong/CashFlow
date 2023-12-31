import {
  Text, View, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../../styles/styles.ts';
import { signInWithEmail } from '../../../supabase/supabaseFunctions';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import CustomPasswordInput from '../../../components/TextInputs/CustomPasswordInput';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import BackButton from '../../../components/Buttons/BackButton';
import { backgroundColor, green } from '../../../constants/constants';
import logo from '../../../../assets/logoClear.png';

function LogInView({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  async function handleSignIn() {
    if (email !== '' && password !== '') {
      setLoading(true);
      await signInWithEmail(email, password);
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Header & TextFields */}

      <CustomKeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        <TouchableOpacity
          disabled={loading}
          style={{ alignSelf: 'baseline' }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>

        {/* Logo */}

        <View style={{ alignItems: 'center' }}>
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
        </View>

        {/* TextFields */}

        <View style={{ gap: scale(10), paddingHorizontal: scale(10) }}>
          <Text style={globalStyles.header('white')}>Log In</Text>

          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            loading={loading}
            autoCapitalize={false}
            autoCorrect={false}
            valid
            dark={false}
          />

          <CustomPasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            loading={loading}
            valid
          />

          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={globalStyles.body('white')}>
              Don&apos;t have an account?
              <Text style={globalStyles.body(green)}> Sign up.</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View />

        <View />
      </CustomKeyboardAvoidingView>

      {/* Log In Button */}

      <TouchableOpacity
        style={{
          backgroundColor: email !== '' && password !== '' ? green : 'white',
          borderRadius: 100,
          paddingHorizontal: scale(20),
          paddingVertical: scale(13),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: scale(40),
        }}
        onPress={() => handleSignIn()}
        disabled={loading}
      >
        {
          loading
            ? <ActivityIndicator size="small" color="black" />
            : <Text style={globalStyles.subHeader('black')}>Log In</Text>
        }

      </TouchableOpacity>
    </View>
  );
}

export default LogInView;
