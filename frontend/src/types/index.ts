export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export enum CategoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface User {
  id: number
  name: string
  email: string
  createdAt?: string
}

export interface Category {
  id: number
  name: string
  icon: string
  color: string
  type: CategoryType
  userId?: number
}

export interface Transaction {
  id: number
  amount: number
  description: string
  type: TransactionType
  date: string
  categoryId?: number
  categoryName?: string
  categoryIcon?: string
  categoryColor?: string
  createdAt?: string
}

export interface TransactionSummary {
  totalIncome: number
  totalExpense: number
  balance: number
  transactionCount: number
}

export interface CreateTransactionDto {
  amount: number
  description: string
  type: TransactionType
  date: string
  categoryId?: number
}

export interface UpdateTransactionDto extends CreateTransactionDto {
  id: number
}

export interface CreateCategoryDto {
  name: string
  color: string
  icon: string
  type: CategoryType
}

export interface UpdateCategoryDto extends CreateCategoryDto {
  id: number
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface AuthResponse {
  token: string
  user: User
}
