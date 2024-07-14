import React, { FC, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { styles } from './styles';
import { Button, Details, Header } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { useTranslation } from 'react-i18next';
import { useGetCryptoQuotesLatestById } from '@/services/hooks/coinMarketCap/useGetCryptoQuotesLatestById';
import { colors } from '@/constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { addFavorite, removeFavorite } from '@/redux/slices/favoritesSlice';

type NavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'DetailCrypto'
>;

export const DetailCrypto: FC<NavigationProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const { data, isLoading, isError, refetch } =
    useGetCryptoQuotesLatestById(id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refetch]);

  const handleBackPress = () => navigation.goBack();

  const cryptoData = data?.data ? Object.values(data.data) : [];
  const crypto = cryptoData.length > 0 ? cryptoData[0] : undefined;

  const isFavorite = crypto
    ? favorites.some(item => item.id.toString() === crypto.id.toString())
    : false;

  const toggleFavorite = (): void => {
    if (crypto) {
      if (isFavorite) {
        dispatch(removeFavorite(crypto.id.toString()));
      } else {
        dispatch(addFavorite(crypto));
      }
    }
  };

  if (isLoading || !data) {
    <ActivityIndicator />;
  }
  const buttonTitle = isFavorite
    ? t('detailCrypto.buttonRemove', { crypto: crypto?.symbol })
    : t('detailCrypto.buttonAdd', { crypto: crypto?.symbol });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={handleBackPress}
        backButtonAccessibilityLabel={t('detailCrypto.backButton')}
        symbol={crypto?.symbol || ''}
        name={crypto?.name || ''}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.pink]}
            tintColor={colors.pink}
          />
        }>
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
        <View style={styles.buttonContent}>
          <Button
            onPress={toggleFavorite}
            title={buttonTitle}
            accessibilityLabel={buttonTitle}
            type="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
