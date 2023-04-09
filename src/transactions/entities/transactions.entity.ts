import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "src/user/entities/user.entity"
import { TransactionType } from "../interface"



@Entity("transactions")
export class Transaction extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Index()
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