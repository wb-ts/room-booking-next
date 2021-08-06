const reduxError = (err) => {
  const error = { ...err };
  const { message } = error.response.data;
  if (!message) throw error;
  return error;
};

export default reduxError;
