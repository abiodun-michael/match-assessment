import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserRole } from "../interfaces"
import { Product } from "src/product/entities/product.entity"
import { Order } from "src/order/entities/order.entity"

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Index()
    @Column({
        type:'varchar',
        length:20,
        nullable:false
    })
    username:string

    @Column({
       type:'varchar',
       length:255,
       nullable:false
    })
    password:string


    @OneToMany(()=>Product,(product)=>product.user)
    products:Product[]


    @OneToMany(()=>Order,(order)=>order.user)
    order:Order[]

    @Index()
     @Column({
        type:'enum',
        nullable:false,
        enum:UserRole,
        default:UserRole.BUYER
     })
     role:UserRole

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}