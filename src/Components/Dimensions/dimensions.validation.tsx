import * as Yup from 'yup';

// export const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Budget is required'),
//   mflcode: Yup.string().required('MFL-Code is required'),
//   county: Yup.string().required('County is required'),
//   countyid: Yup.number().required('County ID is required'),
//   counties: Yup.string().required('Select a county from the list'),
//   department: Yup.string().required('Department is required'),
//   departmentid: Yup.number().required('Department ID is required'),
//   site: Yup.string().required('Site is required'),
//   programs: Yup.string().required('Program is required'),
//   project: Yup.string().required('Project is required'),
//   user: Yup.string().required('User is required'),
// });

export const budgetSchema = Yup.object().shape({
  name: Yup.string().required('Budget is required'),
  mflCode: Yup.string().required('MFL-Code is required'),
  county: Yup.string().required('Select a county from the list'),
});

export const countySchema = Yup.object().shape({
  name: Yup.string().required('County is required'),
  countyId: Yup.string().required('County-ID is required'),
});

export const departmentSchema = Yup.object().shape({
  name: Yup.string().required('Department is required'),
});

export const siteSchema = Yup.object().shape({
  name: Yup.string().required('Site is required'),
  county: Yup.string().required('Select a county from the list'),
});

export const programSchema = Yup.object().shape({
  name: Yup.string().required('Program is required'),
  budget: Yup.string().required('Select a budget from the list'),
});

export const projectSchema = Yup.object().shape({
  name: Yup.string().required('Project is required'),
});

export const userSchema = Yup.object().shape({
  name: Yup.string().required('User Name is required'),
});
