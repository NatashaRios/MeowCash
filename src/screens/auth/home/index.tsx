import React, { FC, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { Button, Error, Heading2, Input, Loader } from '@/components';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { ICrypto } from '@/interfaces/crypto';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Favorites } from '@/components';
import CryptoInformation from '@/components/home/cryptoInformation';
import { useDispatch } from 'react-redux';
import { deleteToken } from '@/services/keychain/token';
import { logout } from '@/redux/slices/authSlice';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export const Home: FC<NavigationProps> = ({ navigation }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<ICrypto[]>();
  const [value, setValue] = useState<string>('');
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

  const handleLogoutPress = async (): Promise<void> => {
    await deleteToken();
    dispatch(logout());
    navigation.navigate('Login');
  };

  if (isLoading) {
    return <Loader />;
  }

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
      {isError ? (
        <Error
          title={t('error.titleGeneric')}
          description={t('error.descriptionGeneric')}
        />
      ) : (
        <>
          {favorites.length >= 1 && (
            <Favorites
              onPress={toggleFavorites}
              title={t('home.favorite')}
              isOpen={isOpenFavorites}
              favorites={favorites}
              onCryptoPress={handleCryptoPress}
            />
          )}
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
            ListFooterComponent={
              <Button
                onPress={handleLogoutPress}
                title={t('home.logout')}
                accessibilityLabel={t('home.logout')}
                type="secondary"
              />
            }
            ListFooterComponentStyle={styles.footer}
          />
        </>
      )}
    </SafeAreaView>
  );
};
