import { Router } from "express";
import {
  CreateUsers,
  GetAllUsers,
  UpdateUsers,
  EachUsers,
} from "./userHandler.js";

const router = Router();

router.post("/", CreateUsers);
router.get("/", GetAllUsers);
router.get("/:id/:email", EachUsers);
router.put("/:id", UpdateUsers);

export default router;
