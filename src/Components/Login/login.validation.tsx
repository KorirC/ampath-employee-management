import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  userName: Yup.string().trim().required('User Name is required'),
  password: Yup.string().trim().required('Password is required'),
});
