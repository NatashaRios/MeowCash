import { Heading3, Text1 } from '@/components';
import React, { FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface IProps {
  id: number;
  name: string;
  symbol: string;
  price: string;
  onPress: (id: number) => void;
}

const CryptoInformation: FC<IProps> = ({
  id,
  name,
  symbol,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id)}
      accessible={true}
      accessibilityRole="button">
      <View style={styles.textContent}>
        <Heading3 text={symbol} accessibilityLabel={symbol} />
        <Text1 text={name} accessibilityLabel={name} />
      </View>
      <Heading3 text={price} accessibilityLabel={price} />
    </TouchableOpacity>
  );
};

export const MemoizedCryptoInformation = memo(CryptoInformation);
