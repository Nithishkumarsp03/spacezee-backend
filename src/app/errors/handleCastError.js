const handleCastError = (error) => {
  const statusCode = 400;
  const errorSource = [
    {
      message: error?.message,
      path: error?.path,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSource,
  };
};

export default handleCastError;
