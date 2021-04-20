export const required = value => !value;

export const email = value =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const password = value =>
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

export const otp = value => !/\d{6}/.test(value);

export const maxLength = (max, value) => value && value.length > max;
