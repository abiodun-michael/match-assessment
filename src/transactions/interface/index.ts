

export enum TransactionType{
    DEPOSIT="Deposit",
    DEBIT='Debit'
}


export interface TransactionData{
    user:string
    amount:number
    type:TransactionType
}