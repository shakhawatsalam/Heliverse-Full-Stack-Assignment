import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getSingleUser);

export const UserRoute = router;
