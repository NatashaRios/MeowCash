import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetCryptoQuotesLatestById } from '@/services';
import { ActivityIndicator, Text, FlatList, Button } from 'react-native';

jest.mock('@/services/hooks/coinMarketCap/useGetCryptoQuotesLatestById');

const queryClient = new QueryClient();

const TestComponent = ({ id }: { id: number }) => {
  const { data, isLoading, isError, refetch } =
    useGetCryptoQuotesLatestById(id);

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
      <Button title="Refetch" onPress={refetch} />
    </>
  );
};

describe('useGetCryptoQuotesLatestById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading', async () => {
    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent id={1} />
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

    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent id={1} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      return getByText(/Bitcoin/i);
    });

    expect(getByText(/Bitcoin/i)).toBeTruthy();
    expect(getByText(/Ethereum/i)).toBeTruthy();
  });

  it('should refetch data on button click', async () => {
    const refetchMock = jest.fn();
    (useGetCryptoQuotesLatestById as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: refetchMock,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent id={1} />
      </QueryClientProvider>,
    );

    const button = getByText('Refetch');
    fireEvent.press(button);

    expect(refetchMock).toHaveBeenCalled();
  });
});
