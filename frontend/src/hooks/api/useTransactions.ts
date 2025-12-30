import { useState, useCallback } from 'react'
import { Transaction, TransactionSummary, CreateTransactionDto, TransactionType } from '../../types'

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Salary',
    amount: 5000,
    type: TransactionType.Income,
    date: '2025-12-01',
    categoryId: 1,
    categoryName: 'Salary',
    categoryColor: '#4CAF50',
    categoryIcon: '💰',
    createdAt: '2025-12-01T10:00:00Z',
  },
  {
    id: 2,
    description: 'Freelance Project',
    amount: 1500,
    type: TransactionType.Income,
    date: '2025-12-15',
    categoryId: 2,
    categoryName: 'Freelance',
    categoryColor: '#2196F3',
    categoryIcon: '💼',
    createdAt: '2025-12-15T14:30:00Z',
  },
  {
    id: 3,
    description: 'Rent Payment',
    amount: 1200,
    type: TransactionType.Expense,
    date: '2025-12-05',
    categoryId: 3,
    categoryName: 'Housing',
    categoryColor: '#F44336',
    categoryIcon: '🏠',
    createdAt: '2025-12-05T09:00:00Z',
  },
  {
    id: 4,
    description: 'Grocery Shopping',
    amount: 350,
    type: TransactionType.Expense,
    date: '2025-12-10',
    categoryId: 4,
    categoryName: 'Food',
    categoryColor: '#FF9800',
    categoryIcon: '🛒',
    createdAt: '2025-12-10T16:20:00Z',
  },
  {
    id: 5,
    description: 'Electric Bill',
    amount: 150,
    type: TransactionType.Expense,
    date: '2025-12-12',
    categoryId: 5,
    categoryName: 'Utilities',
    categoryColor: '#9C27B0',
    categoryIcon: '⚡',
    createdAt: '2025-12-12T11:00:00Z',
  },
  {
    id: 6,
    description: 'Netflix Subscription',
    amount: 29.99,
    type: TransactionType.Expense,
    date: '2025-12-20',
    categoryId: 6,
    categoryName: 'Entertainment',
    categoryColor: '#E91E63',
    categoryIcon: '🎬',
    createdAt: '2025-12-20T08:00:00Z',
  },
  {
    id: 7,
    description: 'Gas Station',
    amount: 80,
    type: TransactionType.Expense,
    date: '2025-12-22',
    categoryId: 7,
    categoryName: 'Transportation',
    categoryColor: '#607D8B',
    categoryIcon: '🚗',
    createdAt: '2025-12-22T17:45:00Z',
  },
  {
    id: 8,
    description: 'Restaurant Dinner',
    amount: 120,
    type: TransactionType.Expense,
    date: '2025-12-25',
    categoryId: 4,
    categoryName: 'Food',
    categoryColor: '#FF9800',
    categoryIcon: '🛒',
    createdAt: '2025-12-25T20:00:00Z',
  },
]

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setTransactions(mockTransactions)
    setLoading(false)
  }, [])

  const getTransaction = useCallback(async (id: number): Promise<Transaction | null> => {
    setLoading(true)
    setError(null)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const transaction = transactions.find(t => t.id === id) || null
    setLoading(false)
    return transaction
  }, [transactions])

  const createTransaction = useCallback(async (data: CreateTransactionDto): Promise<Transaction> => {
    setLoading(true)
    setError(null)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newTransaction: Transaction = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      ...data,
      categoryName: 'New Category',
      categoryColor: '#9E9E9E',
      categoryIcon: '📌',
      createdAt: new Date().toISOString(),
    }
    
    setTransactions(prev => [newTransaction, ...prev])
    setLoading(false)
    return newTransaction
  }, [transactions])

  const updateTransaction = useCallback(async (id: number, data: CreateTransactionDto): Promise<Transaction> => {
    setLoading(true)
    setError(null)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedTransaction: Transaction = {
      id,
      ...data,
      categoryName: 'Updated Category',
      categoryColor: '#9E9E9E',
      categoryIcon: '📌',
      createdAt: new Date().toISOString(),
    }
    
    setTransactions(prev => prev.map(t => t.id === id ? updatedTransaction : t))
    setLoading(false)
    return updatedTransaction
  }, [])

  const deleteTransaction = useCallback(async (id: number): Promise<void> => {
    setLoading(true)
    setError(null)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setTransactions(prev => prev.filter(t => t.id !== id))
    setLoading(false)
  }, [])

  const getSummary = useCallback((): TransactionSummary => {
    const totalIncome = transactions
      .filter(t => t.type === TransactionType.Income)
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpense = transactions
      .filter(t => t.type === TransactionType.Expense)
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: transactions.length,
    }
  }, [transactions])

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary,
  }
}
