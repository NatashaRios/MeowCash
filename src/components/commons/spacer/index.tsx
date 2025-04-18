import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

export const Spacer: FC<ViewStyle> = ({ marginHorizontal, marginVertical }) => {
  return <View testID='spacer' style={{ marginHorizontal, marginVertical }} />;
};
