import React, { useRef } from 'react';
import BorderedInput from './BorderedInput';

const SignForm = ({ isSignUp, onSubmit, form, createChangeTextHandler }) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder='이메일'
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCorrect={false}
        autoCompleteType='email'
        keyboardType='email-address'
        returnKeyType='next'
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        hasMarginBottom
        placeholder='비밀번호'
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) confirmPasswordRef.current.focus();
          else onSubmit();
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder='비밀번호 확인'
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType='done'
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
};

export default SignForm;
