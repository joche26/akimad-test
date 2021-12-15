export const getData = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  return JSON.parse(data);
};

export const setData = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};
