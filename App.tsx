import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/navigation';
import SplashScreen from 'react-native-splash-screen';

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
