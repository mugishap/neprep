import { Request, Response } from "express"
import ServerResponse from "../utils/ServerResponse"

const login = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const initiateResetPassword = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const initiateEmailVerification = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const verifyEmail = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}


const authController = {
    login,
    initiateResetPassword,
    resetPassword,
    initiateEmailVerification,
    verifyEmail
}

export default authController