import { UserService } from "./user.service.js";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse.js";
import catchAsync from "../../utils/catchAsync.js";

const createUser = catchAsync(async (req, res) => {
  const data = req.body;

  console.log(req.body);

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

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User info retrieve successful",
    data: result,
  });
});

const updateCompletedTask = catchAsync(async (req, res) => {
  const { email } = req.user;
  const payload = req.body;
  const result = await UserService.updateCompletedTask(
    email,
    payload.completedTask
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Completed task update successful",
    data: result,
  });
});

export const UserController = {
  createUser,
  getMe,
  changeStatus,
  deleteUser,
  getUser,
  updateCompletedTask,
};
