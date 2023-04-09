import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, IsNotEmpty,IsNumber, IsEnum, IsIn } from "class-validator";
import { UserRole } from "../interfaces";



export class CreateUserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty(
        {
            type:String,
            enum:UserRole
        }
    )
    @IsString()
    @IsNotEmpty()
    @IsIn(["Seller","Buyer"])
    role: UserRole
}