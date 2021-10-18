const url = process.env.REACT_APP_URL;
const token = localStorage.getItem('token');
export const getAllEmployees = async () => {
  const options = {
    headers: {
      Authorization: `Bearer  ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return await fetch(url + `/employee`, options)
    .then((response) => {
      return response.json();
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => {
      return error;
    });
};
export interface Employee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: string;
  dob: string;
  age: number;
  telephone: string;
  email: string;
  gender: string;
  kraPin: string;
  nssf: number;
  nhif: number;
  pfNumber: number;
  salutation: string;
}
