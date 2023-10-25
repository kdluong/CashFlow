import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import globalStyles from '../../../styles/styles';
import { changeEmail, changePassword } from '../../../supabase/supabaseFunctions';
import CustomTextInput from '../../../components/TextInputs/CustomTextInput';
import BackButton from '../../../components/Buttons/BackButton';
import CustomKeyboardAvoidingView from '../../../components/CustomViews/CustomKeyboardAvoidingView';
import { backgroundColor, green } from '../../../constants/constants';

function EditAccountView({ navigation, route }) {
  const [newValue, setNewValue] = React.useState('');
  const [confirmEmail, setConfirmEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { option } = route.params;

  async function handleComplete() {
    setLoading(true);

    if (option == 'email') {
      await changeEmail(newValue);
    } else {
      await changePassword(newValue);
    }

    setLoading(false);

    navigation.goBack();
  }

  function isValid() {
    let valid = false;

    if (newValue.length < 8) {
      valid = false;
    } else if (option != 'password' && newValue == confirmEmail) {
      valid = true;
    } else if (newValue == confirmPassword) {
      valid = true;
    }

    return valid;
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
            {option != 'password' ? 'Change Email' : 'Change Password'}
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

        <View style={{ gap: scale(10) }}>
          <CustomTextInput
            value={newValue}
            onChangeText={setNewValue}
            placeholder={option == 'email' ? 'Enter a new email address' : 'Enter a new password'}
            loading={loading}
          />

          {option != 'password' && (
            <CustomTextInput
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              placeholder="Confirm new email address"
              loading={loading}
            />
          )}

          {option == 'password' && (
            <CustomTextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              loading={loading}
            />
          )}
        </View>

        {/* Spacer */}

        <View />
      </CustomKeyboardAvoidingView>
    </View>
  );
}

export default EditAccountView;
