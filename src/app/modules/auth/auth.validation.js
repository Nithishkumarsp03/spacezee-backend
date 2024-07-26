import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "invalid email" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "invalid email" }),
  }),
});

const createPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "Register id is required!",
    }),
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "invalid email" }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "User id is required!",
      })
      .email({ message: "Enter valid email" }),
    newPassword: z.string({
      required_error: "User password is required!",
    }),
  }),
});
export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  createPasswordValidationSchema,
  resetPasswordValidationSchema,
};
