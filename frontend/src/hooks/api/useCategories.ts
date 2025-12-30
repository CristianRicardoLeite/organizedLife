import { useCallback, useState } from 'react'
import { Category, CategoryType, CreateCategoryDto } from '../../types'

// Mock data
const mockCategories: Category[] = [
  { id: 1, name: 'Salary', color: '#4CAF50', icon: '💰', type: CategoryType.INCOME, userId: 1 },
  { id: 2, name: 'Freelance', color: '#2196F3', icon: '💼', type: CategoryType.INCOME, userId: 1 },
  { id: 3, name: 'Investments', color: '#00BCD4', icon: '📈', type: CategoryType.INCOME, userId: 1 },
  { id: 4, name: 'Housing', color: '#F44336', icon: '🏠', type: CategoryType.EXPENSE, userId: 1 },
  { id: 5, name: 'Food', color: '#FF9800', icon: '🛒', type: CategoryType.EXPENSE, userId: 1 },
  { id: 6, name: 'Utilities', color: '#9C27B0', icon: '⚡', type: CategoryType.EXPENSE, userId: 1 },
  { id: 7, name: 'Entertainment', color: '#E91E63', icon: '🎬', type: CategoryType.EXPENSE, userId: 1 },
  { id: 8, name: 'Transportation', color: '#607D8B', icon: '🚗', type: CategoryType.EXPENSE, userId: 1 },
  { id: 9, name: 'Healthcare', color: '#009688', icon: '🏥', type: CategoryType.EXPENSE, userId: 1 },
  { id: 10, name: 'Shopping', color: '#FF5722', icon: '🛍️', type: CategoryType.EXPENSE, userId: 1 },
]

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setError(null)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))

    setCategories(mockCategories)
    setLoading(false)
  }, [])

  const getCategory = useCallback(
    async (id: number): Promise<Category | null> => {
      setLoading(true)
      setError(null)

      await new Promise(resolve => setTimeout(resolve, 300))

      const category = categories.find(c => c.id === id) || null
      setLoading(false)
      return category
    },
    [categories],
  )

  const createCategory = useCallback(
    async (data: CreateCategoryDto): Promise<Category> => {
      setLoading(true)
      setError(null)

      await new Promise(resolve => setTimeout(resolve, 500))

      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...data,
        userId: 1,
      }

      setCategories(prev => [...prev, newCategory])
      setLoading(false)
      return newCategory
    },
    [categories],
  )

  const updateCategory = useCallback(async (id: number, data: CreateCategoryDto): Promise<Category> => {
    setLoading(true)
    setError(null)

    await new Promise(resolve => setTimeout(resolve, 500))

    const updatedCategory: Category = {
      id,
      ...data,
      userId: 1,
    }

    setCategories(prev => prev.map(c => (c.id === id ? updatedCategory : c)))
    setLoading(false)
    return updatedCategory
  }, [])

  const deleteCategory = useCallback(async (id: number): Promise<void> => {
    setLoading(true)
    setError(null)

    await new Promise(resolve => setTimeout(resolve, 500))

    setCategories(prev => prev.filter(c => c.id !== id))
    setLoading(false)
  }, [])

  const getCategoriesByType = useCallback((type: CategoryType): Category[] => categories.filter(c => c.type === type), [categories])

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByType,
  }
}
