import { HttpException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./repositories/order.repository";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService{
    constructor(
        private readonly orderRepository: OrderRepository
    ){}

    async createOrder(productId:string, userId:string, amountPaid:number, totalBought:number){
        try{
            return await this.orderRepository.save({product:{id:productId}, user:{id:userId}, amountPaid, totalBought})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAllOrderByProductId(options:IPaginationOptions, productId:string):Promise<Pagination<Order>>{
        try{
            const orderBuilder = this.orderRepository.createQueryBuilder("order")
            .where({product:{id:productId}})
            return paginate<Order>(orderBuilder, options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }
    
}