import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";
import AppError from "../../errors/AppError.js";
import config from "../../config.js";
import { createToken, verifyToken } from "./auth.utils.js";
import { generate } from "generate-password";
import { sendEmail } from "../../utils/sendEmail.js";
import { emailFormatter } from "../../utils/emailFormatter.js";

const loginUser = async (payload) => {
  // checking if the user is exist
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Please generate password with registration id!"
    );
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  if (!user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password not generated. Generate new password"
    );
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Wrong password");

  //create token and sent to the  client

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (userData, payload) => {
  // checking if the user exists
  const user = await User.isUserExistByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  if (!user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password not generated. Generate new password"
    );
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong old password");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  // update the user's password and passwordChangedAt field
  const passwordChangedAt = new Date(Date.now() - 1000);
  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt,
    }
  );

  // Fetch the user again to ensure passwordChangedAt is up-to-date
  const updatedUser = await User.isUserExistByEmail(userData.email);

  const jwtPayload = {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret);

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  if (!user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password not generated. Generate new password"
    );
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email) => {
  // checking if the user is exist

  const user = await User.isUserExistByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited!");
  }

  if (!user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password not generated. Generate new password"
    );
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(jwtPayload, config.jwt_access_secret, "10m");

  const resetUILink = `${config.reset_pass_ui_link}?token=${resetToken} `;

  sendEmail(
    user.email,
    emailFormatter.passwordResetEmailFormat(resetUILink),
    "Reset your password within ten mins!"
  );
};

const resetPassword = async (payload, token) => {
  // checking if the user is exist
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user prohibited!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is prohibited");
  }

  if (!user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password not generated. Generate new password"
    );
  }

  const decoded = jwt.verify(token, config.jwt_access_secret);

  console.log(decoded);

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
};

// create new password
const createPassword = async (userData) => {
  // checking if the user is exist
  const user = await User.isUserExistByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  if (user?.password) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password is already generated. Reset if forgot password"
    );
  }

  // checking if the user is blocked

  if (userData.id !== user.id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Give valid email or registration id"
    );
  }

  const newPassword = generate({
    length: 8,
    numbers: true,
    symbols: true,
  });

  sendEmail(
    user.email,
    emailFormatter.passwordEmailFormat(newPassword),
    "New password generated"
  );

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      id: userData.id,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  createPassword,
};
