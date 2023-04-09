import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductRepository } from "./repositories/product.repository";
import { ProductController } from "./product.controller";
import { WalletModule } from "src/wallet/wallet.module";
import { OrderModule } from "src/order/order.module";


@Module({
    providers:[ProductService,ProductRepository],
    controllers:[ProductController],
    imports:[WalletModule, OrderModule]
})
export class ProductModule{}