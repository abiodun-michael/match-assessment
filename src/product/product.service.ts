import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { Product } from "./interfaces";
import { CreateProductDto } from "./dto/create-product.dto";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";


@Injectable()
export class ProductService{

    constructor(
        private readonly productRepository:ProductRepository
    ){}

    async checkProductByName(productName:string):Promise<Product>{
        try{
            return await this.productRepository.findOneBy({productName})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async createProduct(dto:CreateProductDto, sellerId:string):Promise<Product>{
        try{
           const isAvailable = await this.checkProductByName(dto.productName)
           if(isAvailable){
            throw new HttpException("Product with name already exist", HttpStatus.CONFLICT)
           }
           if(dto.cost % 5 > 0){
            throw new HttpException("Product cost should be multiples of 5", HttpStatus.BAD_REQUEST)
           }

           return await this.productRepository.save({...dto, user:{id:sellerId}})
           
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async deleteProduct(id:string, sellerId:string):Promise<Product>{
        try{
            const product = await this.getProductOptions({id, user:{id:sellerId}})

           if(!product){
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
           }
           await this.productRepository.delete(id)

           return product
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async updateProduct(id:string, dto:CreateProductDto, sellerId:string):Promise<Product>{
        try{
           const product = await this.getProductOptions({id, user:{id:sellerId}})
           if(!product){
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
           }

           return await this.productRepository.save({...dto, id})

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getProductById(id:string):Promise<Product>{
        try{
           return await this.productRepository.findOneBy({id})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getProductOptions(options:any):Promise<Product>{
        try{
           return await this.productRepository.findOneBy(options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAllProduct(options:IPaginationOptions):Promise<Pagination<Product>>{
        try{
           const productBuilder = this.productRepository.createQueryBuilder("product")
           return paginate<Product>(productBuilder, options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }
    
}