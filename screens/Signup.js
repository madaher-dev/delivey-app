import React, { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  View,
  ActivityIndicator,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';

import { Formik } from 'formik';
import Card from '../components/UI/Card';
import CustomButton from '../components/UI/CustomButton';
import * as yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { signup, setLoading, clearErrors } from '../store/actions/authActions';

const loginValidationSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Signup = (props) => {
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [
        { text: 'Okay', onPress: () => dispatch(clearErrors()) },
      ]);
    }
  }, [error]);
  const signupHandler = (cred) => {
    dispatch(setLoading());
    dispatch(signup(cred.name, cred.email, cred.password));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      // keyboardVerticalOffset={10}
    >
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[Colors.primary, 'white']}
          style={styles.gradient}
        >
          <Card style={{ padding: 30, width: '80%' }}>
            <ScrollView>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  password_confirm: '',
                }}
                onSubmit={signupHandler}
                validationSchema={loginValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <View>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      style={styles.input}
                      autoCompleteType='name'
                      autoCorrect={false}
                      keyboardType='default'
                      placeholder='Your Name'
                      textContentType='name'
                      autoCapitalize='words'
                    />

                    {errors.name && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.name}
                      </Text>
                    )}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={styles.input}
                      autoCompleteType='username'
                      autoCorrect={false}
                      keyboardType='email-address'
                      placeholder='Your Email'
                      textContentType='emailAddress'
                      autoCapitalize='none'
                    />
                    {errors.email && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.email}
                      </Text>
                    )}

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={styles.input}
                      autoCompleteType='password'
                      placeholder='Your Passowrd'
                      textContentType='password'
                      passwordRules='minlength: 8'
                      secureTextEntry
                    />
                    {errors.password && !errors.email ? (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.password}
                      </Text>
                    ) : null}
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                      onChangeText={handleChange('password_confirm')}
                      onBlur={handleBlur('password_confirm')}
                      value={values.password_confirm}
                      style={styles.input}
                      autoCompleteType='off'
                      placeholder='Confirm Passowrd'
                      textContentType='oneTimeCode'
                      secureTextEntry
                    />
                    {errors.password_confirm && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.password_confirm}
                      </Text>
                    )}

                    <CustomButton
                      onPress={handleSubmit}
                      label='Signup'
                      color={Colors.primary}
                      style={styles.button}
                    />
                    <CustomButton
                      onPress={() => {
                        props.navigation.reset({
                          index: 0,
                          routes: [{ name: 'Login' }],
                        });
                      }}
                      label='Login'
                      color={Colors.accent}
                      style={styles.button}
                    />
                  </View>
                )}
              </Formik>
              {isLoading && (
                <View style={styles.loading}>
                  <ActivityIndicator size='large' color={Colors.primary} />
                </View>
              )}
            </ScrollView>
          </Card>
        </LinearGradient>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  label: {
    fontFamily: 'open-sans-bold',
    //marginVertical: 8,
  },
  button: {
    marginTop: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
