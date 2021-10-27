import { Router } from "express";
import { getPersons } from "../controllers/persona";

const router = Router();
router.get("/", getPersons);

export default router;
