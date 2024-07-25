import uniqid from "uniqid";
import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import httpStatus from "http-status";

const createUserIntoDB = async (payload) => {
  const userData = payload;
  // generate user id
  const id = uniqid();
  userData.id = id;
  // sending image to cloudinary
  // sendImageToCloudinary();

  const newUser = await User.create(userData);
  return newUser;
};

const getMe = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const changeStatus = async (email, payload) => {
  const result = await User.findByIdAndUpdate(email, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getMe,
  changeStatus,
};
