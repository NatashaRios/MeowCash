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
