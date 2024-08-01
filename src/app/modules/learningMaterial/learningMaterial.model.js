import { Schema, model } from "mongoose";

const contentDetailsSchema = new Schema(
  {
    title: {
      type: String,
    },
    fileName: {
      type: String,
    },
    contentTypeStr: {
      type: String,
    },
    sortOrder: {
      type: Number,
      enum: [0, 1],
    },
    fileURL: {
      type: String,
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
    contentDetails: [contentDetailsSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const learningMaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    description: {
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

export const LearningMaterial = model(
  "LearningMaterial",
  learningMaterialSchema
);
