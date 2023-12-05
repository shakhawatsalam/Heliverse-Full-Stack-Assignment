"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// * User Create Zod Schema
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    first_name: zod_1.z.string({
      required_error: "First is Required",
    }),
    last_name: zod_1.z.string({
      required_error: "Last is Required",
    }),
    email: zod_1.z.string({
      required_error: "Email is Required",
    }),
    gender: zod_1.z.string({
      required_error: "Gender is Required",
    }),
    avatar: zod_1.z.string({
      required_error: "Avater is Required",
    }),
    domain: zod_1.z.string({
      required_error: "Domain is Required",
    }),
    available: zod_1.z.boolean({
      required_error: "Available is Required",
    }),
  }),
});
// * Update User Zod Schema
const updateUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    first_name: zod_1.z.string().optional(),
    last_name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    domain: zod_1.z.string().optional(),
    available: zod_1.z.boolean().optional(),
  }),
});
exports.UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
