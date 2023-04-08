import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "src/user/entities/user.entity"
import { TransactionType } from "../interface"



@Entity()
export class Transaction extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column({
       nullable:false,
       default:0
    })
    amount:number

    @Column({
        enum:TransactionType,
        nullable:false
     })
     type:TransactionType

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}