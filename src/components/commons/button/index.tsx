import React, { FC } from 'react';
import { ButtonProps, Pressable, Text } from 'react-native';
import { styles } from './styles';

interface IProps extends ButtonProps {}

export const Button: FC<IProps> = ({ onPress, accessibilityLabel, title }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
