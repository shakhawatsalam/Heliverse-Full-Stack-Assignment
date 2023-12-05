import { ITeam } from "./team.interface";
import TeamModel from "./team.model";

// * Create Team
const CreateTeam = async (payload: ITeam): Promise<ITeam | null> => {
  const result = await TeamModel.create(payload);
  return result;
};

// * Get All Team
const getAllTeam = async (): Promise<ITeam[] | null> => {
  const result = await TeamModel.find();
  return result;
};
// * Get Single Team
const getSingleTeam = async (id: string): Promise<ITeam | null> => {
  const result = await TeamModel.findById({ _id: id });
  return result;
};

export const TeamService = {
  CreateTeam,
  getSingleTeam,
  getAllTeam,
};
