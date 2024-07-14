import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    height: 40,
    color: colors.pink,
    marginHorizontal: 15,
    marginVertical: 12,
    shadowColor: colors.veryLightPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.brownBurgundyDark,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
