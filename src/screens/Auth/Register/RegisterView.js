import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import globalStyles from '../../../styles/styles.ts';
import { signUpWithEmail } from '../../../supabase/supabaseFunctions';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import CustomPasswordInput from '../../../components/TextInputs/CustomPasswordInput';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import BackButton from '../../../components/Buttons/BackButton';
import { backgroundColor, green } from '../../../constants/constants';
import logo from '../../../../assets/logoClear.png';
import { nameRegex, emailRegex, passRegex } from '../../../constants/constants';

function RegisterView({ navigation }) {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

  // const [first, setFirst] = React.useState('Kevin');
  // const [last, setLast] = React.useState('Luong');
  // const [email, setEmail] = React.useState('ctrlnote10@ymail.com');
  // const [password, setPassword] = React.useState('Incorect94544!');
  // const [confirmPass, setConfirmPass] = React.useState('Incorect94544!');

  const [loading, setLoading] = React.useState(false);

  const [validFirst, setValidFirst] = React.useState(true);
  const [validLast, setValidLast] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPass, setValidPass] = React.useState(true);
  const [validConfirmPass, setValidConfirmPass] = React.useState(true);

  let tempValidFirst = true;
  let tempValidLast = true;
  let tempValidEmail = true;
  let tempValidPass = true;
  let tempValidConfirmPass = true;
  let signUpResult = false;

  async function handleSignUp() {

    // First Name Validation
    if (!nameRegex.test(first)) {
      tempValidFirst = false;
      setValidFirst(tempValidFirst);
    }
    else {
      tempValidFirst = true;
      setValidFirst(tempValidFirst);
    }

    // Last Name Validation
    if (!nameRegex.test(last)) {
      tempValidLast = false;
      setValidLast(tempValidLast);
    } else {
      tempValidLast = true;
      setValidLast(tempValidLast);
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      tempValidEmail = false;
      setValidEmail(tempValidEmail);
    } else {
      tempValidEmail = true;
      setValidEmail(tempValidEmail);
    }

    // Password Validation
    if (!passRegex.test(password)) {
      tempValidPass = false;
      setValidPass(tempValidPass);
    } else {
      tempValidPass = true;
      setValidPass(tempValidPass);
    }

    // Confirm Password Validation
    if (!passRegex.test(confirmPass)) {
      tempValidConfirmPass = false;
      setValidConfirmPass(tempValidConfirmPass);
    } else {
      tempValidConfirmPass = true;
      setValidConfirmPass(tempValidConfirmPass);
    }

    if (tempValidFirst && tempValidLast &&
      tempValidEmail && tempValidPass &&
      tempValidConfirmPass && password === confirmPass) {

      setLoading(true);
      signUpResult = await signUpWithEmail(email, password, first, last);
      setLoading(false);

      if (signUpResult) {
        navigation.goBack();
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Header & TextFields */}

      <CustomKeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {/* Back Button */}

          <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>

          {/* Logo */}

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'BebasBold', fontSize: scale(35), color: 'white' }}>
              CASHFLOW
            </Text>
            <Image
              style={{
                height: scale(25),
                width: scale(25),
                marginLeft: scale(5),
                marginBottom: scale(8),
              }}
              source={logo}
            />
          </View>

          {/* Spacer */}

          <View style={{ width: scale(35) }} />
        </View>

        {/* TextFields */}

        <View style={{ gap: scale(10), paddingHorizontal: scale(10) }}>
          <Text style={globalStyles.header('white')}>Sign Up</Text>

          <CustomTextInput
            value={first}
            onChangeText={setFirst}
            placeholder="First Name"
            loading={loading}
            autoCapitalize={true}
            autoCorrect={false}
            valid={validFirst}
            dark={false}
          />

          <CustomTextInput
            value={last}
            onChangeText={setLast}
            placeholder="Last Name"
            loading={loading}
            autoCapitalize={true}
            autoCorrect={false}
            valid={validLast}
            dark={false}
          />

          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            loading={loading}
            autoCapitalize={false}
            autoCorrect={false}
            valid={validEmail}
            dark={false}
          />

          <CustomPasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            loading={loading}
            valid={validPass}
          />

          <CustomPasswordInput
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="Confirm password"
            loading={loading}
            valid={validConfirmPass}
          />

          <Text style={globalStyles.body('white')}> At least one special character (e.g., @, #, $).
            {'\n'} At least one uppercase letter (A-Z).
            {'\n'} At least one number (0-9).
            {'\n'} At least 8 characters long.
          </Text>

          {/* <TouchableOpacity disabled={loading} style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()}>
            <Text style={globalStyles.body('white')}>
              Already have an account?
              <Text style={globalStyles.body(green)}> Sign in.</Text>
            </Text>
          </TouchableOpacity> */}
        </View>

        <View />

      </CustomKeyboardAvoidingView>

      {/* Sign Up Button */}

      <TouchableOpacity
        style={{
          backgroundColor: email !== '' && password !== '' && confirmPass !== '' ? green : 'white',
          borderRadius: 100,
          paddingHorizontal: scale(20),
          paddingVertical: scale(13),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: scale(40),
        }}
        disabled={loading}
        onPress={() => handleSignUp()}
      >
        {loading
          ?
          <ActivityIndicator size={'small'} color={'black'} />
          :
          <Text style={globalStyles.subHeader('black')}>Sign Up</Text>
        }

      </TouchableOpacity>
    </View>
  );
}

export default RegisterView;
