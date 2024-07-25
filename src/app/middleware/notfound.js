import httpStatus from "http-status";

const notFound = (req, res, next) => {
  const code = httpStatus.NOT_FOUND;
  return res.status(code).json({
    success: false,
    message: "Api link not found",
    error: "",
  });
};

export default notFound;
