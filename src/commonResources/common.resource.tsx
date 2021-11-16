const token = sessionStorage.getItem('token');
import useSWR from 'swr';
import { useFetch } from '../globals/useFetch';

const url = process.env.REACT_APP_URL;
export const getCounties = () => {
  const { data, isValidating, error } = useSWR(`${url}/county`, () =>
    useFetch(`${url}/county`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
};

export const getDepartments = () => {
  const { data, isValidating, error } = useSWR(`${url}/department`, () =>
    useFetch(`${url}/department`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
};

export const getProjects = () => {
  const { data, isValidating, error } = useSWR(`${url}/project`, () =>
    useFetch(`${url}/project`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
};

export const getPrograms = () => {
  const { data, isValidating, error } = useSWR(`${url}/program`, () =>
    useFetch(`${url}/program`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
};

export const getSites = () => {
  const { data, isValidating, error } = useSWR(`${url}/site`, () =>
    useFetch(`${url}/site`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
};

export const getBudgets = () => {
  const { data, isValidating, error } = useSWR(`${url}/budget`, () =>
    useFetch(`${url}/budget`, {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => response.data),
  );
  return { data, isValidating, error };
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
