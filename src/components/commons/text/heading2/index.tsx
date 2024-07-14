import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './styles';

interface IProps extends TextProps {
  text: string;
}

export const Heading2: FC<IProps> = ({ text, accessibilityLabel }) => {
  return (
    <Text
      style={styles.text}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text">
      {text}
    </Text>
  );
};
