import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import httpStatus from "http-status";
import { UserRole } from "./user.constant.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../../utils/sendEmail.js";
import { emailFormatter } from "../../utils/emailFormatter.js";

const createUserIntoDB = async (payload) => {
  const userData = payload;

  const id = uuidv4();
  userData.id = id;

  console.log(userData);

  const newUser = await User.create(userData);
  console.log(newUser);

  await sendEmail(
    newUser.email,
    emailFormatter.userIdEmailFormatter(newUser.id),
    "Registration successful"
  );
  return newUser;
};

const getMe = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const changeStatus = async (email, payload) => {
  const result = await User.findOneAndUpdate(
    { email },
    { status: payload },
    {
      new: true,
    }
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No User found to status change!");
  }
  return result;
};

const deleteUser = async (email, payload) => {
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user.role === UserRole.superAdmin) {
    throw new AppError(httpStatus.FORBIDDEN, "Super Admin can't be deleted! ");
  }

  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No User found to status change!");
  }
  return result;
};

const updateCompletedTask = async (email, taskId) => {
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  const result = await User.findOneAndUpdate(
    { email },
    { $addToSet: { completedTask: taskId } },
    { new: true }
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No User found to update completedTask!"
    );
  }

  return result;
};
export const UserService = {
  createUserIntoDB,
  getMe,
  changeStatus,
  deleteUser,
  updateCompletedTask,
};
