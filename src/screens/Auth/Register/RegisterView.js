import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import globalStyles from '../../../styles/styles';
import { signUpWithEmail } from '../../../supabase/supabaseFunctions';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import CustomPasswordInput from '../../../components/TextInputs/CustomPasswordInput';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import BackButton from '../../../components/Buttons/BackButton';
import { backgroundColor, green } from '../../../constants/constants';

function RegisterView({ navigation }) {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

  // const [first, setFirst] = React.useState('Kevin');
  // const [last, setLast] = React.useState('Luong');
  // const [email, setEmail] = React.useState('kluong264@gmail.com');
  // const [password, setPassword] = React.useState('Incorect94544!');
  // const [confirmPass, setConfirmPass] = React.useState('Incorect94544!');

  const [showPass, setShowPass] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      {/* Header & TextFields */}

      <CustomKeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {/* Back Button */}

          <TouchableOpacity onPress={() => navigation.goBack()}>
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
              source={require('../../../../assets/logoClear.png')}
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
            loading={null}
          />

          <CustomTextInput
            value={last}
            onChangeText={setLast}
            placeholder="Last Name"
            loading={null}
          />

          <CustomTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            loading={null}
          />

          <CustomPasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            loading={null}
          />

          <CustomPasswordInput
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="Confirm password"
            loading={null}
          />

          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()}>
            <Text style={globalStyles.body('white')}>
              Already have an account?
              <Text style={globalStyles.body(green)}>Sign in.</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View />
      </CustomKeyboardAvoidingView>

      {/* Sign Up Button */}

      <TouchableOpacity
        style={{
          backgroundColor: email != '' && password != '' && confirmPass != '' ? green : 'white',
          borderRadius: 100,
          paddingHorizontal: scale(20),
          paddingVertical: scale(13),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: scale(40),
        }}
        onPress={() => signUpWithEmail(email, password)}
      >
        <Text style={globalStyles.subHeader('black')}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterView;
