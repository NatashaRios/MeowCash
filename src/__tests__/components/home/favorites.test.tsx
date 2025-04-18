import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Favorites } from '@/components';
import { ICrypto } from '@/interfaces/crypto';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Favorites Component', () => {
  const mockOnPress = jest.fn();
  const mockOnCryptoPress = jest.fn();

  const favoritesMock: ICrypto[] = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      slug: 'bitcoin',
      quote: {
        USD: {
          price: 60000,
          percent_change_24h: 2.5,
          volume_24h: 50000000,
        },
      },
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      slug: 'ethereum',
      quote: {
        USD: {
          price: 3000,
          percent_change_24h: -1.2,
          volume_24h: 30000000,
        },
      },
    },
  ];

  it('renders title and toggle icon', () => {
    const { getByText } = render(
      <Favorites
        onPress={mockOnPress}
        title="My Favorites"
        isOpen={false}
        favorites={favoritesMock}
        onCryptoPress={mockOnCryptoPress}
      />
    );

    expect(getByText('My Favorites')).toBeTruthy();
    expect(getByText('v')).toBeTruthy();
  });

  it('calls onPress when header is pressed', () => {
    const { getByText } = render(
      <Favorites
        onPress={mockOnPress}
        title="My Favorites"
        isOpen={false}
        favorites={favoritesMock}
        onCryptoPress={mockOnCryptoPress}
      />
    );

    const pressable = getByText('My Favorites');
    fireEvent.press(pressable);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders favorite items when isOpen is true', () => {
    const { getByText } = render(
      <Favorites
        onPress={mockOnPress}
        title="My Favorites"
        isOpen={true}
        favorites={favoritesMock}
        onCryptoPress={mockOnCryptoPress}
      />
    );

    expect(getByText('^')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Bitcoin')).toBeTruthy();

    expect(getByText('ETH')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('calls onCryptoPress when a favorite is pressed', () => {
    const { getByText } = render(
      <Favorites
        onPress={mockOnPress}
        title="My Favorites"
        isOpen={true}
        favorites={favoritesMock}
        onCryptoPress={mockOnCryptoPress}
      />
    );

    fireEvent.press(getByText('BTC'));
    expect(mockOnCryptoPress).toHaveBeenCalledWith(1);

    fireEvent.press(getByText('ETH'));
    expect(mockOnCryptoPress).toHaveBeenCalledWith(2);
  });
});
