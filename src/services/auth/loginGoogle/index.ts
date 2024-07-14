import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios' ? Config.CLIENT_ID_IOS : Config.ClIENT_ID_ANDROID,
});

export const loginGoogle = async (): Promise<string> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const authentication = await auth().signInWithCredential(googleCredential);
    const token = await authentication.user.getIdToken();
    return token;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Google sign-in failed: ${error.message}`);
    } else {
      throw new Error('Google sign-in failed: Unknown error occurred.');
    }
  }
};
