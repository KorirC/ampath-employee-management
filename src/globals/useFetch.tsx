export const useFetch = (url: string, init?: RequestInit) => {
  return window
    .fetch(url, init)
    .then((response) => {
      return { data: response.json(), ...response };
    })
    .catch((error) => error);
};
