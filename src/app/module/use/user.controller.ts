/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors";
import { userService } from "./user.servece";
import globalErrorHandler from "../../utils/globalErrorHandler";
import httpStatus from "http-status";
const getAllUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getAllUser();
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error: any) {
      console.log(error);
      return next(
        new globalErrorHandler(error.message, httpStatus.BAD_REQUEST),
      );
    }
  },
);

export const userController = {
  getAllUser,
};
