import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser,
);
router.post("/", userController.getAllUser);
router.get("/:id", userController.getSingleUser);
router.delete("/:id", userController.deleteSingleUser);

export const UserRoute = router;
