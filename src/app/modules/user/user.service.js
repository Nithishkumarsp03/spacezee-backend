import uniqid from "uniqid";
import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import httpStatus from "http-status";
import { UserRole } from "./user.constant.js";

const createUserIntoDB = async (payload) => {
  const userData = payload;

  const id = uniqid();
  userData.id = id;

  const newUser = await User.create(userData);
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

export const UserService = {
  createUserIntoDB,
  getMe,
  changeStatus,
  deleteUser,
};
