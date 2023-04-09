import { Product } from "src/product/entities/product.entity"
import { User } from "src/user/entities/user.entity"
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Order extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    totalBought:number

    @Column()
    amountPaid:number

    @Index()
    @ManyToOne(() => User, (user)=>user.products)
    @JoinTable()
    user: User

    @ManyToOne(() => Product, (product)=>product.order)
    @JoinTable()
    product: Product

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}