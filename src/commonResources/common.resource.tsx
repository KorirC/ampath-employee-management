import { useFetch } from '../globals/useFetch';

const url = process.env.REACT_APP_URL;
export const getCounties = async () => {
  return useFetch(`${url}/county`).then((response) => {
    return response.data;
  });
};
export const getDepartments = async () => {
  return useFetch(`${url}/department`).then((response) => {
    return response.data;
  });
};
export const getProjects = async () => {
  return useFetch(`${url}/project`).then((response) => {
    return response.data;
  });
};
export const getPrograms = async () => {
  return useFetch(`${url}/program`).then((response) => {
    return response.data;
  });
};
export const getSites = async () => {
  return useFetch(`${url}/site`).then((response) => {
    return response.data;
  });
};
export const getBudgets = async () => {
  return useFetch(`${url}/budget`).then((response) => {
    return response.data;
  });
};
export const trackEmployees = async () => {
  return useFetch(`${url}/movement`).then((response) => {
    return response.data;
  });
};
export const getReport = async (param: any) => {
  return useFetch(
    `${url}/report?department=${param.department}&project=${param.project}&site=${param.site}&budget=${param.budget}&county=${param.county}&status=${param.contractStatus}&program=${param.programArea}`,
  ).then((response) => {
    return response.data;
  });
};
