export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Category {
  id: number
  name: string
  icon: string
  color: string
  type: TransactionType
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
}

export interface CreateTransactionDto {
  amount: number
  description: string
  type: TransactionType
  date: string
  categoryId?: number
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
  token: string
  user: User
}
