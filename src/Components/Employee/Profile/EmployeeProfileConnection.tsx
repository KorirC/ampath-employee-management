const BaseUrl = process.env.REACT_APP_URL;
export const getEmployeeProfile = async (pf) => {
  return await fetch(BaseUrl + `/search?pfnumber=${pf}`)
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

export const getTimesheet = async (pf) => {
  return await fetch(BaseUrl + `/timesheet?pfnumber=${pf}`)
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

export type Employee = {
  name: string;
  pfNumber: number;
  age: number;
  gender: string;
  email: string;
  telephone: string;
};
