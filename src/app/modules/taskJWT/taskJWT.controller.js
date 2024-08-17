import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TaskJwtService } from "./taskJWT.service.js";

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

export const TaskJwtController = {
  createTaskJwt,
};
