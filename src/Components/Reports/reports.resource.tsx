const url = process.env.REACT_APP_URL;
export const getCounties = async () => {
  return await fetch(url + `/county`)
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
export const getDepartments = async () => {
  return await fetch(url + `/department`)
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
export const getProjects = async () => {
  return await fetch(url + `/project`)
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
export const getPrograms = async () => {
  return await fetch(url + `/program`)
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
export const getSites = async () => {
  return await fetch(url + `/site`)
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
export const getBudgets = async () => {
  return await fetch(url + `/budget`)
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
export const trackEmployees = async () => {
  return await fetch(url + `/movement`)
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
export const getReport = async (param: any) => {
  return await fetch(
    url +
      `/report?department=${param.department}&project=${param.project}&site=${param.site}&budget=${param.budget}&county=${param.county}&status=${param.contractStatus}&program=${param.programArea}`,
  )
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
