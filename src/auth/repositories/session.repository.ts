import { Injectable } from "@nestjs/common";
import { Repository,DataSource } from "typeorm";
import { Session } from "../entities/session.entity";


@Injectable()
export class SessionRepository extends Repository<Session>{
    constructor(private readonly dataSource: DataSource){
        super(Session, dataSource.createEntityManager());
    }
}