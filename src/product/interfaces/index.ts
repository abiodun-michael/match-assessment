import { IUser } from "src/user/interfaces"


export interface IProduct{
    productName:string
    id:string
    cost:number
    amountAvailable:number
    userId:string,
    createdAt:Date
    updatedAt:Date
}