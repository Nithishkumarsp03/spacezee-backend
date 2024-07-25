const handleZodError = (error) => {
  const statusCode = 400;

  const errorSource = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};

export default handleZodError;
