import userModel from "./user.model";

// * get all user
const getAllUser = async () => {
  const result = await userModel.find().sort({ createdAt: -1 });
  return result;
};

export const userService = {
  getAllUser,
};
