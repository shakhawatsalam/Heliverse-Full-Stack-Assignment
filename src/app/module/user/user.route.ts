import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getSingleUser);
router.delete("/:id", userController.deleteSingleUser);

export const UserRoute = router;
