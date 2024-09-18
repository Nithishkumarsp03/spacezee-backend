import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { TaskMaterialService } from "./taskMaterial.service.js";

const createTaskMaterial = catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data);

  const result = await TaskMaterialService.createTaskMaterialIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Material created successfully",
    data: result,
  });
});

const getAllTaskMaterials = catchAsync(async (req, res) => {
  const { role } = req.user;
  const result = await TaskMaterialService.getAllTaskMaterials(role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Materials retrieved successfully",
    data: result,
  });
});

const getAllTaskMaterialById = catchAsync(async (req, res) => {
  const { role, email } = req.user;
  const { id } = req.params;
  const result = await TaskMaterialService.getAllTaskMaterialById(
    role,
    id,
    email
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Material retrieved successfully",
    data: result,
  });
});

const getCourseContentById = catchAsync(async (req, res) => {
  const { courseContentId } = req.body;
  const { id } = req.params;
  const result = await TaskMaterialService.getCourseContentById(
    id,
    courseContentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Content retrieved successfully",
    data: result,
  });
});

export const TaskMaterialController = {
  createTaskMaterial,
  getAllTaskMaterials,
  getAllTaskMaterialById,
  getCourseContentById,
};
