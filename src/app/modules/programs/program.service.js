import { UserRole } from "../user/user.constant.js";
import {
  getFullProgramAggregation,
  getProgramDetailsAggregation,
} from "./program.utils.js";
import { Program } from "./programs.model.js";

const createProgramIntoDB = async (payload) => {
  const userData = payload;
  const result = await Program.create(userData);
  return result;
};

const getAllPrograms = async (role, info) => {
  let result;
  if (role === UserRole.user) {
    if (info.info) {
      result = await Program.aggregate(getProgramDetailsAggregation);
    } else {
      result = await Program.aggregate(getFullProgramAggregation);
    }
  } else {
    result = await Program.find()
      .populate({
        path: "learningMaterials.learningMaterial",
        match: { isDeleted: false },
        select: "name description courseImage courseContents", // specify the fields to include from LearningMaterial
        populate: {
          path: "courseContents",
          match: { isDeleted: false },
          populate: {
            path: "contentDetails",
            match: { isDeleted: false },
          },
        },
      })
      .populate({
        path: "practicals.practical",
        match: { isDeleted: false },
      })
      .populate({
        path: "assignments.assignment",
        match: { isDeleted: false },
      });
  }
  return result;
};

export const ProgramService = { createProgramIntoDB, getAllPrograms };
