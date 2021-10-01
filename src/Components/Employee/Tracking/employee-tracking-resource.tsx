import { EmployeeTrackingInputProps } from './employee-tracking-types';
const baseUrl = process.env.REACT_APP_URL;

export const saveEmployeeTrackingInformation = async (values: EmployeeTrackingInputProps) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify(values),
  };

  return await fetch(baseUrl + '/movement', requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getProjects = async () => {
  return await fetch(baseUrl + `/project`)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getDepartments = async () => {
  return await fetch(baseUrl + `/department`)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getSites = async () => {
  return await fetch(baseUrl + `/site`)
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

export const getCounties = async () => {
  return await fetch(baseUrl + `/county`)
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
  return await fetch(baseUrl + `/budget`)
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
  return await fetch(baseUrl + `/program`)
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
