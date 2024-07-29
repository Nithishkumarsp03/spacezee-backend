import { UserService } from "./user.service.js";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../errors/AppError.js";

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
  const { email, status } = req.body;

  console.log(status);

  const result = await UserService.changeStatus(email, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const email = req.params.email;

  const result = await UserService.deleteUser(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const email = req.params.email;

  const result = await UserService.getMe(email);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User info retrieve successful",
    data: result,
  });
});

export const UserController = {
  createUser,
  getMe,
  changeStatus,
  deleteUser,
  getUser,
};
