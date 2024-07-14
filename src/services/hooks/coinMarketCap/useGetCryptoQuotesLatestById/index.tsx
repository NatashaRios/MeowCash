import { CryptoListingLatest } from '@/interfaces/cryptoListingLatest';
import { getCryptoQuotesLatestById } from '@/services/coinMarketCap/getCryptoQuotesLatestById';
import { useQuery } from '@tanstack/react-query';

interface ICryptoListingLatest {
  data?: { data: CryptoListingLatest[] };
  isLoading: boolean;
  isError: boolean;
}

export const useGetCryptoQuotesLatestById = (
  id: number,
): ICryptoListingLatest => {
  const { data, isLoading, isError } = useQuery<
    { data: CryptoListingLatest[] },
    Error
  >({
    queryKey: ['getCryptoQuotesLatestById'],
    queryFn: () => getCryptoQuotesLatestById(id),
  });

  return { data, isLoading, isError };
};
