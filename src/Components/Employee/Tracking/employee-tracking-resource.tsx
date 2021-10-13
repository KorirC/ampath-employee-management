import { EmployeeTrackingInputProps } from './employee-tracking-types';
const baseUrl = process.env.REACT_APP_URL;
const token = localStorage.getItem('token');
export const saveEmployeeTrackingInformation = async (values: EmployeeTrackingInputProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json', Authorization: `Bearer  ${token}` },
    body: JSON.stringify(values),
  };

  return await fetch(baseUrl + '/movement', requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
