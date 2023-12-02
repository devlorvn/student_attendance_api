export const validationRegName = (name) => {
  const reg = /^[a-zA-Z]+ [a-zA-Z]+$/;
  return reg.test(name);
};
