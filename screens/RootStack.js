import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainTab from './MainTab';
import { useUserContext } from '../contexts/UserContext';
import { getUser } from '../lib/user';
import { subscribeAuth } from '../lib/auth';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      unsubscribe();
      if (!currentUser) return;

      const profile = await getUser(currentUser.uid);
      if (!profile) return;
      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name='MainTab'
            component={MainTab}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='SignIn'
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
