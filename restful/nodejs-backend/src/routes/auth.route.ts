import { RequestHandler, Router } from "express";
import authController from "../controllers/auth.controller";
import { checkLoggedIn } from "../middlewares/auth.middleware";

const authRouter = Router()

authRouter.post("/login", authController.login)
authRouter.post("/initiate-reset-password", authController.initiateResetPassword)
authRouter.post("/reset-password", authController.resetPassword)
authRouter.post("/initiate-email-verification", [checkLoggedIn as RequestHandler], authController.initiateEmailVerification as any)
authRouter.post("/verify-email/{code}", [checkLoggedIn as RequestHandler], authController.verifyEmail)

export default authRouter