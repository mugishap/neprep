import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    names: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(/^\+250\d{9}$/, {
        message: 'Mobile number must start with "+250" and have 9 digits after that.',
    })
    readonly telephone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    password: string;

}

export class UpdateUserDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    names: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Matches(/^\+250\d{9}$/, {
        message: 'Mobile number must start with "+250" and have 9 digits after that.',
    })
    readonly telephone: string;

}

export class ChangePasswordDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(16)
    newPassword: string;

}

export class UpdateAvatarDTO {

    @IsUrl()
    @IsNotEmpty()
    url: string;

}