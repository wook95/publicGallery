import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { signOut } from '../lib/auth';
import { createUser } from '../lib/user';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import { useUserContext } from '../contexts/UserContext';

const SetupProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUserContext();
  const navigation = useNavigation();

  const { params } = useRoute();
  const { uid } = params || {};

  const submitForm = async () => {
    setIsLoading(true);
    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop();
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }
      photoURL = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
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
          source={
            response
              ? { uri: response?.assets[0].uri }
              : require('../assets/default-user.png')
          }
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
        {isLoading ? (
          <ActivityIndicator size={32} color='#6200ee' style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title='다음' onPress={submitForm} hasMarginBottom />
            <CustomButton title='취소' onPress={cancelForm} theme='secondary' />
          </View>
        )}
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
  spinner: {
    marginTop: 24,
  },
});

export default SetupProfile;
