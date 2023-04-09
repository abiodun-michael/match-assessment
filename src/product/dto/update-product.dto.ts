import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsEmail, IsNotEmpty,IsNumber, IsOptional } from "class-validator";



export class UpdateProductDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    productName: string

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    amountAvailable: number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    cost: number
}