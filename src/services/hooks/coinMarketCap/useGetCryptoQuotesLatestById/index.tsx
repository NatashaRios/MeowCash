import { ICrypto } from '@/interfaces/crypto';
import { getCryptoQuotesLatestById } from '@/services/coinMarketCap/getCryptoQuotesLatestById';
import { useQuery } from '@tanstack/react-query';

interface ICryptoQuotesatest {
  data?: { data: ICrypto[] };
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const useGetCryptoQuotesLatestById = (
  id: number,
): ICryptoQuotesatest => {
  const { data, isLoading, isError, refetch } = useQuery<
    { data: ICrypto[] },
    Error
  >({
    queryKey: ['getCryptoQuotesLatestById'],
    queryFn: () => getCryptoQuotesLatestById(id),
  });

  return { data, isLoading, isError, refetch };
};
