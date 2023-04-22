import express from "express";
import { getSilaeTokenController } from "../controllers/getSilaeTokenController";

const router = express.Router();

router.get("/", getSilaeTokenController.getToken);
router.post("/", getSilaeTokenController.getTokenWithCredentials);

export default router;
