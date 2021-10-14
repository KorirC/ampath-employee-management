import * as Yup from 'yup';

export const validationSchema = Yup.object({
  projectId: Yup.number().typeError('Enter a valid input'),
  departmentId: Yup.number().typeError('Enter a valid input'),
  siteId: Yup.number().typeError('Enter a valid input'),
  countyId: Yup.number().typeError('Enter a valid input'),
  budgetId: Yup.number().typeError('Enter a valid input'),
  programId: Yup.number().typeError('Enter a valid input'),
  endOfContract: Yup.date().required('End of contract is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  dateOfLeaving: Yup.date().required('Date of leaving is required'),
  jobSpecification: Yup.string().trim().required('Job specification is required'),
});
