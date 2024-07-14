import Config from 'react-native-config';

export const getCryptoQuotesLatestById = async (id: number) => {
  const url = `${Config.API_URL}/v2/cryptocurrency/quotes/latest?id=${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': Config.API_KEY || '',
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
};
