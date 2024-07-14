import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './styles';

interface IProps extends TextProps {
  text: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

export const Text1: FC<IProps> = ({ text, accessibilityLabel, textAlign }) => {
  return (
    <Text
      style={[styles.text, { textAlign }]}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text">
      {text}
    </Text>
  );
};
