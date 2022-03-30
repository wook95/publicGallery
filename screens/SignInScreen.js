import React, { useState } from 'react';
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
import SignButtons from '../components/SignButtons';
import { signIn, signUp } from '../lib/auth';
import { getUser } from '../lib/user';
import { useUserContext } from '../contexts/UserContext';

const SignInScreen = ({ navigation, route }) => {
  const { isSignUp } = route.params ?? {};
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState();
  const { setUser } = useUserContext();

  const createChangeTextHandler = name => value => {
    setForm({ ...form, [name]: value });
  };
  const submitForm = async () => {
    Keyboard.dismiss();
    const { email, password, confirmPassword } = form;

    if (isSignUp && confirmPassword !== password) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsLoading(true);

    const info = { email, password };
    try {
      const { user } = isSignUp ? await signUp(info) : await signIn(info);
      const profile = await getUser(user.uid);
      setIsLoading(false);
      if (!profile) navigation.navigate('Welcome', { uid: user.uid });
      else setUser(profile);
    } catch (e) {
      setIsLoading(false);
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호 입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
      console.log(e);
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
