
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

export const createLogin = async (email, password) => {
  if (!email?.trim() || !password?.trim()) {
    throw new Error('Please enter both email and password.');
  }

  try {
    const authInstance = getAuth();
    const db = getFirestore();

    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email.trim().toLowerCase(),
      password,
    );

    const user = userCredential.user;
    const userSnapshot = await getDoc(doc(db, 'users', user.uid));

    if (!userSnapshot.exists()) {
      throw new Error('User profile was not found.');
    }

    return userSnapshot.data();
  } catch (error) {
    console.log('Login error in userServices:', error);

    let errorMessage = 'Unable to login.';
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled.';
    } else if (error.message) {
      errorMessage = error.message;
    }
  }
};