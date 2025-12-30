import { useCallback, useState } from 'react'
import { AddContributionDto, CreateGoalDto, Goal, GoalContribution, GoalStatus, GoalSummary, GoalType, UpdateGoalDto } from '../../types'

/**
 * Mock hook for Goals management
 * This will be replaced with real API calls when backend is ready
 */
export const useGoals = () => {
  const [loading, setLoading] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([])
  const [contributions, setContributions] = useState<GoalContribution[]>([])

  // Mock initial goals data
  const mockGoals: Goal[] = [
    {
      id: 1,
      name: 'Emergency Fund',
      description: 'Build a 6-month emergency fund',
      type: GoalType.EmergencyFund,
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2026-12-31',
      status: GoalStatus.Active,
      icon: '🏥',
      color: '#FF6B6B',
      createdAt: new Date('2025-01-15').toISOString(),
    },
    {
      id: 2,
      name: 'Vacation Trip',
      description: 'Save for Europe trip',
      type: GoalType.Purchase,
      targetAmount: 5000,
      currentAmount: 3200,
      targetDate: '2026-07-01',
      status: GoalStatus.Active,
      icon: '✈️',
      color: '#4ECDC4',
      createdAt: new Date('2025-02-01').toISOString(),
    },
    {
      id: 3,
      name: 'Retirement Fund',
      description: 'Long-term retirement savings',
      type: GoalType.Retirement,
      targetAmount: 500000,
      currentAmount: 125000,
      targetDate: '2045-01-01',
      status: GoalStatus.Active,
      icon: '🏖️',
      color: '#95E1D3',
      createdAt: new Date('2024-01-01').toISOString(),
    },
    {
      id: 4,
      name: 'New Laptop',
      description: 'MacBook Pro for work',
      type: GoalType.Purchase,
      targetAmount: 2500,
      currentAmount: 2500,
      targetDate: '2025-11-01',
      status: GoalStatus.Completed,
      icon: '💻',
      color: '#A8E6CF',
      createdAt: new Date('2025-08-01').toISOString(),
    },
  ]

  // Fetch all goals
  const fetchGoals = useCallback(async (status?: GoalStatus) => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      let filteredGoals = mockGoals

      if (status) {
        filteredGoals = mockGoals.filter(g => g.status === status)
      }

      setGoals(filteredGoals)
    } catch (error) {
      console.error('Error fetching goals:', error)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Create a new goal
  const createGoal = useCallback(
    async (data: CreateGoalDto): Promise<Goal> => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Auto-assign icon and color based on type
        const getIconAndColor = (type: GoalType): { icon: string; color: string } => {
          const iconMap: Record<GoalType, { icon: string; color: string }> = {
            [GoalType.Savings]: { icon: '💰', color: '#FFD93D' },
            [GoalType.DebtPayment]: { icon: '💳', color: '#FF6B6B' },
            [GoalType.EmergencyFund]: { icon: '🏥', color: '#FF8787' },
            [GoalType.Retirement]: { icon: '🏖️', color: '#95E1D3' },
            [GoalType.Investment]: { icon: '📈', color: '#6BCB77' },
            [GoalType.Purchase]: { icon: '🛍️', color: '#4D96FF' },
            [GoalType.Other]: { icon: '🎯', color: '#9B59B6' },
          }
          return iconMap[type]
        }

        const { icon, color } = getIconAndColor(data.type)

        const newGoal: Goal = {
          id: Math.max(0, ...goals.map(g => g.id)) + 1,
          name: data.name,
          description: data.description,
          type: data.type,
          targetAmount: data.targetAmount,
          currentAmount: data.currentAmount || 0,
          targetDate: data.targetDate,
          status: GoalStatus.Active,
          icon,
          color,
          createdAt: new Date().toISOString(),
        }

        setGoals(prev => [...prev, newGoal])
        return newGoal
      } catch (error) {
        console.error('Error creating goal:', error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [goals],
  )

  // Update a goal
  const updateGoal = useCallback(
    async (data: UpdateGoalDto): Promise<Goal> => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        setGoals(prev =>
          prev.map(goal =>
            goal.id === data.id
              ? {
                ...goal,
                ...data,
                updatedAt: new Date().toISOString(),
              }
              : goal,
          ),
        )

        const updatedGoal = goals.find(g => g.id === data.id)
        if (!updatedGoal) {
          throw new Error('Goal not found')
        }

        return { ...updatedGoal, ...data }
      } catch (error) {
        console.error('Error updating goal:', error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [goals],
  )

  // Delete a goal
  const deleteGoal = useCallback(async (id: number): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      setGoals(prev => prev.filter(goal => goal.id !== id))
      setContributions(prev => prev.filter(c => c.goalId !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Add contribution to a goal
  const addContribution = useCallback(
    async (data: AddContributionDto): Promise<GoalContribution> => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const newContribution: GoalContribution = {
          id: Math.max(0, ...contributions.map(c => c.id)) + 1,
          goalId: data.goalId,
          amount: data.amount,
          date: data.date,
          note: data.note,
          createdAt: new Date().toISOString(),
        }

        setContributions(prev => [...prev, newContribution])

        // Update goal's current amount
        setGoals(prev =>
          prev.map(goal => {
            if (goal.id === data.goalId) {
              const newCurrentAmount = goal.currentAmount + data.amount

              // Check if goal is completed
              const newStatus = newCurrentAmount >= goal.targetAmount ? GoalStatus.Completed : goal.status

              return {
                ...goal,
                currentAmount: newCurrentAmount,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            }
            return goal
          }),
        )

        return newContribution
      } catch (error) {
        console.error('Error adding contribution:', error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [contributions],
  )

  // Get contributions for a specific goal
  const getGoalContributions = useCallback(
    (goalId: number): GoalContribution[] =>
      contributions.filter(c => c.goalId === goalId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [contributions],
  )

  // Get goals summary
  const getSummary = useCallback((): GoalSummary => {
    const activeGoals = goals.filter(g => g.status === GoalStatus.Active)
    const completedGoals = goals.filter(g => g.status === GoalStatus.Completed)
    const totalTargetAmount = activeGoals.reduce((sum, g) => sum + g.targetAmount, 0)
    const totalCurrentAmount = activeGoals.reduce((sum, g) => sum + g.currentAmount, 0)
    const totalRemaining = totalTargetAmount - totalCurrentAmount
    const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0

    return {
      totalGoals: goals.length,
      activeGoals: activeGoals.length,
      completedGoals: completedGoals.length,
      totalTargetAmount,
      totalCurrentAmount,
      totalRemaining,
      overallProgress,
    }
  }, [goals])

  // Calculate progress percentage
  const getProgress = useCallback((goal: Goal): number => {
    if (goal.targetAmount === 0) return 0
    return (goal.currentAmount / goal.targetAmount) * 100
  }, [])

  // Calculate remaining amount
  const getRemaining = useCallback((goal: Goal): number => Math.max(0, goal.targetAmount - goal.currentAmount), [])

  // Calculate days remaining
  const getDaysRemaining = useCallback((goal: Goal): number | null => {
    if (!goal.targetDate) return null
    const today = new Date()
    const target = new Date(goal.targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }, [])

  // Estimate monthly contribution needed
  const getMonthlyContributionNeeded = useCallback((goal: Goal): number | null => {
    if (!goal.targetDate) return null
    const daysRemaining = getDaysRemaining(goal)
    if (!daysRemaining || daysRemaining <= 0) return null

    const remaining = getRemaining(goal)
    const monthsRemaining = daysRemaining / 30
    return remaining / monthsRemaining
  }, [getDaysRemaining, getRemaining])

  return {
    goals,
    contributions,
    loading,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    getGoalContributions,
    getSummary,
    getProgress,
    getRemaining,
    getDaysRemaining,
    getMonthlyContributionNeeded,
  }
}
