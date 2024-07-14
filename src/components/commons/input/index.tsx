import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import { colors } from '@/constants/colors';

interface IProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const Input: FC<IProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.pink}
      value={value}
      onChangeText={onChangeText}
      accessibilityRole="search"
      accessible={true}
    />
  );
};
