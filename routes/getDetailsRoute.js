import express from "express";
const router = express.Router();

//import { authenticateToken } from "../utilities";
import  {contestants, programs, registrations, getContestantDetails} from "./../controllers/getdetails.js";

router.route('/contestants').get(contestants)
router.route('/programs').get(programs)
router.route('/registrations').get(registrations)
router.route("/contestant/:id").get(getContestantDetails)
export default router