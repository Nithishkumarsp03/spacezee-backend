const handleValidationError = (error) => {
  const statusCode = 400;

  const errorSource = Object.values(error.errors).map((value) => {
    return {
      path: value?.path,
      message: value?.message,
    };
  });
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};

export default handleValidationError;
