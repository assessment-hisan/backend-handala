import express from "express";
const router = express.Router();
import authenticateToken from "../utilities.js";
import { createAccount, Login, getUser } from "../controllers/auth.js";

router.route('/create').post(authenticateToken,createAccount)
router.route('/login').post(Login)
router.route('/get-user').get(authenticateToken,getUser)


 export default router