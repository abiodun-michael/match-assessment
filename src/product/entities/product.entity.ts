import { User } from "src/user/entities/user.entity"
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("products")
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

     @Index()
     @ManyToOne(() => User, (user)=>user.products)
     user: User

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}