import { formInputProps } from './register.types';
const url = process.env.REACT_APP_URL;

export const addUser = async (values: formInputProps) => {
  return await fetch(url + `/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      return error;
    });
};
