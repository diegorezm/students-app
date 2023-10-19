
import { Router } from "express";
import loginReq from '../middlewares/loginReq';
import StudentController from "../controllers/StudentController";
const router = new Router();


router.post("/", loginReq,StudentController.create);
router.put("/", loginReq,StudentController.update);
router.get("/", StudentController.get);
router.delete("/:id", loginReq,StudentController.delete);

export default router;
