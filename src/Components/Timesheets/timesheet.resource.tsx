const url = process.env.REACT_APP_URL;
export const getAllEmployees = async () => {
  return await fetch(url + `/employee`)
    .then((response) => {
      return response.json();
    })
    .then((res: any) => {
      // console.log(res.data);
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
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};
