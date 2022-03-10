import React, { useRef, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignForm from '../components/SignForm';
import SignButtons from '../components/SignBUttons';
import { signIn, signUp } from '../lib/auth';

const SignInScreen = ({ navigation, route }) => {
  const { isSignUp } = route.params ?? {};
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState();

  const createChangeTextHandler = name => value => {
    setForm({ ...form, [name]: value });
  };
  const submitForm = async () => {
    Keyboard.dismiss();
    const { email, password } = form;
    const info = { email, password };
    setIsLoading(true);
    try {
      const { user } = isSignUp ? await signUp(info) : await signIn(info);
      console.log(user);
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ ios: 'padding' })}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={submitForm}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={submitForm}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
