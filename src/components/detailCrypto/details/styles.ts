import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: colors.veryLightPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.brownBurgundyDark,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: 50,
    gap: 20,
    paddingVertical: 30,
  },
});
