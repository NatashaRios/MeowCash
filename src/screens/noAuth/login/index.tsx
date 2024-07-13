import React, { FC, useEffect } from 'react';
import { Alert, Image, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { Button, Heading1, Spacer } from '@/components';
import { useTranslation } from 'react-i18next';
import { useLoginGoogle } from '@/services/hooks/auth/useLoginGoogle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;

export const Login: FC<NavigationProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { loginMutate, isSuccess, isError } = useLoginGoogle();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Home');
    }

    if (isError) {
      Alert.alert('Ocurrio un error');
    }
  }, [isSuccess, isError]);

  const handleLoginPress = () => {
    loginMutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} />
      <Heading1 text={t('login.title')} accessibilityLabel={t('login.title')} />
      <Spacer marginVertical={30} />
      <Button
        title={t('login.button')}
        onPress={handleLoginPress}
        accessibilityLabel={t('login.button')}
      />
    </SafeAreaView>
  );
};
