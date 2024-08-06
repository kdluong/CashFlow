import { Alert } from 'react-native';
import { supabase } from './supabase.ts';

export async function signUpWithEmail(email, password, first, last) {
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    Alert.alert(authError.message);
  } else {
    const { error } = await supabase.from('users').insert([
      {
        user_id: data.user.id,
        first_name: first,
        last_name: last,
        image: null,
      },
    ]);

    if (error) {
      Alert.alert(error.message);
      return false;
    }

    Alert.alert(
      'Sign Up Successful',
      '\nPlease check your email and click the confirmation link to verify your email address.',
    );

    return true;
  }

  return false;

  // setLoading(false)
}

export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) Alert.alert(error.message);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) Alert.alert(error.message);
}

export async function changeEmail(email) {
  const { error } = await supabase.auth.updateUser({ email });

  if (error) {
    Alert.alert('Error', error.message.substring(error.message.lastIndexOf(': ') + 1));
    return false;
  } else {
    return true;
  }
}

export async function changePassword(password) {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    Alert.alert('Error', error.message.substring(error.message.lastIndexOf(': ') + 1));
    return false;
  } else {
    return true;
  }
}
