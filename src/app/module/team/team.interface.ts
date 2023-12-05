import { IUser } from "../user/user.interface";

export type ITeam = {
  teamName: string;
  teams: IUser[];
};
