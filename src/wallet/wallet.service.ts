import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WalletRepository } from "./repositories/wallet.repository";


@Injectable()
export class WalletService{
    constructor(
        private readonly walletRepository:WalletRepository
    ){}


    async createWallet(userId:string){
        try{
            return await this.walletRepository.save({user:{id:userId}})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getWallet(userId:string){
        try{
            return await this.walletRepository.findOneBy({user:{id:userId}})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        } 
    }

    async deposit(amount:number, userId:string){
        try{
            const wallet = await this.walletRepository.findOneBy({user:{id:userId}})
            
            const newBalance = wallet.balance + amount

            return await this.walletRepository.save({...wallet, balance:newBalance})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async reset(userId:string){
        try{
            const wallet = await this.walletRepository.findOneBy({user:{id:userId}})
            
            const newBalance = 0

            return await this.walletRepository.save({...wallet, balance:newBalance})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async debit(amount:number, userId:string){
        try{
            const wallet = await this.walletRepository.findOneBy({user:{id:userId}})

            if(wallet.balance < amount){
                throw new HttpException("Insufficient balance", HttpStatus.BAD_REQUEST)
            }
            
            const newBalance = wallet.balance - amount

            return await this.walletRepository.save({...wallet, balance:newBalance})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }
    
}