const errorDetails = (errorObj, id) => {
  return {
    errorState: !!errorObj[id] && errorObj[id].errorState,
  };
};

export default errorDetails;
