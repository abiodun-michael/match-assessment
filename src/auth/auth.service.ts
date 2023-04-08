import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import { SessionService } from "./session.service";

@Injectable()
export class AuthService{

    constructor(
        private readonly userService:UserService,
        private readonly sessionService:SessionService
    ){}

    async login(dto:LoginDto):Promise<any>{
        try{
            const user = await this.userService.getUserByUsername(dto.username)

            if(!user){
                throw new HttpException("Username and poassword combination is not correct", HttpStatus.NOT_FOUND)
            }
            const isPasswordCorrect = await this.comparePassword(dto.password, user.password)
        
            if(!isPasswordCorrect){
                throw new HttpException("Username and poassword combination is not correct", HttpStatus.NOT_FOUND)
            }

            const isSessionExist = await this.sessionService.getSessionByUserId(user.id)
            if(isSessionExist){
                throw new HttpException("There is already an active session using your account", HttpStatus.CONFLICT)
            }
            delete user.password
            return user

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async register(dto:CreateUserDto):Promise<any>{
        try{
            const existingUser = await this.userService.getUserByUsername(dto.username)

            if(existingUser){
                throw new HttpException("User with username already exist", HttpStatus.CONFLICT)
            }
            const password = this.hashPassword(dto.password)

            return await this.userService.createUser({...dto, password})

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    private hashPassword(password:string){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    private async comparePassword(plain:string, hashed:string):Promise<boolean>{
        return await bcrypt.compare(plain, hashed)
    }

    
}