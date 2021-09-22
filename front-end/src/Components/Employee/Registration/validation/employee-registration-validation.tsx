import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Firstname is required'),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim().required('Lastname is required'),
  idNumber: Yup.number().typeError('Enter numbers only').required('Id number is required'),
  dob: Yup.date().required('Birthdate is required').max(Date(), 'Birthdate should not be in the future'),
  age: Yup.number().typeError('Enter numbers only').optional(),
  telephone: Yup.number().typeError('Enter numbers only').required('Phone number is required'),
  email: Yup.string().trim().email('Invalid email address').optional(),
  gender: Yup.string().required('Gender is required'),
  kraPin: Yup.string().trim().required('KRA pin is required'),
  nssf: Yup.string().trim().required('NSSF number is required'),
  nhif: Yup.string().trim().required('NHIF number is required'),
  pfNumber: Yup.number().typeError('Enter numbers only').required('PF number is required'),
  salutation: Yup.string().trim().required('Salutation is required'),
});
