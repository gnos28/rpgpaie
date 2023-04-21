import express from "express";
import { getSilaeTokenController } from "../controllers/getSilaeTokenController";

const router = express.Router();

router.post("/", getSilaeTokenController.getToken);

export default router;
