import { Schema, model } from "mongoose";

const TaskJwtSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const TaskJwt = model("TaskJwt", TaskJwtSchema);
