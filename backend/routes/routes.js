
//import { Router } from "express"

import express from 'express';
const router = express.Router();

import { signupHandel, loginHandle as loginHandle } from '../controllers/controller.js'
import { signupMiddleware as signupMiddleware, loginMiddleware } from '../middlewares/validation.js'

router.post('/login', loginMiddleware, loginHandle)
router.post('/signup', signupMiddleware, signupHandel)

export default router;
