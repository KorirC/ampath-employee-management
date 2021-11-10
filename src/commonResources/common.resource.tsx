const token = sessionStorage.getItem('token');
import { useFetch } from '../globals/useFetch';

const url = process.env.REACT_APP_URL;
export const getCounties = async () => {
  return await useFetch(`${url}/county`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getDepartments = async () => {
  return await useFetch(`${url}/department`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getProjects = async () => {
  return await useFetch(`${url}/project`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getPrograms = async () => {
  return await useFetch(`${url}/program`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getSites = async () => {
  return await useFetch(`${url}/site`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getBudgets = async () => {
  return await useFetch(`${url}/budget`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const trackEmployees = async () => {
  return await useFetch(`${url}/movement`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

export const getReport = async (param: any) => {
  return await useFetch(
    `${url}/report?department=${param.department}&project=${param.project}&site=${param.site}&budget=${param.budget}&county=${param.county}&status=${param.contractStatus}&program=${param.programArea}`,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    },
  ).then((response) => {
    return response.data;
  });
};

export const getEmployeeProfile = async (pf) => {
  return await fetch(url + `/search?pfnumber=${pf}`, {
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
