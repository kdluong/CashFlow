import React from "react";
import { supabase } from "./supabase";
import { Session } from '@supabase/supabase-js';
import { Alert } from "react-native";

export async function signUpWithEmail(email, password, first, last) {

    const { data: data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (authError) {
        Alert.alert(authError.message)
    }
    else {

        const { error } = await supabase
            .from('users')
            .insert([{
                user_id: data.user.id,
                first_name: first,
                last_name: last,
                picture: null,
            }])

        if (error) Alert.alert(error.message)
    }

    //setLoading(false)
};

export async function signInWithEmail(email, password) {
    //setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) Alert.alert(error.message)

    //setLoading(false);
};

export async function signOut() {
    const { error } = await supabase.auth.signOut()
};

export async function changeEmail(email) {
    const { data, error } = await supabase.auth.updateUser({ email: email })

    console.log(email);

    if (error) {
        console.log(error);
        Alert.alert('Error', (error.message).substring((error.message).lastIndexOf(": ") + 1));
    }
    else {
        Alert.alert('Request Sent.', 'Check your email for a confirmation link.');
    }
};

export async function changePassword(password) {
    const { data, error } = await supabase.auth.updateUser({ password: password })

    if (error) {
        console.log(error);
        Alert.alert('Error', (error.message).substring((error.message).lastIndexOf(": ") + 1));
    }
    else {
        Alert.alert('Password Successfully Changed.');
    }
};
