import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserRole } from "../interfaces"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

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