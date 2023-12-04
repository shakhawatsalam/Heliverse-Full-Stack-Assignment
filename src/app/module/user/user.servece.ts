/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { UserSearchFields } from "./user.constant";
import { SortOrder } from "mongoose";
import userModel from "./user.model";
import { IUser } from "./user.interface";

// * Create User
const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await userModel.create(payload);
  return result;
};
// * get all user
const getAllUser = async (
  filters: any, //Partial<ParsedQs>
  paginationOptions: any,
) => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: UserSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    // filter data is an object  { code: '02' } && { code: '02', year: '2025' } exact matching
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder; // 1 or -1 && asc or desc
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await userModel
    .find(whereConditions)
    .sort(sortCondition) // { createdAt: 'desc' } = default
    .skip(skip)
    .limit(limit);
  // .select(["domain"]);

  const total = await userModel.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * Get Single User
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await userModel.findById({ _id: id });
  return result;
};

// * Update Single User
const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await userModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
// * Get Single User
const deleteSingleUser = async (id: string) => {
  const result = await userModel.findByIdAndDelete({ _id: id });
  return result;
};

export const userService = {
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  createUser,
};
