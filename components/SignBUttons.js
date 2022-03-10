import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignButtons = ({ isSignUp, onSubmit, isLoading }) => {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const pressSecondaryButton = () => {
    if (isSignUp) navigation.goBack();
    else navigation.push('SignIn', { isSignUp: true });
  };

  if (isLoading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color='#6200ee' />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
      <CustomButton
        title={secondaryTitle}
        theme='secondary'
        onPress={pressSecondaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;
