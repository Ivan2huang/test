export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts
    .pop()
    .split(';')
    .shift();
};

export const hasCookie = name => {
  const value = getCookie(name);
  return value && value.trim().length > 0;
};
