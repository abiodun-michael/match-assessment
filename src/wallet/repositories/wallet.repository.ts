import { Injectable } from "@nestjs/common";
import { Repository,DataSource } from "typeorm";
import { Wallet } from "../entities/wallet.entity";


@Injectable()
export class WalletRepository extends Repository<Wallet>{
    constructor(private readonly dataSource: DataSource){
        super(Wallet, dataSource.createEntityManager());
    }
}