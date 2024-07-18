module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-react',],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};

