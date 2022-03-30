import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { signOut } from '../lib/auth';
import { createUser } from '../lib/user';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

const SetupProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  const { params } = useRoute();
  const { uid } = params || {};

  const submitForm = () => {
    createUser({
      id: uid,
      displayName,
      photoURL: null,
    });
  };
  const cancelForm = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <View style={styles.circle} />
      <View style={styles.form}>
        <BorderedInput
          placeholder='닉네임'
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={submitForm}
          returnKeyType='next'
        />
        <View style={styles.buttons}>
          <CustomButton title='다음' onPress={submitForm} hasMarginBottom />
          <CustomButton title='취소' onPress={cancelForm} theme='secondary' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  circle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#cdcdcd',
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
