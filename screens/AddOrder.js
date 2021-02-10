import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import CustomButton from '../components/UI/CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import ImagePicker from '../components/UI/ImagePicker';
import { TextInput } from 'react-native-paper';
import { setLoading, addOrder } from '../store/actions/orderActions';
import DestinationPicker from '../components/UI/DestinationPicker';
import MyNumberFormat from '../components/UI/MyNumberFormat';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(8, ({ min }) => `Title must be at least ${min} characters`)
    .required('Title is required'),
  rePhone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  //destination: yup.object().required('Please choose a destination'),
});

const AddOrder = (props) => {
  const dispatch = useDispatch();
  const addOrderHandler = (values) => {
    dispatch(setLoading());
    dispatch(addOrder(values));
    props.navigation.goBack();
  };
  const selectedLocation = props.route.params
    ? props.route.params.pickedLocation
    : null;
  return (
    <ScrollView>
      <View style={styles.form}>
        <Formik
          initialValues={{
            title: '',
            receiver: '',
            receiverPhone: '',
            imageUri: '',
            amount: '',
            destination: null,
            description: '',
          }}
          onSubmit={addOrderHandler}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid,
          }) => (
            <KeyboardAvoidingView
              style={styles.form}
              behavior='padding'
              keyboardVerticalOffset={10}
            >
              <Text style={styles.label}>Title</Text>
              <TextInput
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                style={styles.input}
                autoCompleteType='off'
                keyboardType='default'
                placeholder='ex: Package Ref.'
                textContentType='none'
                autoCapitalize='words'
              />
              {errors.title && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.title}
                </Text>
              )}

              <Text style={styles.label}>Receiver</Text>
              <TextInput
                onChangeText={handleChange('receiver')}
                onBlur={handleBlur('receiver')}
                value={values.receiver}
                style={styles.input}
                autoCompleteType='off'
                keyboardType='default'
                placeholder='Receiver Name'
                textContentType='none'
                autoCapitalize='words'
              />
              <Text style={styles.label}>Collection Amount L.L</Text>
              <MyNumberFormat
                setFieldValue={setFieldValue}
                style={styles.input}
              />

              <Text style={styles.label}>Receiver Phone</Text>
              <TextInput
                onChangeText={handleChange('receiverPhone')}
                onBlur={handleBlur('receiverPhone')}
                value={values.receiverPhone}
                style={styles.input}
                autoCompleteType='tel'
                keyboardType='phone-pad'
                placeholder='Receiver Phone'
                textContentType='telephoneNumber'
                autoCapitalize='sentences'
                dataDetectorTypes='phoneNumber'
              />
              {errors.receiverPhone && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.receiverPhone}
                </Text>
              )}
              <Text style={styles.label}>Note</Text>
              <TextInput
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                style={styles.input}
                autoCompleteType='off'
                keyboardType='default'
                placeholder='Comments for driver/Directions'
                multiline
                numberOfLines={6}
                autoCapitalize='sentences'
              />
              <View style={{ paddingTop: 20 }}>
                <DestinationPicker
                  mapPickedLocation={selectedLocation}
                  navigation={props.navigation}
                  onDestinationPicked={setFieldValue}
                />
              </View>
              <ImagePicker setFieldValue={setFieldValue} />
              {values.imageUri && values.imageUri.length > 0 ? (
                <Image
                  source={{ uri: values.imageUri }}
                  style={styles.imagePreview}
                />
              ) : null}
              <CustomButton
                onPress={handleSubmit}
                label='Submit'
                color={Colors.primary}
                style={styles.button}
              />
              <CustomButton
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
                }}
                label='Cancel'
                color={Colors.accent}
                style={styles.button}
              />
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default AddOrder;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    // marginBottom: 5,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  button: {
    marginTop: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
