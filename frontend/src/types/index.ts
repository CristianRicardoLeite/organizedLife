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

// Budget Types
export interface BudgetItem {
  id: number
  categoryId: number
  categoryName: string
  categoryIcon?: string
  categoryColor?: string
  limit: number
  spent: number
  month: string // Format: "YYYY-MM"
  createdAt?: string
  updatedAt?: string
}

export interface BudgetSummary {
  totalBudget: number
  totalSpent: number
  remaining: number
  percentageUsed: number
  categoriesCount: number
  overBudgetCount: number
}

export interface CreateBudgetDto {
  categoryId: number
  limit: number
  month: string // Format: "YYYY-MM"
}

export interface UpdateBudgetDto {
  id: number
  limit: number
}

// Goal Types
export enum GoalType {
  Savings = 'Savings',
  DebtPayment = 'Debt Payment',
  EmergencyFund = 'Emergency Fund',
  Retirement = 'Retirement',
  Investment = 'Investment',
  Purchase = 'Purchase',
  Other = 'Other',
}

export enum GoalStatus {
  Active = 'Active',
  Completed = 'Completed',
  Paused = 'Paused',
  Cancelled = 'Cancelled',
}

export interface Goal {
  id: number
  name: string
  description?: string
  type: GoalType
  targetAmount: number
  currentAmount: number
  targetDate?: string
  status: GoalStatus
  icon?: string
  color?: string
  createdAt?: string
  updatedAt?: string
}

export interface GoalContribution {
  id: number
  goalId: number
  amount: number
  date: string
  note?: string
  createdAt?: string
}

export interface GoalSummary {
  totalGoals: number
  activeGoals: number
  completedGoals: number
  totalTargetAmount: number
  totalCurrentAmount: number
  totalRemaining: number
  overallProgress: number
}

export interface CreateGoalDto {
  name: string
  description?: string
  type: GoalType
  targetAmount: number
  currentAmount?: number
  targetDate?: string
}

export interface UpdateGoalDto {
  id: number
  name?: string
  description?: string
  type?: GoalType
  targetAmount?: number
  targetDate?: string
  status?: GoalStatus
}

export interface AddContributionDto {
  goalId: number
  amount: number
  date: string
  note?: string
}
