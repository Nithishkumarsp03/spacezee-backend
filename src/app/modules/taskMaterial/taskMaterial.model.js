import { Schema, model } from "mongoose";

const contentDetailsSchema = new Schema(
  {
    questions: {
      type: Schema.Types.Mixed,
      default: {},
    },
    answers: {
      type: Object,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const courseContentsSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    endPoint: {
      type: String,
      required: true,
    },
    contentDetails: [contentDetailsSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const taskMaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    courseContents: [courseContentsSchema],
  },
  { timestamps: true }
);

export const TaskMaterial = model("TaskMaterial", taskMaterialSchema);
