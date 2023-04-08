import { Body, Controller, Post, Session } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController{

    constructor(
        private readonly authService:AuthService
    ){}

    @Post("login")
    async login(@Body() dto:LoginDto, @Session() session:any){
        const res = await this.authService.login(dto)
        session.user = {id:res.id, role:res.role}
        return res
    }

    @Post("register")
    register(@Body() dto:CreateUserDto){
        return this.authService.register(dto)
    }
}