import React, { FC } from 'react';
import { View } from 'react-native';
import { Heading2 } from '../text/heading2';
import { Heading3 } from '../text/heading3';
import { styles } from './styles';

interface IProps {
  title: string;
  description: string;
}

export const Error: FC<IProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Heading2 text={title} accessibilityLabel={title} />
      <Heading3 text={description} accessibilityLabel={description} />
    </View>
  );
};
