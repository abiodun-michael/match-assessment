import { Module } from "@nestjs/common";
import { TransactionsService } from "./transaction.service";
import { TransactionsController } from "./transactions.controller";
import { TransactionRepository } from "./repositories/transaction.repository";


@Module({
    providers:[TransactionsService, TransactionRepository],
    controllers:[TransactionsController],
    exports:[TransactionsService]
})
export class TransactionsModule{}