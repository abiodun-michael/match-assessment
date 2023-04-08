import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, IsNotEmpty,IsNumber } from "class-validator";



export class CreateProductDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productName: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amountAvailable: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cost: number
}