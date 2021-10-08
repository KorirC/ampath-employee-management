import { formInputProps } from './login.types';
const url = process.env.REACT_APP_URL;

export const loginUser = async (values: formInputProps) => {
  return await fetch(url + `/register?user=${values.userName}&password=${values.password}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((res: any) => {
      console.log(res);
      return res;
    })
    .catch((error: any) => {
      return error;
    });
};
