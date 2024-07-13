import Config from 'react-native-config';

export const getCryptoListingLatest = async () => {
  const url = `${Config.API_URL}/v1/cryptocurrency/listings/latest`;

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
