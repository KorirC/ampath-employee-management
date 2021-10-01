import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  userName: Yup.string().trim().required('User Name is required'),
  email: Yup.string().trim().required('Email is required').email('Invalid email address'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  passwordConfirmation: Yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  }),
});
