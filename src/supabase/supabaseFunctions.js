import React from 'react';
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from './supabase';

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
        picture: null,
      },
    ]);

    if (error) Alert.alert(error.message);
  }

  // setLoading(false)
}

export async function signInWithEmail(email, password) {
  // setLoading(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) Alert.alert(error.message);

  // setLoading(false);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
}

export async function changeEmail(email) {
  const { data, error } = await supabase.auth.updateUser({ email });

  console.log(email);

  if (error) {
    console.log(error);
    Alert.alert('Error', error.message.substring(error.message.lastIndexOf(': ') + 1));
  } else {
    Alert.alert('Request Sent.', 'Check your email for a confirmation link.');
  }
}

export async function changePassword(password) {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log(error);
    Alert.alert('Error', error.message.substring(error.message.lastIndexOf(': ') + 1));
  } else {
    Alert.alert('Password Successfully Changed.');
  }
}
