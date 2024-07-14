export interface CryptoListingLatest {
  id: number;
  name: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      volume_24h: number;
    };
  };
  slug: string;
  symbol: string;
}
