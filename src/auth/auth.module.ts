import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { SessionRepository } from "./repositories/session.repository";
import { SessionService } from "./session.service";


@Module({
    providers:[AuthService, SessionRepository, SessionService],
    controllers:[AuthController],
    imports:[UserModule]
})
export class AuthModule{}