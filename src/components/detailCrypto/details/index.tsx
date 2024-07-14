import React, { FC } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Heading3, Text1 } from '@/components';

interface IProps {
  price: string;
  percentChange: string;
  color: string;
  volume: string;
}

export const Details: FC<IProps> = ({
  price,
  percentChange,
  color,
  volume,
}) => {
  return (
    <View style={styles.container}>
      <Heading3 text={price} accessibilityLabel={price} />
      <Heading3
        text={percentChange}
        accessibilityLabel={percentChange}
        color={color}
      />
      <Text1 text={volume} accessibilityLabel={volume} textAlign="center" />
    </View>
  );
};
