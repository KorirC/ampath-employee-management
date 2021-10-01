import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  project: Yup.number().typeError('Enter numbers only').required('Project is required'),
  department: Yup.number().typeError('Enter numbers only').required('Department is required'),
  site: Yup.number().typeError('Enter numbers only').required('Site is required'),
  county: Yup.number().typeError('Enter numbers only').required('County is required'),
  countyBudget: Yup.number().typeError('Enter numbers only').required('County budget is required'),
  programArea: Yup.number().typeError('Enter numbers only').required('Program area is required'),
  endOfContract: Yup.date().required('End of contract is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  dateOfLeaving: Yup.date().required('Date of leaving is required'),
  jobSpecification: Yup.string().trim().required('Job specification is required'),
});
