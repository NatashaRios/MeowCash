import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/noAuth/login';
import { Home } from '@/screens/auth/home';

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const RootNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
