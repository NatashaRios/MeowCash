import React, { FC, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '@/screens/noAuth/login';
import { Home } from '@/screens/auth/home';
import { DetailCrypto } from '@/screens/auth/detailCrypto';

interface IDetailCryptoProps {
  id: number;
}

export type RootStackParamsList = {
  Login: undefined;
  Home: undefined;
  DetailCrypto: IDetailCryptoProps;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const RootNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailCrypto" component={DetailCrypto} />
    </Stack.Navigator>
  );
};
