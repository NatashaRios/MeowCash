export const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockResolvedValue(true),
  signIn: jest.fn().mockResolvedValue({
    idToken: 'mock-id-token',
    accessToken: 'mock-access-token',
  }),
};
