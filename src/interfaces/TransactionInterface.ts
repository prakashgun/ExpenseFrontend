import AccountInterface from "./AccountInterface"
import CategoryInterface from "./CategoryInterface"


export default interface TransactionInterface {
    id: string,
    name: string,
    value: number,
    is_income: boolean,
    account_id: string,
    category_id: string,
    transaction_date: Date,
    from_transaction?: TransactionInterface,
    to_transaction?: TransactionInterface,
    created?: Date
}