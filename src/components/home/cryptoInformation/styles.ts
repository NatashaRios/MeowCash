import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.veryLightPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.brownBurgundyDark,
    margin: 10,
    borderRadius: 10,
  },
  textContent: {
    gap: 4,
  },
});
