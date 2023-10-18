import AccountInterface from "./AccountInterface"
import CategoryInterface from "./CategoryInterface"


export default interface TransactionInterface {
    id: string,
    name: string,
    value: number,
    type: string,
    is_income: boolean,
    account: AccountInterface,
    category: CategoryInterface,
    transaction_date: Date,
    created?: Date
}