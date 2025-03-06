import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, View } from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest, deleteToken } from '@/services';
import { Button, Error, Heading2, Input, Loader, Favorites, MemoizedCryptoInformation } from '@/components';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { ICrypto } from '@/interfaces/crypto';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useDebounce } from 'use-debounce';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export const Home: FC<NavigationProps> = ({ navigation }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<ICrypto[]>(data?.data || []);
  const [value, setValue] = useState<string>('');
  const [debouncedText] = useDebounce(value, 1000);
  const [isOpenFavorites, setIsOpenFavorites] = useState<boolean>(false);

  useEffect(() => {
    if (debouncedText.trim()) {
      const lowerCaseQuery = debouncedText.toLowerCase();
      const filtered = data?.data.filter(
        item =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.symbol.toLowerCase().includes(lowerCaseQuery),
      );
      setFilteredData(filtered || []);
    } else setFilteredData(data?.data || []);
  }, [debouncedText, data])

  const handleSearch = useCallback((text: string): void => {
    setValue(text);
  }, []);


  const handleCryptoPress = useCallback((id: number): void => {
    navigation.navigate('DetailCrypto', { id });
  }, [navigation]);


  const toggleFavorites = (): void => {
    setIsOpenFavorites(!isOpenFavorites);
  };

  const handleLogoutPress = useCallback(async (): Promise<void> => {
    await deleteToken();
    dispatch(logout());
  }, [dispatch]);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
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
              <MemoizedCryptoInformation
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
