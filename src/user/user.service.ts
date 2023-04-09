import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { IUser, UserInputData } from "./interfaces";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { User } from "./entities/user.entity";
import { WalletService } from "src/wallet/wallet.service";


@Injectable()
export class UserService{
    constructor(
        private readonly userRepository:UserRepository,
        private readonly walletService:WalletService
    ){}

    async createUser(dto:UserInputData):Promise<User>{
        try{
            const user = await this.userRepository.save(dto)
            await this.walletService.createWallet(user.id)

            return user
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async updateUser(dto:UserInputData, id:string):Promise<User>{
        try{
            const user = await this.getUserById(id)

            if(!user){
                throw new HttpException("User is not found", HttpStatus.NOT_FOUND)
            }

            return await this.userRepository.save({...dto, id})

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async deleteUserById(id:string):Promise<User>{
        try{
            const user = await this.getUserById(id)

            if(!user){
                throw new HttpException("User is not found", HttpStatus.NOT_FOUND)
            }
            await this.userRepository.delete({id})
            
            return user

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAllUser(options:IPaginationOptions):Promise<Pagination<User>>{
        try{
            const userBuilder = this.userRepository.createQueryBuilder('user')
            .select('user.id')
            .addSelect('user.username')
            .addSelect('user.createdAt')
            .addSelect('user.updatedAt')
            return paginate<User>(userBuilder,options)
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getUserById(id:string):Promise<User>{
        try{
           return await this.userRepository.findOneBy({id})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getUserByUsername(username:string){
            return await this.userRepository.findOneBy({username})
    }

    async getMyWallet(userId:string){
        return this.walletService.getWallet(userId)
    }
}