import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ApiResponse } from "../payload/response";
import { IRequest } from "../types";
import { config } from "dotenv";

config()

export const checkLoggedIn = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) return res.status(401).json(ApiResponse.success("Unauthorized", null))
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        const user = await User.findOne({ where: { id: decoded.id } })
        if (!user) return res.status(401).json(ApiResponse.success("Unauthorized", null))
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json(ApiResponse.success("Error occurred ", error))
    }
}