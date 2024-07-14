import React, { FC } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { CryptoInformation, Heading2 } from '@/components';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export const Home: FC<NavigationProps> = ({ navigation }) => {
  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  const handleCryptoPress = (id: number): void => {
    navigation.navigate('DetailCrypto', { id });
  };
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
            id={id}
            name={name}
            symbol={symbol}
            price={t('home.price', { price: quote.USD.price.toFixed(2) })}
            onPress={handleCryptoPress}
          />
        )}
        initialNumToRender={10}
        accessibilityRole="list"
      />
    </SafeAreaView>
  );
};
