import { Injectable } from "@nestjs/common";
import { Repository,DataSource } from "typeorm";
import { Product } from "../entities/product.entity";


@Injectable()
export class ProductRepository extends Repository<Product>{
    constructor(private readonly dataSource: DataSource){
        super(Product, dataSource.createEntityManager());
    }
}