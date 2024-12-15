import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useLoginGoogle, setToken } from '@/services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, Text } from 'react-native';

jest.mock('@/services/hooks/auth/useLoginGoogle');
jest.mock('@/services/keychain/token');

const queryClient = new QueryClient();

const TestComponent = () => {
  const { loginMutate, isSuccess, isError, isPending, data } = useLoginGoogle();

  useEffect(() => {
    loginMutate();
  }, [loginMutate]);

  useEffect(() => {
    if (isSuccess && data) {
      setToken(data);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isPending && <ActivityIndicator testID="ActivityIndicator" />}
      {isSuccess && <Text>Success: {data}</Text>}
      {isError && <Text>Error</Text>}
    </>
  );
};

describe('useLoginGoogle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set token on success', async () => {
    const data = 'token-test';
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      data: data,
      isSuccess: true,
      isError: false,
      isPending: false,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => getByText(/Success: token-test/i));

    expect(setToken).toHaveBeenCalledWith(data);
  });

  it('should handle error', async () => {
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      data: undefined,
      isSuccess: false,
      isError: true,
      isPending: false,
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => getByText(/Error/i));

    expect(getByText(/Error/i)).toBeTruthy();
  });

  it('should be pending during mutation', async () => {
    (useLoginGoogle as jest.Mock).mockReturnValue({
      loginMutate: jest.fn(),
      data: undefined,
      isSuccess: false,
      isError: false,
      isPending: true,
    });

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>,
    );

    await waitFor(() => getByTestId('ActivityIndicator'));

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
});
