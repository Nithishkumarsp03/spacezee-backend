import { UserService } from "./user.service.js";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/catchAsync.js";

const createUser = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await UserService.createUserIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successful",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await UserService.getMe(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getMe,
  changeStatus,
};
