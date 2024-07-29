import { Program } from "./programs.model.js";

const createProgramIntoDB = async (payload) => {
  const userData = payload;
  const result = await Program.create(userData);
  return result;
};

const getAllPrograms = async () => {
  const result = await Program.find();
  return result;
};

export const ProgramService = { createProgramIntoDB, getAllPrograms };
