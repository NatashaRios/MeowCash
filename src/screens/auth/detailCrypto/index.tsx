import React, { FC } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import { Details, Header, Heading3, Text1 } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { useTranslation } from 'react-i18next';
import { useGetCryptoQuotesLatestById } from '@/services/hooks/coinMarketCap/useGetCryptoQuotesLatestById';
import { colors } from '@/constants/colors';

type NavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'DetailCrypto'
>;

export const DetailCrypto: FC<NavigationProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetCryptoQuotesLatestById(id);
  const handleBackPress = () => navigation.goBack();

  const cryptoData = data?.data ? Object.values(data.data) : [];
  const crypto = cryptoData.length > 0 ? cryptoData[0] : undefined;
  isLoading && <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={handleBackPress}
        backButtonAccessibilityLabel={t('detailCrypto.backButton')}
        symbol={crypto?.symbol || ''}
        name={crypto?.name || ''}
      />
      <Details
        price={t('detailCrypto.price', {
          price: crypto?.quote.USD.price.toFixed(2),
        })}
        percentChange={`${crypto?.quote.USD.percent_change_24h.toFixed(2)}%`}
        color={
          crypto && crypto.quote.USD.percent_change_24h < 0
            ? colors.red
            : colors.green
        }
        volume={t('detailCrypto.volume', {
          volume: `${crypto?.quote.USD.volume_24h.toFixed(2)}`,
        })}
      />
    </SafeAreaView>
  );
};
