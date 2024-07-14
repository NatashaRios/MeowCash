import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './styles';
import { colors } from '@/constants/colors';

interface IProps extends TextProps {
  text: string;
  color?: string;
}

export const Heading3: FC<IProps> = ({ text, accessibilityLabel, color }) => {
  return (
    <Text
      style={[styles.text, { color: color || colors.pink }]}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text">
      {text}
    </Text>
  );
};
