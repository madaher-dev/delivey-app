import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  TextInput,
  Pressable,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import Card from '../components/UI/Card';
import CustomButton from '../components/UI/CustomButton';
import * as yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, clearErrors } from '../store/actions/authActions';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = (props) => {
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
  const loginHandler = async (cred) => {
    dispatch(setLoading());
    dispatch(login(cred.email, cred.password));
  };

  //  const [dataLoaded, setDataLoaded] = useState(false);

  return (
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
              initialValues={{ email: '', password: '' }}
              onSubmit={loginHandler}
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
                <KeyboardAvoidingView
                  style={styles.form}
                  behavior='padding'
                  keyboardVerticalOffset={50}
                >
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={styles.input}
                    autoCompleteType='email'
                    placeholder='Your E-mail'
                    textContentType='emailAddress'
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
                    secureTextEntry
                  />
                  {errors.password && !errors.email ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.password}
                    </Text>
                  ) : null}
                  <CustomButton
                    onPress={handleSubmit}
                    label='Login'
                    color={Colors.primary}
                    style={styles.button}
                  />
                  <CustomButton
                    onPress={() => {
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Signup' }],
                      });
                    }}
                    label='Signup'
                    color={Colors.accent}
                    style={styles.button}
                  />
                </KeyboardAvoidingView>
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
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
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
