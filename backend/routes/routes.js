
//import { Router } from "express"

import express from 'express';
const router = express.Router();

import {signupCont, loginCont} from '../controllers/controller.js'
import {signupVal, loginVal} from '../middlewares/validation.js'

router.post('/login', loginVal, loginCont)
router.post('/signup', signupVal, signupCont)

export default router;