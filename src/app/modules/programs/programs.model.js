import { Schema, model } from "mongoose";

const practicalSchema = new Schema(
  {
    practical: {
      type: Schema.Types.ObjectId,
      ref: "Practical",
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

const learningMaterialSchema = new Schema(
  {
    learningMaterial: {
      type: Schema.Types.ObjectId,
      ref: "LearningMaterial",
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

const assignmentSchema = new Schema(
  {
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
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

const programSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    practicals: [practicalSchema],
    learningMaterials: [learningMaterialSchema],
    assignments: [assignmentSchema],
    defaultSelected: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Program = model("Program", programSchema);
