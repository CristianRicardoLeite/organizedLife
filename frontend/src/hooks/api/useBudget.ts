import { useCallback, useState } from 'react'
import { BudgetItem, BudgetSummary, CreateBudgetDto, UpdateBudgetDto } from '../../types'
import { useCategories } from './useCategories'
import { useTransactions } from './useTransactions'

/**
 * Mock hook for Budget management
 * This will be replaced with real API calls when backend is ready
 */
export const useBudget = () => {
  const [loading, setLoading] = useState(false)
  const [budgets, setBudgets] = useState<BudgetItem[]>([])
  const { categories } = useCategories()
  const { transactions } = useTransactions()

  // Get current month in YYYY-MM format
  const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  // Calculate spent amount for a category in a given month
  const calculateSpent = useCallback(
    (categoryId: number, month: string): number => {
      const [year, monthNum] = month.split('-').map(Number)

      return transactions
        .filter(t => {
          const transactionDate = new Date(t.date)
          const transactionYear = transactionDate.getFullYear()
          const transactionMonth = transactionDate.getMonth() + 1

          return (
            t.categoryId === categoryId &&
            t.type === 'Expense' &&
            transactionYear === year &&
            transactionMonth === monthNum
          )
        })
        .reduce((sum, t) => sum + t.amount, 0)
    },
    [transactions],
  )

  // Fetch budgets for current month
  const fetchBudgets = useCallback(
    async (month?: string) => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const targetMonth = month || getCurrentMonth()

        // Mock data: Create budget items with calculated spent amounts
        const mockBudgets: BudgetItem[] = [
          {
            id: 1,
            categoryId: 4,
            categoryName: 'Food',
            categoryIcon: '🍔',
            categoryColor: '#FF9800',
            limit: 600,
            spent: 0,
            month: targetMonth,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            categoryId: 5,
            categoryName: 'Transportation',
            categoryIcon: '🚗',
            categoryColor: '#2196F3',
            limit: 300,
            spent: 0,
            month: targetMonth,
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            categoryId: 6,
            categoryName: 'Entertainment',
            categoryIcon: '🎬',
            categoryColor: '#9C27B0',
            limit: 200,
            spent: 0,
            month: targetMonth,
            createdAt: new Date().toISOString(),
          },
          {
            id: 4,
            categoryId: 7,
            categoryName: 'Shopping',
            categoryIcon: '🛍️',
            categoryColor: '#E91E63',
            limit: 400,
            spent: 0,
            month: targetMonth,
            createdAt: new Date().toISOString(),
          },
          {
            id: 5,
            categoryId: 8,
            categoryName: 'Health',
            categoryIcon: '⚕️',
            categoryColor: '#00BCD4',
            limit: 300,
            spent: 0,
            month: targetMonth,
            createdAt: new Date().toISOString(),
          },
        ]

        // Calculate actual spent amounts from transactions
        const budgetsWithSpent = mockBudgets.map(budget => ({
          ...budget,
          spent: calculateSpent(budget.categoryId, targetMonth),
        }))

        setBudgets(budgetsWithSpent)
      } catch (error) {
        console.error('Error fetching budgets:', error)
      } finally {
        setLoading(false)
      }
    },
    [calculateSpent],
  )

  // Create a new budget
  const createBudget = useCallback(
    async (data: CreateBudgetDto): Promise<BudgetItem> => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const category = categories.find(c => c.id === data.categoryId)
        if (!category) {
          throw new Error('Category not found')
        }

        const newBudget: BudgetItem = {
          id: Math.max(0, ...budgets.map(b => b.id)) + 1,
          categoryId: data.categoryId,
          categoryName: category.name,
          categoryIcon: category.icon,
          categoryColor: category.color,
          limit: data.limit,
          spent: calculateSpent(data.categoryId, data.month),
          month: data.month,
          createdAt: new Date().toISOString(),
        }

        setBudgets(prev => [...prev, newBudget])
        return newBudget
      } catch (error) {
        console.error('Error creating budget:', error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [budgets, categories, calculateSpent],
  )

  // Update a budget
  const updateBudget = useCallback(
    async (data: UpdateBudgetDto): Promise<BudgetItem> => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        setBudgets(prev =>
          prev.map(budget =>
            budget.id === data.id
              ? {
                ...budget,
                limit: data.limit,
                updatedAt: new Date().toISOString(),
              }
              : budget,
          ),
        )

        const updatedBudget = budgets.find(b => b.id === data.id)
        if (!updatedBudget) {
          throw new Error('Budget not found')
        }

        return { ...updatedBudget, limit: data.limit }
      } catch (error) {
        console.error('Error updating budget:', error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [budgets],
  )

  // Delete a budget
  const deleteBudget = useCallback(async (id: number): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      setBudgets(prev => prev.filter(budget => budget.id !== id))
    } catch (error) {
      console.error('Error deleting budget:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Get budget summary
  const getSummary = useCallback((): BudgetSummary => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
    const remaining = totalBudget - totalSpent
    const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
    const overBudgetCount = budgets.filter(b => b.spent > b.limit).length

    return {
      totalBudget,
      totalSpent,
      remaining,
      percentageUsed,
      categoriesCount: budgets.length,
      overBudgetCount,
    }
  }, [budgets])

  // Get budget for a specific category
  const getBudgetByCategory = useCallback(
    (categoryId: number, month?: string): BudgetItem | undefined => {
      const targetMonth = month || getCurrentMonth()
      return budgets.find(b => b.categoryId === categoryId && b.month === targetMonth)
    },
    [budgets],
  )

  // Check if category is over budget
  const isOverBudget = useCallback(
    (categoryId: number, month?: string): boolean => {
      const budget = getBudgetByCategory(categoryId, month)
      return budget ? budget.spent > budget.limit : false
    },
    [getBudgetByCategory],
  )

  // Get budget progress percentage
  const getBudgetProgress = useCallback(
    (categoryId: number, month?: string): number => {
      const budget = getBudgetByCategory(categoryId, month)
      if (!budget || budget.limit === 0) return 0
      return (budget.spent / budget.limit) * 100
    },
    [getBudgetByCategory],
  )

  return {
    budgets,
    loading,
    fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    getSummary,
    getBudgetByCategory,
    isOverBudget,
    getBudgetProgress,
  }
}
