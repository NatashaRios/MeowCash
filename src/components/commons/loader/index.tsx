import { colors } from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

export const Loader = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.pink} accessibilityLabel={t('loader')} accessible testID='loader' />
    </View>
  );
};
