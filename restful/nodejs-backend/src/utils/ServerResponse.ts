import { Response } from "express"

class ServerResponse {
    success: boolean
    message: string
    data: any

    constructor(success: boolean, message: string, data: any) {
        this.success = success
        this.message = message
        this.data = data
    }

    static created(res: Response, message: string, data?: any | null) {
        return res.status(201).json(new ServerResponse(true, message, data))
    }

    static success(res: Response, message: string, data?: any | null) {
        return res.status(200).json(new ServerResponse(true, message, data))
    }

    static error(res: Response, message: string, data?: any | null) {
        return res.status(400).json(new ServerResponse(false, message, data))
    }

}

export default ServerResponse