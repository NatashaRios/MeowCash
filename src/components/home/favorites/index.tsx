import { Heading3 } from '@/components';
import React, { FC } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { styles } from './styles';
import { ICrypto } from '@/interfaces/crypto';
import { useTranslation } from 'react-i18next';
import CryptoInformation from '../cryptoInformation';

interface IProps {
  onPress: () => void;
  title: string;
  isOpen: boolean;
  favorites: ICrypto[];
  onCryptoPress: (id: number) => void;
}

export const Favorites: FC<IProps> = ({
  onPress,
  title,
  isOpen,
  favorites,
  onCryptoPress,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.favoriteContent}
        accessibilityRole="button"
        accessible={true}
        onPress={onPress}>
        <Heading3 text={title} accessibilityLabel={title} />
        <Heading3
          text={isOpen ? '^' : 'v'}
          accessibilityLabel={isOpen ? '^' : 'v'}
        />
      </Pressable>
      {isOpen && (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item: { id, name, symbol, quote } }) => (
            <CryptoInformation
              key={id}
              id={id}
              name={name}
              symbol={symbol}
              price={t('home.price', { price: quote.USD.price.toFixed(2) })}
              onPress={() => onCryptoPress(id)}
            />
          )}
        />
      )}
    </View>
  );
};
