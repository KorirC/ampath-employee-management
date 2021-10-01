import { EmployeeRegistrationFormProps } from './employee-registration-types';

const baseUrl = process.env.REACT_APP_URL;

export const saveEmployeeInformation = async (values: EmployeeRegistrationFormProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  };
  return await fetch(baseUrl + '/employee', requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
