import { z } from "zod";

const contentDetailsValidationSchema = z
  .object({
    title: z.string().optional(),
    fileName: z.string().optional(),
    contentTypeStr: z.string().optional(),
    sortOrder: z.number().optional(),
    fileURL: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (Object.keys(data).length > 0) {
      if (!data.title)
        ctx.addIssue({
          path: ["title"],
          message: "Title is required ",
        });
      if (!data.fileName)
        ctx.addIssue({
          path: ["fileName"],
          message: "File name is required ",
        });
      if (!data.contentTypeStr)
        ctx.addIssue({
          path: ["contentTypeStr"],
          message: "Content type is required ",
        });
      if (data.sortOrder === undefined)
        ctx.addIssue({
          path: ["sortOrder"],
          message: "Sort order is required",
        });
      if (!data.fileURL)
        ctx.addIssue({
          path: ["fileURL"],
          message: "File URL is required",
        });
    }
  });

const courseContentsValidationSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    contentDetails: z.array(contentDetailsValidationSchema).optional(),
    isDeleted: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (Object.keys(data).length > 0) {
      if (!data.title)
        ctx.addIssue({
          path: ["title"],
          message: "Title is required",
        });
    }
  });

const learningMaterialValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    courseImage: z.string({
      required_error: "Course Image is required",
      invalid_type_error: "Course Image must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    isDeleted: z.boolean().optional().default(false),
    courseContents: z.array(courseContentsValidationSchema).optional(),
  }),
});

export const learningMaterialValidation = { learningMaterialValidationSchema };
