const path = require('path');

module.exports = {
  preset: 'react-native',
  clearMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react-native-config$': path.resolve(__dirname, 'src/__tests__/__mocks__/config/index.ts'),
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@react-native-google-signin/google-signin$': '<rootDir>/src/__tests__/__mocks__/googleSignin',
    '^@react-native-firebase/auth$': '<rootDir>/src/__tests__/__mocks__/firebase/auth',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__mocks__/',
  ],
};

