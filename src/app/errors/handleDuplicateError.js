const handleDuplicateError = (error) => {
  const statusCode = 400;

  const regex = /(\w+):\s*"([^"]+)"/;
  const match = error.message.match(regex);
  const key = match[1];
  const extractedString = match[2];
  const errorSource = [
    {
      path: key,
      message: `${extractedString} is already exist`,
    },
  ];

  return { statusCode, message: "Duplicate entry", errorSource };
};

export default handleDuplicateError;
