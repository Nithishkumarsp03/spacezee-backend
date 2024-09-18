import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";
import { UserStatus } from "./user.validation.js";

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    completedTask: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistByEmail = async function (email) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.isPasswordChangedAfterJwt = function (
  passwordChangedAt,
  JwtIssuedAt
) {
  const passChangeAt = new Date(passwordChangedAt).getTime() / 1000;
  return passChangeAt > JwtIssuedAt;
};

export const User = model("User", userSchema);
