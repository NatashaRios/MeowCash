import { getCryptoListingLatest } from '@/services';
import Config from 'react-native-config';

(fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test data' }),
  }),
);

describe('getCryptoListingLatest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the latest crypto listings', async () => {
    const data = await getCryptoListingLatest();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${Config.API_URL}/v1/cryptocurrency/listings/latest`,
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

    await expect(getCryptoListingLatest()).rejects.toThrow('Fetch failed');
  });
});
