import { HttpException, Injectable } from "@nestjs/common";
import { TransactionData } from "./interface";
import { TransactionRepository } from "./repositories/transaction.repository";


@Injectable()
export class TransactionsService{
    constructor(
       private readonly transactionRepository:TransactionRepository
    ){}


   async createTransaction(dto:TransactionData){
    try{
        return await this.transactionRepository.save({...dto, user:{id:dto.user}})
    }catch(error:any){
        throw new HttpException(error.message, error.statusCode)
    }
   }
    
}