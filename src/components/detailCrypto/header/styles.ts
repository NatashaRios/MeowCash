import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brownBurgundy,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  textTopContent: {
    width: '100%',
    alignItems: 'center',
  },
});
