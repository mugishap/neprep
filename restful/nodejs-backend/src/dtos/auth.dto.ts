import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;

}


export class InitiateResetPasswordDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export class ResetPasswordDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;

    @IsString()
    @IsNotEmpty()
    code: string;

}