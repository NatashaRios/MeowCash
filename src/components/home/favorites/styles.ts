import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: colors.veryLightPink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.brownBurgundy,
  },
  favoriteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
