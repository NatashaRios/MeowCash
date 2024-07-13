import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/navigation';
import './src/localization/i18n';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
