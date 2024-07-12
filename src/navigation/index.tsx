import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/noAuth/login';

export type RootStackParamsList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const RootNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
