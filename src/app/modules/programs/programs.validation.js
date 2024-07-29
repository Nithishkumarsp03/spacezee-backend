import { z } from "zod";

const practicalsValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const learningMaterialValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const assignmentValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const programValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
    }),
    practicals: z.array(practicalsValidationSchema).optional(),
    learningMaterials: z.array(learningMaterialValidationSchema).optional(),
    assignments: z.array(assignmentValidationSchema).optional(),
    defaultSelected: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const programValidation = { programValidationSchema };
