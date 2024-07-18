module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, traillingComma: 'all', bracketSpacing: true },
    ],
  },
  overrides: [
    {
      files: ['__tests__/**/*.{js,jsx,ts,tsx}'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
};
