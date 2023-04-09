import { HttpException, Injectable } from "@nestjs/common";
import { TransactionData, TransactionType } from "./interface";
import { TransactionRepository } from "./repositories/transaction.repository";
import { IPaginationMeta, IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Transaction } from "./entities/transactions.entity";


@Injectable()
export class TransactionsService{
    constructor(
       private readonly transactionRepository:TransactionRepository
    ){}

   async createTransaction(userId:string, amount:number, type:TransactionType){
        try{
            return await this.transactionRepository.save({amount, type, user:{id:userId}})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
   }

   async getAllTransaction(options:IPaginationOptions,userId:string):Promise<Pagination<Transaction>>{
        try{
            const transactionBuilder = this.transactionRepository.createQueryBuilder("transaction")
                                        .where({user:{id:userId}})
            return paginate<Transaction>(transactionBuilder, options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
   }
    
}