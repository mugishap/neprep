import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post("/login", authController.login)
authRouter.post("/initiate-reset-password", authController.initiateResetPassword)
authRouter.post("/reset-password", authController.resetPassword)
authRouter.post("/initiate-email-verification", [], authController.initiateEmailVerification)
authRouter.post("/verify-email/{code}", [], authController.verifyEmail)

export default authRouter