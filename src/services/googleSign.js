import {Alert} from 'react-native';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signInWithGoogle = async () => {
  try {
    console.log('1. Checking Play Services...');

    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    await GoogleSignin.signOut();


    console.log('2. Play Services OK');

    const response = await GoogleSignin.signIn();

    console.log('3. Google Sign-In response:', response);

    if (response.type === 'cancelled') {
      console.log('4. User cancelled Google Sign-In');
      return;
    }

    const idToken = response.data?.idToken;

    console.log(
      '5. ID Token:',
      idToken ? 'Received' : 'Missing',
    );

    if (!idToken) {
      throw new Error('Google ID token was not received.');
    }

    // Create Firebase Google credential
    const googleCredential =
      GoogleAuthProvider.credential(idToken);

    console.log('6. Firebase credential created');

    // Get Firebase Auth instance
    const firebaseAuth = getAuth();

    // Sign in to Firebase
    const userCredential = await signInWithCredential(
      firebaseAuth,
      googleCredential,
    );

    console.log('7. Firebase sign-in successful');

    console.log('Firebase user:', userCredential.user);

    return userCredential;

  } catch (error) {
    console.log('Google Sign-In Error:', error);
    console.log('Error code:', error?.code);
    console.log('Error message:', error?.message);

    Alert.alert(
      'Google Sign-In Error',
      error?.message || 'Something went wrong',
    );
  }
};