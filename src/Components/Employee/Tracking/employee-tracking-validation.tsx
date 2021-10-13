import * as Yup from 'yup';

export const validationSchema = Yup.object({
  project: Yup.number().typeError('Enter a valid input'),
  department: Yup.number().typeError('Enter a valid input'),
  site: Yup.number().typeError('Enter a valid input'),
  county: Yup.number().typeError('Enter a valid input'),
  countyBudget: Yup.number().typeError('Enter a valid input'),
  programArea: Yup.number().typeError('Enter a valid input'),
  endOfContract: Yup.date().required('End of contract is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  dateOfLeaving: Yup.date().required('Date of leaving is required'),
  jobSpecification: Yup.string().trim().required('Job specification is required'),
});
