import React, { FC } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { CryptoInformation, Heading2 } from '@/components';
import { useTranslation } from 'react-i18next';

export const Home: FC = () => {
  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  isLoading && <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Heading2 text={t('home.title')} accessibilityLabel={t('home.title')} />
      </View>
      <FlatList
        data={data?.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: { id, name, symbol, quote } }) => (
          <CryptoInformation
            key={id}
            name={name}
            symbol={symbol}
            price={t('home.price', { price: quote.USD.price.toFixed(2) })}
          />
        )}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
};
