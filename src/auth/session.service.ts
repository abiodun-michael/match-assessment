import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SessionRepository } from "./repositories/session.repository";

@Injectable()
export class SessionService{
    constructor(private readonly sessionRepository:SessionRepository){}

    async createSession(userId:string, sessionId:string){
        try{
            return await this.sessionRepository.save({userId, sessionId})

        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async deleteSession(user:string){
        try{
        return await this.sessionRepository.delete({user})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getSessionByUserId(user:string){
        try{
        return await this.sessionRepository.findOneBy({user})
        }catch(error:any){
            throw new HttpException(error.message, error.statusCode)
        }
    }
}