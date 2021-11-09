const BaseUrl = process.env.REACT_APP_URL;
const token = sessionStorage.getItem('token');
export const getEmployeeProfile = async (pf) => {
  return await fetch(BaseUrl + `/search?pfnumber=${pf}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  })
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
  return await fetch(BaseUrl + `/timesheet?pfnumber=${pf}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  })
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
  return await fetch(BaseUrl + `/image?filename=${filename}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  })
    .then((response) => {
      return response;
    })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      return error;
    });
};

export const deleteTimesheet = async (timesheetId) => {
  return await fetch(BaseUrl + `/delete?timesheetId=${timesheetId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  })
    .then((response) => {
      return response;
    })
    .then((res: any) => {
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
