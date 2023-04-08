import { Body, Controller, DefaultValuePipe, Get, ParseFloatPipe, Patch, Session, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WalletDepositDto } from "./dto/deposit.dto";
import { WalletService } from "./wallet.service";
import { BuyerGuard } from "src/common/guards/buyer.guard";

@ApiTags("Wallet")
@Controller("wallet")
export class WalletController{
    constructor(
        private readonly walletService:WalletService
    ){}
 

    @Patch("/deposit")
    @UseGuards(BuyerGuard)
    deposit(@Body() dto:WalletDepositDto, @Session() {user}:any){
        return this.walletService.deposit(dto.amount,user.id)
    }

    @Patch("/reset")
    @UseGuards(BuyerGuard)
    reset(@Session() {user}:any){
        return this.walletService.reset(user.id)
    }

}