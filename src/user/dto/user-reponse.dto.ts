import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";


export class UserReponse{
    @ApiProperty()
    username:string

    @ApiProperty()
    role:string

    @ApiProperty()
    createdAt:Date

    @ApiProperty()
    updatedAt:Date
}