import { Request, Response } from "express"
import ServerResponse from "../utils/ServerResponse"
import prisma from "../prisma/prisma-client"
import { compare, hash } from "bcrypt"
import jwt from 'jsonwebtoken'
import { sendAccountVerificationEmail, sendPaswordResetEmail } from "../utils/mail"
import { AuthRequest } from "../types"

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) return ServerResponse.error(res, "Invalid email or password")
        const isMatch = compare(password, user.password)
        if (!isMatch) return ServerResponse.error(res, "Invalid email or password")
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '3d' })
        return ServerResponse.success(res, "Login successful", { user, token })
    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const initiateResetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const passwordResetCode = Math.floor(100000 + Math.random() * 900000).toString()
        const passwordResetExpires = new Date(Date.now() + 1000 * 60 * 60 * 6) // 6 hours
        const user = await prisma.user.update({
            where: { email },
            data: {
                passwordResetCode,
                passwordResetExpires
            }
        })
        await sendPaswordResetEmail(email, user.names, passwordResetCode)
        return ServerResponse.success(res, "Password reset email sent successfully")
    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try {
        const { password, code } = req.body
        const user = await prisma.user.findFirst({
            where: { passwordResetCode: code, passwordResetExpires: { gte: new Date() } }
        })
        if (!user) return ServerResponse.error(res, "Invalid or expired code")
        const hashedPassword = await hash(password, 10)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetCode: null,
                passwordResetExpires: null
            }
        })
        return ServerResponse.success(res, "Password reset successfully")
    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const initiateEmailVerification = async (req: AuthRequest, res: Response) => {
    try {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const verificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 6) // 6 hours
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                verificationCode,
                verificationExpires,
                verificationStatus: "PENDING"
            }
        })
        await sendAccountVerificationEmail(user.email, user.names, verificationCode)
        return ServerResponse.success(res, "Verification email sent successfully")
    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
}

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { password, code } = req.body
        const user = await prisma.user.findFirst({
            where: { verificationCode: code, verificationExpires: { gte: new Date() } }
        })
        if (!user) return ServerResponse.error(res, "Invalid or expired code")
        const hashedPassword = await hash(password, 10)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationStatus: "VERIFIED",
                verificationCode: null,
                verificationExpires: null
            }
        })
        return ServerResponse.success(res, "Verification code successfully")
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