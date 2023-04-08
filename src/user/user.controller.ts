import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Put, Query, Session, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserReponse } from "./dto/user-reponse.dto";
import { BuyerGuard } from "src/common/guards/buyer.guard";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("User")
@Controller("user")
export class UserController{

    constructor(
        private readonly userService: UserService
    ){}

    @ApiOkResponse({
        type:UserReponse,
        isArray:true
    })
    @Get()
    getAllUser(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ){
        return this.userService.getAllUser({limit, page})
    }

    @ApiOkResponse({
        type:UserReponse
    })
    @Get("/profile")
    @UseGuards(AuthGuard)
    async getProfile(@Session() {user}:any){
        return await this.userService.getUserById(user.id)
    }

    @Get("wallet")
    @UseGuards(AuthGuard)
    async getMyWallet(@Session() {user}:any){
        return await this.userService.getMyWallet(user.id)
    }

    @ApiOkResponse({
        type:UserReponse
    })
    @Get(":id")
    getUSerById(@Param("id") id:string){
        return this.userService.getUserById(id)
    }

    @Put(":id")
    @UseGuards(BuyerGuard)
    updateUser(@Param("id") id:string){
        return this.userService.getUserById(id)
    }
}