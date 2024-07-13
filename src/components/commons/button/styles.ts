import { colors } from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkPink,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    color: colors.brownBurgundyDark,
  },
});
