import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "./repositories/user.repository";
import { UserController } from "./user.controller";
import { WalletModule } from "src/wallet/wallet.module";


@Module({
    providers:[UserService,UserRepository],
    controllers:[UserController],
    exports:[UserService],
    imports:[WalletModule]
})
export class UserModule{}