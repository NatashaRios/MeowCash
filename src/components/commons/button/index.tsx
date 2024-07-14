import React, { FC } from 'react';
import { ButtonProps, Pressable, Text } from 'react-native';
import { styles } from './styles';
import { colors } from '@/constants/colors';

interface IProps extends ButtonProps {
  type?: 'primary' | 'secondary';
}

export const Button: FC<IProps> = ({
  onPress,
  accessibilityLabel,
  title,
  type = 'primary',
}) => {
  const backgroundColor = type === 'primary' ? colors.pink : 'transparent';
  const colorText = type === 'primary' ? colors.brownBurgundyDark : colors.pink;
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor },
        type === 'secondary' && styles.border,
      ]}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      <Text style={[styles.text, { color: colorText }]}>{title}</Text>
    </Pressable>
  );
};
