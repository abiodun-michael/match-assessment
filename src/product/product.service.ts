import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { IProduct } from "./interfaces";
import { CreateProductDto } from "./dto/create-product.dto";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { WalletService } from "src/wallet/wallet.service";
import { Product } from "./entities/product.entity";


@Injectable()
export class ProductService{

    constructor(
        private readonly productRepository:ProductRepository,
        private readonly walletService:WalletService
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
           const product = await this.productRepository.findOne({where:{id}, relations:["user"]})

           delete product.user.password
           delete product.user.role

           return product
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
           const productBuilder = this.productRepository.createQueryBuilder("products")
           return paginate<Product>(productBuilder, options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async buyProduct(amount:number, productId:string, userId:string){
        try{
            const product = await this.getProductById(productId)
            
            if(amount < 1){
                throw new HttpException("Product amount must be above 0", HttpStatus.BAD_REQUEST)
            }

            if(!product){
                throw new HttpException("Product is not found", HttpStatus.NOT_FOUND)
            }
            if(product.amountAvailable < 1){
                throw new HttpException("Product is out of stock", HttpStatus.BAD_REQUEST)
            }
            const productTotalCost = product.cost * amount

            await this.walletService.debit(productTotalCost, userId)
            await this.walletService.deposit(productTotalCost,product.user.id)


            return product
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }
    
}