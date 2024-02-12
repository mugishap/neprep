import Joi from "joi";

export const CreateUserSchema = Joi.object({
    names: Joi.string().required().min(4).max(50),
    email: Joi.string().email().required().max(40).min(4),
    telephone: Joi.string().max(15).min(10),
    password: Joi.string().required().max(16).min(4),
})

export const UpdateUserSchema = Joi.object({
    names: Joi.string().required().min(4).max(50),
    email: Joi.string().email().required().max(40).min(4),
    telephone: Joi.string().max(15).min(10),
})

export const UpdatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().max(16).min(4),
    newPassword: Joi.string().required().max(16).min(4)
})

export const ResetPasswordSchema = Joi.object({
    password: Joi.string().required().max(16).min(4),
    code: Joi.string().required().length(6)
})

export const LoginSchema = Joi.object({
    email: Joi.string().email().required().max(40).min(4),
    password: Joi.string().required().max(16).min(4),
})

export const InitiatePasswordResetSchema = Joi.object({
    email: Joi.string().email().required().max(40).min(4)
})

export const UploadFileSchema = Joi.object({
    url: Joi.string().uri().required()
})