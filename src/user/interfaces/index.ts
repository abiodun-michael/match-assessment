
export enum UserRole{
    BUYER='Buyer',
    SELLER='Seller'
}


export interface IUser{
    id:string
    username:string
    deposit:number
    role:string
    createdAt:Date
    updatedAt:Date
}

export interface UserInputData{
    username:string
    password:string
    role:UserRole
}