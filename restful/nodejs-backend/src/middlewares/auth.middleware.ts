import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";
import prisma from "../prisma/prisma-client";
import ServerResponse from "../utils/ServerResponse";

export const checkLoggedIn = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return res.status(401).json({ message: "No token sent in headers!!!" })
        const response = jwt.verify(token, process.env.JWT_SECRET_KEY as string, {})
        if (!response) return res.status(401).json({ message: "You are not logged in" })
        req.user.id = (response as any).id
        next()
    }
    catch (error) {
        return ServerResponse.error(res, "Internal server error 500.")
    }
}


export const checkAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return res.status(401).json({ message: "You are not an admin" })
        const response = await jwt.verify(token, process.env.JWT_SECRET_KEY as string, {})
        if (!response) return res.status(401).json({ message: "You are not an admin" })
        if (!req.user.id) return res.status(401).json({ message: "You are not logged in" })
        const user = await prisma.user.findUnique({ where: { id: req.user.id } })
        if (!user) return res.status(401).json({ message: "You are not logged in" })
        if (user.role != "ADMIN") return ServerResponse.error(res, "You're not allowed to access this resource")
        req.user.id = user.id
        next()
    }
    catch (error) {
        return ServerResponse.error(res, "Internal server error 500.")
    }
}