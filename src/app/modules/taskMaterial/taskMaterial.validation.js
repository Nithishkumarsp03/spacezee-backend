import { z } from "zod";

const contentDetailsValidationSchema = z.object({
  questions: z.union([z.object({}).passthrough(), z.array(z.any())]).optional(),
  answers: z.object({}).optional(),
  isDeleted: z.boolean().optional().default(false),
});

const courseContentsValidationSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    endPoint: z.string({
      required_error: "End point is required",
      invalid_type_error: "End point must be a string",
    }),
    contentDetails: z.array(contentDetailsValidationSchema).optional(),
    isDeleted: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data && Object.keys(data).length > 0) {
      if (!data.title) {
        ctx.addIssue({
          path: ["title"],
          message: "Title is required",
        });
      }
    }
  });

const taskMaterialValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    courseImage: z.string({
      required_error: "Course Image is required",
      invalid_type_error: "Course Image must be a string",
    }),
    isDeleted: z.boolean().optional().default(false),
    courseContents: z.array(courseContentsValidationSchema).optional(),
  }),
});

export const taskMaterialValidation = { taskMaterialValidationSchema };
