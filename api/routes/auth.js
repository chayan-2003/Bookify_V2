import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { login, register ,profile} from "../controllers/Auth.js";

const router= express.Router();

router.get("/",(req,res)=>{
     res.send("Hello, This is the authentication endpoint!!")
})

///dasdasdasda

router.post("/register",register);
router.post("/login",login);
router.get("/profile",verifyUser,profile);

export default router;