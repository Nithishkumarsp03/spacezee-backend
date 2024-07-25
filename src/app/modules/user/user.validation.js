import { z } from "zod";

export const UserStatus = ["in-progress", "blocked"];

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
    }),
    email: z
      .string({
        invalid_type_error: "Email must be string",
      })
      .email({ message: "Invalid email" }),
    role: z.enum(["admin", "user"]),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus]),
  }),
});

const userPasswordChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      invalid_type_error: "Password must be string",
    }),
    password: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .max(20, { message: "Password can not be more than 20 characters" }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  userPasswordChangeValidationSchema,
};
