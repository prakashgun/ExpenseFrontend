export default interface AccountInterface {
    id: string,
    name: string,
    initial_balance: number,
    note?: string,
    total_expense?: number,
    total_income?: number,
    created?: Date
}