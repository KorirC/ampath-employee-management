import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Firstname is required'),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim().required('Lastname is required'),
  idNumber: Yup.number().typeError('Enter numbers only').required('Id number is required'),
  dob: Yup.date().required('Birthdate is required').max(Date(), 'Birthdate should not be in the future'),
  age: Yup.number().typeError('Enter numbers only').optional(),
  telephone: Yup.string()
    .matches(/^(\+254|0)[17]\d{8}$/, 'Valid format: (+254/0) followed by (1/7) and finally the last 8 digits')
    .required('Phone number is required'),
  email: Yup.string().trim().email('Invalid email address').optional(),
  gender: Yup.string().required('Gender is required'),
  kraPin: Yup.string().trim().required('KRA pin is required'),
  nssf: Yup.number().typeError('Enter numbers only').required('NSSF number is required'),
  nhif: Yup.number().typeError('Enter numbers only').required('NHIF number is required'),
  pfNumber: Yup.number().typeError('Enter numbers only').required('PF number is required'),
  salutation: Yup.string().trim().required('Salutation is required'),
});
