import * as Keychain from 'react-native-keychain';

export const setToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('authToken', token);
  } catch (error) {
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    throw error;
  }
};
