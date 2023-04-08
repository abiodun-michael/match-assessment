import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Session extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'uuid',
        nullable:false
    })
    user:string

    @Column({
        nullable:false
    })
    sessionId:string


    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}