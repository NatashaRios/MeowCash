import { colors } from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.pink,
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    textAlign: 'center',
  },
});
