import { EmployeeTrackingInputProps } from './employee-tracking-types';
const baseUrl = process.env.REACT_APP_URL;

export const saveEmployeeTrackingInformation = async (values: EmployeeTrackingInputProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
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
