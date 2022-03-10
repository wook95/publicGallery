import auth from '@react-native-firebase/auth';

export const signIn = ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signUp = ({ email, password }) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const subscribeAuth = callback => {
  return auth().onAuthStateChanged(callback);
};

export const signOut = () => {
  return auth().signOut();
};
