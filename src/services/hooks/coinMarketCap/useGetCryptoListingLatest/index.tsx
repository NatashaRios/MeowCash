import { CryptoListingLatest } from '@/interfaces/cryptoListingLatest';
import { getCryptoListingLatest } from '@/services/coinMarketCap/getCryptoListingLatest';
import { useQuery } from '@tanstack/react-query';

interface ICryptoListingLatest {
  data?: { data: CryptoListingLatest[] };
  isLoading: boolean;
  isError: boolean;
}

export const useGetCryptoListingLatest = (): ICryptoListingLatest => {
  const { data, isLoading, isError } = useQuery<
    { data: CryptoListingLatest[] },
    Error
  >({
    queryKey: ['getCryptoListingLatest'],
    queryFn: getCryptoListingLatest,
  });

  return { data, isLoading, isError };
};
