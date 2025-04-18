import React from 'react';
import { render } from '@testing-library/react-native';
import { DetailCrypto } from '@/screens/DetailCrypto';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/redux/slices/favoritesSlice';
import { useGetCryptoQuotesLatestById } from '@/services';
import { mockNavigation } from '../__mocks__/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';

jest.mock('@/services', () => ({
  useGetCryptoQuotesLatestById: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.crypto) return `${key} ${options.crypto}`;
      if (options?.volume) return `${key} ${options.volume}`;
      if (options?.price) return `${key} ${options.price}`;
      return key;
    },
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn().mockReturnValue([]),
}));

const mockStore = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: { items: [] },
  },
});

type DetailCryptoRouteProp = NativeStackScreenProps<RootStackParamsList, 'DetailCrypto'>['route'];

const mockRoute: DetailCryptoRouteProp = {
  key: 'detailCrypto',
  name: 'DetailCrypto',
  params: { id: 2 },
};

describe('DetailCrypto Screen', () => {
  it('shows loader when loading', () => {
    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <DetailCrypto navigation={mockNavigation} route={mockRoute} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders error when API call fails', () => {
    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: { data: {} },
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <DetailCrypto navigation={mockNavigation} route={mockRoute} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('error.titleGeneric')).toBeTruthy();
    expect(getByText('error.descriptionGeneric')).toBeTruthy();
  });

  it('renders crypto data and toggle favorite button', () => {
    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: {
        data: {
          '1': {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            quote: {
              USD: {
                price: 50000,
                percent_change_24h: 5.5,
                volume_24h: 123456,
              },
            },
          },
        },
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <DetailCrypto navigation={mockNavigation} route={mockRoute} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('detailCrypto.buttonAdd BTC')).toBeTruthy();
    expect(getByText('detailCrypto.price 50000.00')).toBeTruthy();
    expect(getByText('detailCrypto.volume 123456.00')).toBeTruthy();
  });
});
