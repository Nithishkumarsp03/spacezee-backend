import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { ProgramService } from "./program.service.js";

const createProgram = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await ProgramService.createProgramIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Program created successful",
    data: result,
  });
});
const getAllPrograms = catchAsync(async (req, res) => {
  const { role } = req.user;
  const info = req.body;
  const result = await ProgramService.getAllPrograms(role, info);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Programs retrieve successful",
    data: result,
  });
});

export const ProgramController = { createProgram, getAllPrograms };
