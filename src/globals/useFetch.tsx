export const useFetch = async (url: string, init?: RequestInit) => {
  return await window
    .fetch(url, init)
    .then((response) => {
      return { data: response.json(), ...response };
    })
    .catch((error) => error);
};
