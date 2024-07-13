export interface CryptoListingLatest {
  id: number;
  name: string;
  quote: {
    USD: {
      price: number;
    };
  };
  slug: string;
  symbol: string;
}
