const url = process.env.REACT_APP_URL;
export const getAllEmployees = async () => {
  return await fetch(url + `/AllEmployees`)
    .then((response) => {
      return response.json();
    })
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => {
      return error;
    });
};
