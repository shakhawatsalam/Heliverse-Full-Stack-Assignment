import express from "express";
import { TeamController } from "./team.controller";

const router = express.Router();

router.get("/", TeamController.getAllTeam);
router.post("/", TeamController.createTeam);
router.get("/:id", TeamController.getSingleTeam);

export const TeamRoutes = router;
