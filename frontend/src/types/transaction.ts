export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: number,
  description: string,
  amount: number,
  type: TransactionType,
  date: string,
  categoryId: number,
  categoryName: string,
  categoryColor: string,
  categoryIcon: string,
  createdAt: string,
}

export interface TransactionSummary {
  totalIncome: number,
  totalExpense: number,
  balance: number,
  transactionCount: number,
}

export interface CreateTransactionDTO {
  description: string,
  amount: number,
  type: TransactionType,
  date: string,
  categoryId: number,
}

export interface UpdateTransactionDTO extends CreateTransactionDTO {
  id: number,
}
