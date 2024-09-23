import express from "express";
const router = express.Router();
import authenticateToken from '../utilities.js'

import {registrations,individual, group, updateIndReg, updateGrpReg, clearregisteredprogram} from './../controllers/registrationController.js'
//import { authenticateToken } from "../utilities.js";

router.route('/').get(authenticateToken,registrations)
router.route('/individual').post(authenticateToken, individual)
router.route('/group').post(group)
router.route('/updateind').post(updateIndReg)
router.route('/updategrp').post(updateGrpReg)
router.route('/clear').post(clearregisteredprogram)
export default router;