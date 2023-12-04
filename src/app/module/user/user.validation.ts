import { z } from "zod";

// * User Create Zod Schema
const createUserZodSchema = z.object({
  body: z.object({
    first_name: z.string({
      required_error: "First is Required",
    }),
    last_name: z.string({
      required_error: "Last is Required",
    }),
    email: z.string({
      required_error: "Email is Required",
    }),
    gender: z.string({
      required_error: "Gender is Required",
    }),
    avatar: z.string({
      required_error: "Avater is Required",
    }),
    domain: z.string({
      required_error: "Domain is Required",
    }),
    available: z.boolean({
      required_error: "Available is Required",
    }),
  }),
});

// * Update User Zod Schema
const updateUserZodSchema = z.object({
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    gender: z.string().optional(),
    avatar: z.string().optional(),
    domain: z.string().optional(),
    available: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
