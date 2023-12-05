import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { TeamService } from "./team.service";
import { ITeam } from "./team.interface";

// * Create User
const createTeam = catchAsync(async (req: Request, res: Response) => {
  const { ...teamData } = req.body;

  const result = await TeamService.CreateTeam(teamData);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team Created successfully",
    data: result,
  });
});

// * Get Single Team
const getSingleTeam = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TeamService.getSingleTeam(id);

  sendResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team retrieved successfully",
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getSingleTeam,
};
