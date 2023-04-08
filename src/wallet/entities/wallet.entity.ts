import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "src/user/entities/user.entity"

@Entity()
export class Wallet extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

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