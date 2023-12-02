import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: true },
    domain: { type: String, required: true },
    available: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const userModel: Model<IUser> = mongoose.model("User", UserSchema);

export default userModel;
