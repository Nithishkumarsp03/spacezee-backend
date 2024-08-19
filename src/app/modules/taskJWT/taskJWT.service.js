import httpStatus from "http-status";
import AppError from "../../errors/AppError.js";
import { TaskJwt } from "./taskJWT.model.js";
import { jwtDecode } from "jwt-decode";

const createTaskJwtIntoDB = async (payload, email) => {
  const userData = payload;

  const decoded = jwtDecode(payload?.token);
  if (email !== decoded.email) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid course session");
  }

  const result = await TaskJwt.create(userData);
  if (!result) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid course session");
  }
  return result;
};

export const TaskJwtService = {
  createTaskJwtIntoDB,
};
