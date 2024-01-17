import { Request, Response } from "express"
import { ApiResponse } from "../payload/response"
import Employee from "../models/Employee"

export const getPaginated = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query
        const { rows, count } = await Employee.findAndCountAll({
            offset: Number(page) * Number(limit),
            limit: Number(limit),
            order: [['createdAt', 'DESC']]
        })
        return res.status(200).json(ApiResponse.success("Employees fetched successfully", { employees: rows, count }))
    } catch (error) {
        return res.status(500).json(ApiResponse.success("Error occurred", error))
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, nationalId, department, position, email, telephone, brand, serialNumber, model } = req.body
        const employee = await Employee.create({
            firstName,
            lastName,
            nationalId,
            department,
            position,
            email,
            telephone,
            brand,
            serialNumber,
            model
        })
        employee.save()
        return res.status(201).json(ApiResponse.success("Employee created successfully", { employee }))
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json(ApiResponse.error(error.parent.detail, error))
        }
        return res.status(500).json(ApiResponse.success("Error occurred", error))
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Employee.destroy({ where: { id } })
        return res.status(200).json(ApiResponse.success("Employee deleted successfully", null))
    } catch (error) {
        return res.status(500).json(ApiResponse.success("Error occurred", error))
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, nationalId, department, position, email, telephone, brand, serialNumber, model } = req.body
        const { id } = req.params
        const employee = await Employee.findOne({ where: { id } })
        if (!employee) return res.status(404).json(ApiResponse.success("Employee not found", null))
        await employee.update({
            firstName,
            lastName,
            nationalId,
            department,
            position,
            email,
            telephone,
            brand,
            serialNumber,
            model
        })
        return res.status(200).json(ApiResponse.success("Employee updated successfully", { employee }))
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json(ApiResponse.error(error.parent.detail, error))
        }
        return res.status(500).json(ApiResponse.success("Error occurred", error))
    }
}