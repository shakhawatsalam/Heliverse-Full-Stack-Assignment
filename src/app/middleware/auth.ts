/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import globalErrorHandler from "../../utils/globalErrorHandler";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../../redis";
import { userController } from "../models/user/user.controller";

// * authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new globalErrorHandler(
          "User is Not Authenticated",
          httpStatus.UNAUTHORIZED,
        ),
      );
    }

    const decoded = jwt.decode(access_token) as JwtPayload;
    if (!decoded) {
      return next(new globalErrorHandler("access token is not valid", 400));
    }

    // * check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await userController.updateAccessToken(req, res, next);
      } catch (error: any) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new globalErrorHandler(
            "Please login to access this resource",
            httpStatus.BAD_REQUEST,
          ),
        );
      }
    }
    const user = await redis.get(decoded.id);
    if (!user) {
      return next(
        new globalErrorHandler(
          "Please login to access this resource",
          httpStatus.BAD_REQUEST,
        ),
      );
    }
    req.user = JSON.parse(user);
    next();
  },
);

// validate user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new globalErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this recourse`,
          httpStatus.FORBIDDEN,
        ),
      );
    } else {
      next();
    }
  };
};
