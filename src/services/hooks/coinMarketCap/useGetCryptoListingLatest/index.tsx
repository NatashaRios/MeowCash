import { ICrypto } from '@/interfaces/crypto';
import { getCryptoListingLatest } from '@/services/coinMarketCap/getCryptoListingLatest';
import { useQuery } from '@tanstack/react-query';

interface ICryptoListingLatest {
  data?: { data: ICrypto[] };
  isLoading: boolean;
  isError: boolean;
}

export const useGetCryptoListingLatest = (): ICryptoListingLatest => {
  const { data, isLoading, isError } = useQuery<{ data: ICrypto[] }, Error>({
    queryKey: ['getCryptoListingLatest'],
    queryFn: getCryptoListingLatest,
  });

  return { data, isLoading, isError };
};
