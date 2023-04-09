import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Session } from "src/auth/entities/session.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Transaction } from "src/transactions/entities/transactions.entity";
import { User } from "src/user/entities/user.entity";
import { Wallet } from "src/wallet/entities/wallet.entity";




@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    
    constructor(
        private readonly configService:ConfigService
    ){}

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return{
            type:'postgres',
            host:this.configService.get<string>('DB_HOST'),
            port:this.configService.get<number>('DB_PORT'),
            username:this.configService.get<string>('DB_USER'),
            password:this.configService.get<string>('DB_PASSWORD'),
            database:this.configService.get<string>('DB_NAME'),
            entities:[Product,User, Session, Wallet, Transaction, Order],
            synchronize:true,
            logging:false
        }
    }
}