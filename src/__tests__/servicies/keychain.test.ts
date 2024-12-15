import * as Keychain from 'react-native-keychain';
import { setToken, getToken, deleteToken } from '@/services';

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

describe('keychain', () => {
  const token = 'token-test';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setToken stores the token', async () => {
    await setToken(token);
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'authToken',
      token,
    );
  });

  test('getToken retrieves the token', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
      username: 'authToken',
      password: token,
    });

    const retrievedToken = await getToken();
    expect(retrievedToken).toBe(token);
  });

  test('getToken returns null if no token is stored', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue(false);

    const retrievedToken = await getToken();
    expect(retrievedToken).toBeNull();
  });

  test('deleteToken removes the token', async () => {
    await deleteToken();
    expect(Keychain.resetGenericPassword).toHaveBeenCalled();
  });

  test('setToken throws an error', async () => {
    (Keychain.setGenericPassword as jest.Mock).mockRejectedValue(
      new Error('Failed to set token'),
    );

    await expect(setToken(token)).rejects.toThrow('Failed to set token');
  });

  test('getToken throws an error', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValue(
      new Error('Failed to get token'),
    );

    await expect(getToken()).rejects.toThrow('Failed to get token');
  });

  test('deleteToken throws an error', async () => {
    (Keychain.resetGenericPassword as jest.Mock).mockRejectedValue(
      new Error('Failed to delete token'),
    );

    await expect(deleteToken()).rejects.toThrow('Failed to delete token');
  });
});
