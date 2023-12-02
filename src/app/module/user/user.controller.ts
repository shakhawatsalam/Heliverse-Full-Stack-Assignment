/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { userService } from "./user.servece";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import catchAsync from "../../../shared/catchAsync";
import { UserFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/paginationConstants";

//* get all User
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await userService.getAllUser(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// * Get Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await userService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

export const userController = {
  getAllUser,
  getSingleUser,
};
