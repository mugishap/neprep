import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty()
    readonly names: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsEnum(['USER'], { message: "User must be either user or admin" })
    @IsNotEmpty({ message: "Role is required" })
    @ApiProperty()
    readonly role: 'USER';

    @IsNotEmpty()
    @ApiProperty()
    @Matches(/^\+250\d{9}$/, {
        message: 'Mobile number must start with "+250" and have 9 digits after that.',
    })
    readonly telephone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @ApiProperty()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
        message: 'Password must have at least 6 characters, one symbol, one number, and one uppercase letter.',
    })
    readonly password: string;
}