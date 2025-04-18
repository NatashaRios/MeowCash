import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MemoizedCryptoInformation as CryptoInformation } from '@/components';

describe('CryptoInformation Component', () => {
  const mockPress = jest.fn();
  const props = {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$60,000',
    onPress: mockPress,
  };

  it('renders symbol, name, and price correctly', () => {
    const { getByText } = render(<CryptoInformation {...props} />);

    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('$60,000')).toBeTruthy();
  });

  it('calls onPress with correct id when pressed', () => {
    const { getByText } = render(<CryptoInformation {...props} />);
    const button = getByText('BTC');

    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalledWith(1);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
