import {Router} from "express";
import {login} from "../controller/login.js";
import Public from "../controller/public.js"

const router = Router()
router.use(Public)
router.post('/login', login)

// router.post('/user/info', info)
export default router
