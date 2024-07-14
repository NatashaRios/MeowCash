import React, { FC, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { Heading2, Input } from '@/components';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { ICrypto } from '@/interfaces/crypto';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Favorites } from '@/components';
import CryptoInformation from '@/components/home/cryptoInformation';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export const Home: FC<NavigationProps> = ({ navigation }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<ICrypto[]>();
  const [value, setValue] = useState('');
  const [isOpenFavorites, setIsOpenFavorites] = useState<boolean>(false);

  const handleSearch = (text: string): void => {
    const lowerCaseQuery = text.toLowerCase();
    const filtered = data?.data.filter(
      item =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.symbol.toLowerCase().includes(lowerCaseQuery),
    );
    setFilteredData(filtered);
    setValue(text);
  };

  const handleCryptoPress = (id: number): void => {
    navigation.navigate('DetailCrypto', { id });
  };

  const toggleFavorites = (): void => {
    setIsOpenFavorites(!isOpenFavorites);
  };

  isLoading && <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Heading2 text={t('home.title')} accessibilityLabel={t('home.title')} />
      </View>
      <Input
        placeholder={t('home.search')}
        value={value}
        onChangeText={handleSearch}
      />
      <Favorites
        onPress={toggleFavorites}
        title={t('home.favorite')}
        isOpen={isOpenFavorites}
        favorites={favorites}
        onCryptoPress={handleCryptoPress}
      />
      <FlatList
        data={value.length > 0 ? filteredData : data?.data || []}
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
        windowSize={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};
