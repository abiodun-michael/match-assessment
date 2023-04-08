import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsIn } from "class-validator";
import { CoinDenomination } from "../interfaces";



export class WalletDepositDto{
    @ApiProperty({
        enum:CoinDenomination,
        default:CoinDenomination.FIVE
    })
    @IsIn([5,10,20,50,100])
    @IsNotEmpty()
    amount: CoinDenomination
}