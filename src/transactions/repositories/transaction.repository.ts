import { Injectable } from "@nestjs/common";
import { Repository,DataSource } from "typeorm";
import { Transaction } from "../entities/transactions.entity";



@Injectable()
export class TransactionRepository extends Repository<Transaction>{
    constructor(private readonly dataSource: DataSource){
        super(Transaction, dataSource.createEntityManager());
    }
}