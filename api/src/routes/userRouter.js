
import { Router } from "express";
import UserController from "../controllers/UserController";
import loginReq from "../middlewares/loginReq";
const router = new Router();

router.post("/", UserController.create);
router.put("/", loginReq,UserController.update);
router.get("/user", loginReq,UserController.get);
router.get("/", UserController.index);
router.delete("/",loginReq,UserController.delete);

export default router;
