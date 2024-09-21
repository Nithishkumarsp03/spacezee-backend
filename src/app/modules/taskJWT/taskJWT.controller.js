import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TaskJwtService } from "./taskJWT.service.js";
import { createToken } from "../auth/auth.utils.js";

const createTaskJwt = catchAsync(async (req, res) => {
  const data = req.body;
  const { email } = req.user;

  const result = await TaskJwtService.createTaskJwtIntoDB(data, email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task Jwt created successfully",
    data: result,
  });
});

const sendTaskJwt = catchAsync(async (req, res) => {
  const { courseId, email, secret } = req.body;
  const payload = { courseId, email };
  const result = await createToken(payload, secret, "1d");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task Jwt send successfully",
    data: result,
  });
});

export const TaskJwtController = {
  createTaskJwt,
  sendTaskJwt,
};
