import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetCryptoListingLatest } from '@/services/hooks/coinMarketCap/useGetCryptoListingLatest';
import { ActivityIndicator, Text, FlatList } from 'react-native';

jest.mock('@/services/hooks/coinMarketCap/useGetCryptoListingLatest');

const queryClient = new QueryClient();

const TestComponent = () => {
  const { data, isLoading, isError } = useGetCryptoListingLatest();

  return (
    <>
      {isLoading && <ActivityIndicator testID="ActivityIndicator" />}
      {isError && <Text>Error</Text>}
      {data && data.data && (
        <FlatList
          data={data.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      )}
    </>
  );
};

describe('useGetCryptoListingLatest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading', async () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => getByTestId('ActivityIndicator'));

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('should render data on success', async () => {
    const mockData = {
      data: [
        {
          id: 1,
          name: 'Bitcoin',
          quote: {
            USD: {
              price: 40000,
              percent_change_24h: 5,
              volume_24h: 3000000,
            },
          },
          slug: 'bitcoin',
          symbol: 'BTC',
        },
        {
          id: 2,
          name: 'Ethereum',
          quote: {
            USD: {
              price: 2500,
              percent_change_24h: 3,
              volume_24h: 2000000,
            },
          },
          slug: 'ethereum',
          symbol: 'ETH',
        },
      ],
    };

    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      return getByText(/Bitcoin/i);
    });

    expect(getByText(/Bitcoin/i)).toBeTruthy();
    expect(getByText(/Ethereum/i)).toBeTruthy();
  });

  it('should handle error', async () => {
    (useGetCryptoListingLatest as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      return getByText(/Error/i);
    });

    expect(getByText(/Error/i)).toBeTruthy();
  });
});
