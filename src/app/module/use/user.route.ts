import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUser);

export const UserRoute = router;
