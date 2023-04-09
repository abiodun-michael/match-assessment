import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { WalletRepository } from "./repositories/wallet.repository";
import { TransactionsModule } from "src/transactions/transactions.module";


@Module({
    providers:[WalletService, WalletRepository],
    controllers:[WalletController],
    imports:[TransactionsModule],
    exports:[WalletService]
})
export class WalletModule{}