import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Home } from '@/screens/Home';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/redux/slices/favoritesSlice'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/navigation';
import { logout } from '@/redux/slices/authSlice';
import { mockNavigation } from '../__mocks__/navigation';


type MockNavigation = NativeStackNavigationProp<RootStackParamsList, 'Home'>;

const mockNavigate = mockNavigation as MockNavigation

const mockStore = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: { items: [] },
  },
});

jest.mock('@/services/hooks/coinMarketCap/useGetCryptoListingLatest', () => ({
  useGetCryptoListingLatest: jest.fn(),
}));


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock('react-native-keychain', () => ({
  resetGenericPassword: jest.fn(),
}));

describe('Home Screen', () => {
  it('renders correctly', () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('home.title')).toBeTruthy();
  });

  it('shows loader when loading', () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders error message when API call fails', () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('error.titleGeneric')).toBeTruthy();
  });

  it('navigates to DetailCrypto when clicking on a crypto', async () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: { data: [{ id: 1, name: 'Bitcoin', symbol: 'BTC', quote: { USD: { price: 50000 } } }] },
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    jest.spyOn(mockNavigate, 'navigate');
    fireEvent.press(getByText('Bitcoin'));
    await waitFor(() => {
      expect(mockNavigate.navigate).toHaveBeenCalledWith('DetailCrypto', { id: 1 });
    });
  });

  it('logs out when pressing logout button', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

    const { getByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    fireEvent.press(getByText('home.logout'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(logout());
    });
  });
});

describe('Home Integration Test', () => {
  it('renders crypto list and allows searching', async () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: {
        data: [
          { id: 1, name: 'Bitcoin', symbol: 'BTC', quote: { USD: { price: 50000 } } },
          { id: 2, name: 'Ethereum', symbol: 'ETH', quote: { USD: { price: 3500 } } },
        ],
      },
      isLoading: false,
      isError: false,
    });

    const { getByText, getByPlaceholderText, queryByText } = render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Home navigation={mockNavigate} route={{ key: 'home', name: 'Home' }} />
        </NavigationContainer>
      </Provider>
    );

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText('home.search'), 'Bitcoin');

    await waitFor(() => {
      expect(getByText('Bitcoin')).toBeTruthy();
      expect(queryByText('Ethereum')).toBeNull();
    }, { timeout: 2000 });
  });
});
