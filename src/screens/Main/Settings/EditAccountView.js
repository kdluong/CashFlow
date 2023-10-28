import React from 'react';
import {
  View, TouchableOpacity, Text, ActivityIndicator, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../../styles/styles.ts';
import { changeEmail, changePassword } from '../../../supabase/supabaseFunctions';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import CustomPasswordInput from '../../../components/TextInputs/CustomPasswordInput';
import BackButton from '../../../components/Buttons/BackButton';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import {
  backgroundColor, green, emailRegex, passRegex,
} from '../../../constants/constants';

function EditAccountView({ navigation, route }) {
  const [newValue, setNewValue] = React.useState('');
  const [confirmValue, setConfirmValue] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const { option } = route.params;

  const [validValue, setValidValue] = React.useState(true);
  const [validConfirm, setValidConfirm] = React.useState(true);

  let tempValidValue = true;
  let tempValidConfirm = true;

  async function handleComplete() {
    if (option === 'email') {
      // Email Validation
      if (!emailRegex.test(newValue)) {
        tempValidValue = false;
        setValidValue(tempValidValue);
      } else {
        tempValidValue = true;
        setValidValue(tempValidValue);
      }

      // Confirm Validation
      if (!emailRegex.test(confirmValue)) {
        tempValidConfirm = false;
        setValidConfirm(tempValidConfirm);
      } else {
        tempValidConfirm = true;
        setValidConfirm(tempValidConfirm);
      }
    } else {
      // Password Validation
      if (!passRegex.test(newValue)) {
        tempValidValue = false;
        setValidValue(tempValidValue);
      } else {
        tempValidValue = true;
        setValidValue(tempValidValue);
      }

      // Confirm Validation
      if (!emailRegex.test(confirmValue)) {
        tempValidConfirm = false;
        setValidConfirm(tempValidConfirm);
      } else {
        tempValidConfirm = true;
        setValidConfirm(tempValidConfirm);
      }
    }

    if (tempValidValue && tempValidConfirm) {
      setLoading(true);

      if (option === 'email') {
        Alert.alert(
          'Change Email Confirmation',
          '\nAre you sure you want to change your email?',
          [
            { text: 'Cancel', onPress: () => { } },
            { text: 'Confirm', onPress: async () => { await changeEmail(newValue); } },
          ],
        );
      } else {
        Alert.alert(
          'Change Password Confirmation',
          '\nAre you sure you want to change your password?',
          [
            { text: 'Cancel', onPress: () => { } },
            { text: 'Confirm', onPress: async () => { await changePassword(newValue); } },
          ],
        );
      }

      setLoading(false);
    }
  }

  function isValid() {
    return newValue.length >= 8 && newValue === confirmValue;
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <CustomKeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Header */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Back Button */}

          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <BackButton />
          </TouchableOpacity>

          <Text style={globalStyles.header('white')}>
            {option !== 'password' ? 'Change Email' : 'Change Password'}
          </Text>

          {/* Complete */}

          {loading ? (
            <ActivityIndicator color="white" style={{ width: scale(35) }} />
          ) : (
            <TouchableOpacity
              onPress={() => handleComplete()}
              disabled={!isValid()}
              style={{ width: scale(35), alignItems: 'flex-end' }}
            >
              <Ionicons
                name="checkmark-done-sharp"
                size={scale(22)}
                color={isValid() ? green : 'gray'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Text Input */}

        {
          option !== 'password'
            ? (
              <View style={{ gap: scale(10) }}>
                <CustomTextInput
                  value={newValue}
                  onChangeText={setNewValue}
                  placeholder="Enter a new email address"
                  loading={loading}
                  autoCapitalize={false}
                  autoCorrect={false}
                  valid={validValue}
                  dark={false}
                />

                <CustomTextInput
                  value={confirmValue}
                  onChangeText={setConfirmValue}
                  placeholder="Confirm new email address"
                  loading={loading}
                  autoCapitalize={false}
                  autoCorrect={false}
                  valid={validConfirm}
                  dark={false}
                />
              </View>
            )
            : (
              <View style={{ gap: scale(10) }}>

                <CustomPasswordInput
                  value={newValue}
                  onChangeText={setNewValue}
                  placeholder="Enter a new password"
                  loading={loading}
                  valid={validValue}
                  dark={false}
                />

                <CustomPasswordInput
                  value={confirmValue}
                  onChangeText={setConfirmValue}
                  placeholder="Confirm new password"
                  loading={loading}
                  valid={validConfirm}
                  dark={false}
                />
              </View>
            )
        }

        {/* Spacer */}

        <View />
      </CustomKeyboardAvoidingView>
    </View>
  );
}

export default EditAccountView;
