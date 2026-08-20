export const register = async()=>{
        const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company.trim(),
        agreedToTerms: agredTerms,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setPassword('');
      setConfirmPassword('');
      setAgrredTerms(false);

      dispatch(
        showSnackbar({
          message: 'Account Created Successfully....',
          type: 'success',
        }),
      );

      navigation.navigate('Login');
}