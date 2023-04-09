import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, Session, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TransactionsService } from "./transaction.service";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController{
    constructor(
        private readonly transactionService: TransactionsService
    ){}

    @Get()
    @UseGuards(AuthGuard)
    getAllTransaction(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Session() {user}:any
    ){
        return this.transactionService.getAllTransaction({page,limit}, user.id)
    }

}