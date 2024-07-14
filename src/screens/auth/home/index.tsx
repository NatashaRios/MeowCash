import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { styles } from './styles';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { CryptoInformation, Heading2 } from '@/components';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { colors } from '@/constants/colors';
import { CryptoListingLatest } from '@/interfaces/cryptoListingLatest';

type NavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export const Home: FC<NavigationProps> = ({ navigation }) => {
  const { data, isLoading, isError } = useGetCryptoListingLatest();
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState<CryptoListingLatest[]>();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    const lowerCaseQuery = text.toLowerCase();
    const filtered = data?.data.filter(
      item =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.symbol.toLowerCase().includes(lowerCaseQuery),
    );
    setFilteredData(filtered);
    setSearchText(text);
  };

  const handleCryptoPress = (id: number): void => {
    navigation.navigate('DetailCrypto', { id });
  };

  isLoading && <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <Heading2 text={t('home.title')} accessibilityLabel={t('home.title')} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={t('home.search')}
        placeholderTextColor={colors.pink}
        value={searchText}
        onChangeText={handleSearch}
        accessibilityRole="search"
        accessible={true}
      />
      <FlatList
        data={searchText.length > 0 ? filteredData : data?.data || []}
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
