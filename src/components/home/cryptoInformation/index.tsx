import { Heading3, Text1, Text2 } from '@/components';
import React, { FC } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface IProps {
  name: string;
  symbol: string;
  price: string;
}

export const CryptoInformation: FC<IProps> = ({ name, symbol, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Heading3 text={symbol} accessibilityLabel={symbol} />
        <Text1 text={name} accessibilityLabel={name} />
      </View>
      <Heading3 text={price} accessibilityLabel={price} />
    </View>
  );
};
