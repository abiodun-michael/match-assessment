import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductRepository } from "./repositories/product.repository";
import { ProductController } from "./product.controller";


@Module({
    providers:[ProductService,ProductRepository],
    controllers:[ProductController],
    imports:[]
})
export class ProductModule{}