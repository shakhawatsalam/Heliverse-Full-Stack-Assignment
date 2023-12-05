import mongoose, { Model, Schema } from "mongoose";
import { ITeam } from "./team.interface";

const TeamSchema: Schema<ITeam> = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    teams: [{ type: Object, required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const TeamModel: Model<ITeam> = mongoose.model("Team", TeamSchema);

export default TeamModel;
