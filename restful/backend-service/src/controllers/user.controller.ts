import { Request, Response } from "express";
import { ApiResponse } from "../payload/response";
import User from "../models/User";
import { compare, hash } from "bcryptjs";
import { config } from "dotenv";

config()

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await hash(password, 8)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json(ApiResponse.success("User created successfully", { user }))
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json(ApiResponse.error(error.parent.detail, error))
        }
        return res.status(500).json(ApiResponse.error("Error occurred", error))
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user: any = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json(ApiResponse.success("User not found", null))
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json(ApiResponse.success("Invalid password", null))
        const token = user.generateAuthToken()
        return res.status(200).json(ApiResponse.success("User logged in successfully", { user, token }))
    } catch (error) {
        console.log(error)
        return res.status(500).json(ApiResponse.error("Error occurred ", error))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        if (!user) return res.status(404).json(ApiResponse.success("User not found", null))
        await user.destroy()
        return res.status(200).json(ApiResponse.success("User deleted successfully", null))
    } catch (error) {
        return res.status(500).json(ApiResponse.error("Error occurred ", error))
    }
}
