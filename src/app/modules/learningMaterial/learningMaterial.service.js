import httpStatus from "http-status";
import { UserRole } from "../user/user.constant.js";
import { LearningMaterial } from "./learningMaterial.model.js";
import AppError from "../../errors/AppError.js";

const createLearningMaterialIntoDB = async (payload) => {
  const userData = payload;
  const result = await LearningMaterial.create(userData);
  return result;
};

const getAllLearningMaterials = async (role) => {
  let result;
  if (role === "UserRole.user") {
    result = await LearningMaterial.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $addFields: {
          courseContents: {
            $filter: {
              input: "$courseContents",
              as: "courseContent",
              cond: { $eq: ["$$courseContent.isDeleted", false] },
            },
          },
        },
      },
      {
        $addFields: {
          courseContents: {
            $map: {
              input: "$courseContents",
              as: "courseContent",
              in: {
                $mergeObjects: [
                  "$$courseContent",
                  {
                    contentDetails: {
                      $concatArrays: [
                        {
                          $filter: {
                            input: "$$courseContent.contentDetails",
                            as: "detail",
                            cond: { $eq: ["$$detail.sortOrder", 0] },
                          },
                        },
                        {
                          $filter: {
                            input: "$$courseContent.contentDetails",
                            as: "detail",
                            cond: { $ne: ["$$detail.sortOrder", 0] },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          courseContents: {
            $map: {
              input: "$courseContents",
              as: "courseContent",
              in: {
                $mergeObjects: [
                  "$$courseContent",
                  {
                    contentDetails: {
                      $filter: {
                        input: "$$courseContent.contentDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail.isDeleted", false] },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          isDeleted: 0,
        },
      },
    ]);
  } else {
    result = await LearningMaterial.find();
  }
  return result;
};
const getAllLearningMaterialById = async (role, id) => {
  let result;
  if (role === UserRole.user) {
    result = await LearningMaterial.findOne({
      _id: id,
      isDeleted: false,
    }).select("-createdAt -updatedAt -__v -isDeleted");
  } else {
    result = await LearningMaterial.findById(id);
  }
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Learning material not found !");
  }

  return result;
};
export const LearningMaterialService = {
  createLearningMaterialIntoDB,
  getAllLearningMaterials,
  getAllLearningMaterialById,
};
