import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { WalletRepository } from "./repositories/wallet.repository";


@Module({
    providers:[WalletService, WalletRepository],
    controllers:[WalletController],
    imports:[],
    exports:[WalletService]
})
export class WalletModule{}