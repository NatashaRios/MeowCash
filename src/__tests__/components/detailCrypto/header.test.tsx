import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from '@/components';

describe('Header Component', () => {
  it('renders symbol and name correctly', () => {
    const mockPress = jest.fn();
    const symbol = 'BTC';
    const name = 'Bitcoin';

    const { getByText } = render(
      <Header
        onPress={mockPress}
        backButtonAccessibilityLabel="Go back"
        symbol={symbol}
        name={name}
      />
    );

    expect(getByText('<')).toBeTruthy();
    expect(getByText(symbol)).toBeTruthy();
    expect(getByText(name)).toBeTruthy();
  });

  it('calls onPress when back button is pressed', () => {
    const mockPress = jest.fn();

    const { getByText } = render(
      <Header
        onPress={mockPress}
        backButtonAccessibilityLabel="Go back"
        symbol="BTC"
        name="Bitcoin"
      />
    );

    const backButton = getByText('<');
    fireEvent.press(backButton);
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});