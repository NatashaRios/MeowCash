import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brownBurgundyDark,
  },
  topContent: {
    backgroundColor: colors.brownBurgundy,
    width: '100%',
    padding: 10,
    height: 50,
  },
  footer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
