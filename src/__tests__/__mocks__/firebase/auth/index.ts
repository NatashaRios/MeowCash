export default {
  signInWithCredential: jest.fn().mockResolvedValue({
    user: {
      uid: 'mock-uid',
      email: 'mock-email@example.com',
    },
  }),
};
