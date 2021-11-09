import * as Yup from 'yup';

export const validationSchema = Yup.object({
  project: Yup.number().typeError('Enter a valid input').required('Project is required'),
  department: Yup.number().typeError('Enter a valid input').required('Department is required'),
  site: Yup.number().typeError('Enter a valid input').required('Site is required'),
  county: Yup.number().typeError('Enter a valid input').required('County is required'),
  countyBudget: Yup.number().typeError('Enter a valid input').required('Budget is required'),
  programArea: Yup.number().typeError('Enter a valid input').required('Program is required'),
  endOfContract: Yup.date().required('End of contract is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  dateOfLeaving: Yup.date().required('Date of leaving is required'),
  jobSpecification: Yup.string().trim().required('Job specification is required'),
});
