export const transactionTypes: TransactionTypeInterface[] = [
    {
        name: 'Expense',
        icon_name: 'money-off',
        icon_type: 'material-icons'
    },    
    {
        name: 'Income',
        icon_name: 'attach-money',
        icon_type: 'material-icons'
    }
]

export default interface TransactionTypeInterface {
    name: string,
    icon_name: string,
    icon_type: string
}