import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Platform, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { signOut } from '../lib/auth';
import { createUser } from '../lib/user';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import { useUserContext } from '../contexts/UserContext';

const SetupProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState(null);

  const { setUser } = useUserContext();
  const navigation = useNavigation();

  const { params } = useRoute();
  const { uid } = params || {};

  const submitForm = () => {
    const user = {
      id: uid,
      displayName,
      photoURL: null,
    };
    createUser(user);
    setUser(user);
  };
  const cancelForm = () => {
    signOut();
    navigation.goBack();
  };
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) return;
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={selectImage}>
        <Image
          style={styles.circle}
          source={{ uri: response?.assets[0].uri }}
        />
      </Pressable>
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
