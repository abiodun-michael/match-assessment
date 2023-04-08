import { User } from "src/user/entities/user.entity"
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        default:0
    })
    amountAvailable:number

    @Column({
       default:0
    })
    cost:number

    @Column({
        type:'varchar',
        nullable:false
     })
     productName:string

     @OneToOne(() => User)
     @JoinColumn()
     user: User

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}