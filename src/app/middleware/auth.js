import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { User } from "../modules/user/user.model.js";
import config from "../config.js";

const auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // check is the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt_access_secret);
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
    }

    const { email, role, iat } = decoded;
    const user = await User.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    }

    // check if role authorized

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
    }

    // check if password changed after jwt Issue

    if (
      user.passwordChangedAt &&
      User.isPasswordChangedAfterJwt(user.passwordChangedAt, iat)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
    }

    req.user = decoded;
    next();
  });
};

export default auth;
