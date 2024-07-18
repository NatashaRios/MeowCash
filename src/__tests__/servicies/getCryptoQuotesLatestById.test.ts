import { getCryptoQuotesLatestById } from '@/services/coinMarketCap/getCryptoQuotesLatestById';
import Config from 'react-native-config';

(fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test data' }),
  }),
);

describe('getCryptoQuotesLatestById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the latest crypto quotes by Id', async () => {
    const data = await getCryptoQuotesLatestById(1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${Config.API_URL}/v2/cryptocurrency/quotes/latest?id=1`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': Config.API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    expect(data).toEqual({ data: 'test data' });
  });

  it('should throw an error if the fetch fails', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch failed')),
    );

    await expect(getCryptoQuotesLatestById(1)).rejects.toThrow('Fetch failed');
  });
});
