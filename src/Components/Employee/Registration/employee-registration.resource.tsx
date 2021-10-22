import { EmployeeRegistrationFormProps } from './employee-registration-types';
const token = localStorage.getItem('token');
const baseUrl = process.env.REACT_APP_URL;

export const saveEmployeeInformation = async (values: EmployeeRegistrationFormProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer  ${token}` },
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

export const updateEmployeeInformation = async (values: EmployeeRegistrationFormProps) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer  ${token}` },
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
