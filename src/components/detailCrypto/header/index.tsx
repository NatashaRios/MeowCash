import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { Heading2, Text1 } from '@/components';

interface IProps {
  onPress: () => void;
  backButtonAccessibilityLabel: string;
  symbol: string;
  name: string;
}

export const Header: FC<IProps> = ({
  onPress,
  backButtonAccessibilityLabel,
  symbol,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} accessible={true} accessibilityRole="button">
        <Heading2 text="<" accessibilityLabel={backButtonAccessibilityLabel} />
      </Pressable>
      <View style={styles.textTopContent}>
        <Heading2 text={symbol} accessibilityLabel={symbol} />
        <Text1 text={name} accessibilityLabel={name} />
      </View>
    </View>
  );
};
