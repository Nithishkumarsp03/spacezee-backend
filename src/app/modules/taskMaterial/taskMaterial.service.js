import httpStatus from "http-status";
import { UserRole } from "../user/user.constant.js";

import { TaskMaterial } from "./taskMaterial.model.js";
import { User } from "../user/user.model.js";
import AppError from "../../errors/AppError.js";

const createTaskMaterialIntoDB = async (payload) => {
  const userData = payload;
  const result = await TaskMaterial.create(userData);
  return result;
};

const getAllTaskMaterials = async (role) => {
  let result;
  if (role === UserRole.user) {
    result = await TaskMaterial.aggregate([
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
    result = await TaskMaterial.find();
  }
  return result;
};

const getAllTaskMaterialById = async (role, id, email) => {
  let result;
  if (role === UserRole.user) {
    const user = await User.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    const completedTasks = user.completedTask.map((taskId) =>
      taskId.toString()
    );

    result = await TaskMaterial.findOne({
      _id: id,
      isDeleted: false,
    }).select(
      "-createdAt -updatedAt -__v -isDeleted  -courseContents.contentDetails"
    );

    if (result) {
      let completedCount = 0;

      const content = result.courseContents.map((content) => {
        const contentId = content._id.toString();
        const isCompleted = completedTasks.includes(contentId);
        if (isCompleted) {
          completedCount++;
        }
        return {
          ...content._doc,
          completed: isCompleted,
        };
      });

      const totalContents = result.courseContents.length;
      const completedPercentage = Math.floor(
        (completedCount / totalContents) * 100
      );

      result = {
        ...result._doc,
        courseContents: content,
        completedTaskPercentage: completedPercentage,
      };
    }
  } else {
    result = await TaskMaterial.findById(id);

    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Course material not found !");
    }
  }

  return result;
};

const getCourseContentById = async (taskMaterialId, courseContentId) => {
  try {
    const taskMaterial = await TaskMaterial.findById(taskMaterialId);

    if (!taskMaterial) {
      throw new Error("TaskMaterial not found");
    }

    const courseContent = taskMaterial.courseContents.find(
      (content) => content._id.toString() === courseContentId
    );

    if (!courseContent) {
      throw new Error("Course content not found");
    }
    return {
      name: taskMaterial.name,
      taskName: courseContent.title,
      details: courseContent.description,
      id: taskMaterial._id,
      taskId: courseContent?._id,
      questions: courseContent?.contentDetails[0]?.questions,
      answers: courseContent?.contentDetails[0]?.answers,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving course content");
  }
};

export const TaskMaterialService = {
  createTaskMaterialIntoDB,
  getAllTaskMaterials,
  getAllTaskMaterialById,
  getCourseContentById,
};
