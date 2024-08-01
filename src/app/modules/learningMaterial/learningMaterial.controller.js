import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { LearningMaterialService } from "./learningMaterial.service.js";

const createLearningMaterial = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await LearningMaterialService.createLearningMaterialIntoDB(
    data
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Learning Material created successfully",
    data: result,
  });
});

const getAllLearningMaterials = catchAsync(async (req, res) => {
  const { role } = req.user;
  const result = await LearningMaterialService.getAllLearningMaterials(role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Learning Materials retrieved successfully",
    data: result,
  });
});

const getAllLearningMaterialById = catchAsync(async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  const result = await LearningMaterialService.getAllLearningMaterialById(
    role,
    id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Learning Material retrieved successfully",
    data: result,
  });
});

export const LearningMaterialController = {
  createLearningMaterial,
  getAllLearningMaterials,
  getAllLearningMaterialById,
};
