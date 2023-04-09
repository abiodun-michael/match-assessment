import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "src/user/entities/user.entity"

@Entity("wallets")
export class Wallet extends BaseEntity{

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
    balance:number

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}