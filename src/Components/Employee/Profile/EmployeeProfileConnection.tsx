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

export const getSingleTimesheet = async (filename) => {
  return await fetch(BaseUrl + `/image?filename=${filename}`)
    .then((response) => {
      return response;
    })
    .then((res: any) => {
      console.log(res);

      return res;
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
