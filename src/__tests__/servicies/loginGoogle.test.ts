import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { loginGoogle } from '@/services';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));

const mockAuth = {
  signInWithCredential: jest.fn(),
};
auth.GoogleAuthProvider = {
  PROVIDER_ID: 'google.com',
  credential: jest.fn(),
};

jest.mock('@react-native-firebase/auth', () => {
  return jest.fn(() => mockAuth);
});

describe('loginGoogle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login and return a token', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValueOnce(true);
    (GoogleSignin.signIn as jest.Mock).mockResolvedValueOnce({
      idToken: 'id-token-test',
    });
    mockAuth.signInWithCredential.mockResolvedValueOnce({
      user: {
        getIdToken: jest.fn().mockResolvedValue('token-test'),
      },
    });
    (auth.GoogleAuthProvider.credential as jest.Mock).mockReturnValue(
      'credential-test',
    );

    const token = await loginGoogle();

    expect(token).toBe('token-test');
    expect(GoogleSignin.hasPlayServices).toHaveBeenCalledWith({
      showPlayServicesUpdateDialog: true,
    });
    expect(GoogleSignin.signIn).toHaveBeenCalled();
    expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith(
      'id-token-test',
    );
    expect(mockAuth.signInWithCredential).toHaveBeenCalledWith(
      'credential-test',
    );
  });

  it('should throw an error if Google sign-in fails', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockRejectedValueOnce(
      new Error('Play services error'),
    );

    await expect(loginGoogle()).rejects.toThrow(
      'Google sign-in failed: Play services error',
    );
  });

  it('should throw a unknown error if Google sign-in fail for no standard error', async () => {
    (GoogleSignin.hasPlayServices as jest.Mock).mockRejectedValueOnce(
      'Unknown error',
    );

    await expect(loginGoogle()).rejects.toThrow(
      'Google sign-in failed: Unknown error occurred.',
    );
  });
});
