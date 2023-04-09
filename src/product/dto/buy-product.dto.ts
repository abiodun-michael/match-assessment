import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsNumber } from "class-validator";



export class BuyProductDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amountAvailable: number
}