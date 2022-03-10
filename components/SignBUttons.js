import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignButtons = ({ isSignUp, onSubmit }) => {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const pressSecondaryButton = () => {
    if (isSignUp) navigation.goBack();
    else navigation.push('SignIn', { isSignUp: true });
  };

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
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;
