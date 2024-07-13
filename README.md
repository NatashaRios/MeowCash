# MeowCash

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install dependencies

To install JavaScript dependencies for your React Native project, run the following command from the root directory:

```bash
# using npm
npm install
```

To install all required native dependencies for your iOS project:

```bash
# using npm
npx pod install ios
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 4: .env file

Create `.env` file in the root of the projects with this values:

```bash
CLIENT_ID="450278741366-7sluuc5b407ef92la4f4dd0ks06avb15.apps.googleusercontent.com"
API_URL="https://pro-api.coinmarketcap.com"
API_KEY="3471a9f0-fc4d-4826-8d5f-ef9081c6c767"
```

