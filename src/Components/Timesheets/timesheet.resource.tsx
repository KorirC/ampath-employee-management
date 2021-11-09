const url = process.env.REACT_APP_URL;
const token = sessionStorage.getItem('token');
export const getAllEmployees = async () => {
  return await fetch(url + `/employee`, {
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
export const uploadTimesheet = async (formData: any) => {
  return await fetch(url + `/timesheet`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
