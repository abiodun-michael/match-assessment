import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderRepository } from "./repositories/order.repository";

@Module({
    providers:[OrderService, OrderRepository],
    controllers:[OrderController],
    exports:[OrderService]
})
export class OrderModule{}