import {Router} from "express";
import {login,info} from "../controller/login.js";


const router = Router()
router.post('/login', login)

router.post('/user/info', info)
export default router
