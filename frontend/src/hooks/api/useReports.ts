import { useCallback, useState } from 'react'
import { CategoryReportData, DateRange, GenerateReportDto, MonthlyData, Report, ReportPeriod, ReportSummary, ReportType } from '../../types'
import { useTransactions } from './useTransactions'
import { useCategories } from './useCategories'

/**
 * Mock hook for Reports & Analytics
 * Generates reports based on transaction data
 */
export const useReports = () => {
  const [loading, setLoading] = useState(false)
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  
  const { transactions } = useTransactions()
  const { categories } = useCategories()

  // Helper to get date range based on period
  const getDateRangeForPeriod = useCallback((period: ReportPeriod): DateRange => {
    const today = new Date()
    const startDate = new Date()
    
    switch (period) {
      case ReportPeriod.Monthly:
        startDate.setMonth(today.getMonth() - 1)
        break
      case ReportPeriod.Quarterly:
        startDate.setMonth(today.getMonth() - 3)
        break
      case ReportPeriod.Yearly:
        startDate.setFullYear(today.getFullYear() - 1)
        break
      default:
        startDate.setMonth(today.getMonth() - 1)
    }
    
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    }
  }, [])

  // Filter transactions by date range
  const filterTransactionsByDateRange = useCallback(
    (dateRange: DateRange) =>
      transactions.filter(t => {
        const transactionDate = new Date(t.date)
        const start = new Date(dateRange.startDate)
        const end = new Date(dateRange.endDate)
        return transactionDate >= start && transactionDate <= end
      }),
    [transactions],
  )

  // Calculate category breakdown
  const calculateCategoryBreakdown = useCallback((filteredTransactions: typeof transactions, isIncome: boolean) => {
    const categoryMap = new Map<number, CategoryReportData>()
    const total = filteredTransactions
      .filter(t => isIncome ? t.type === 'Income' : t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0)

    filteredTransactions
      .filter(t => isIncome ? t.type === 'Income' : t.type === 'Expense')
      .forEach(t => {
        if (!t.categoryId) return
        
        const existing = categoryMap.get(t.categoryId)
        if (existing) {
          existing.totalAmount += t.amount
          existing.transactionCount += 1
        } else {
          const category = categories.find(c => c.id === t.categoryId)
          categoryMap.set(t.categoryId, {
            categoryId: t.categoryId,
            categoryName: t.categoryName || category?.name || 'Unknown',
            categoryIcon: t.categoryIcon || category?.icon,
            categoryColor: t.categoryColor || category?.color,
            totalAmount: t.amount,
            transactionCount: 1,
            percentage: 0,
          })
        }
      })

    // Calculate percentages
    const result = Array.from(categoryMap.values()).map(cat => ({
      ...cat,
      percentage: total > 0 ? (cat.totalAmount / total) * 100 : 0,
    }))

    return result.sort((a, b) => b.totalAmount - a.totalAmount)
  }, [categories])

  // Generate monthly data for trends
  const generateMonthlyData = useCallback((filteredTransactions: typeof transactions): MonthlyData[] => {
    const monthlyMap = new Map<string, MonthlyData>()
    
    filteredTransactions.forEach(t => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      const existing = monthlyMap.get(monthKey)
      if (existing) {
        if (t.type === 'Income') {
          existing.income += t.amount
        } else {
          existing.expense += t.amount
        }
        existing.balance = existing.income - existing.expense
      } else {
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        monthlyMap.set(monthKey, {
          month: monthName,
          income: t.type === 'Income' ? t.amount : 0,
          expense: t.type === 'Expense' ? t.amount : 0,
          balance: t.type === 'Income' ? t.amount : -t.amount,
        })
      }
    })

    return Array.from(monthlyMap.values()).sort((a, b) => {
      const dateA = new Date(a.month)
      const dateB = new Date(b.month)
      return dateA.getTime() - dateB.getTime()
    })
  }, [])

  // Generate report
  const generateReport = useCallback(async (dto: GenerateReportDto): Promise<Report> => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const dateRange = dto.dateRange || getDateRangeForPeriod(dto.period)
      const filteredTransactions = filterTransactionsByDateRange(dateRange)

      // Calculate totals
      const totalIncome = filteredTransactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const totalExpense = filteredTransactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const netBalance = totalIncome - totalExpense

      // Calculate days in period
      const startDate = new Date(dateRange.startDate)
      const endDate = new Date(dateRange.endDate)
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1

      // Category breakdowns
      const incomeByCategory = calculateCategoryBreakdown(filteredTransactions, true)
      const expenseByCategory = calculateCategoryBreakdown(filteredTransactions, false)

      // Monthly data
      const monthlyData = generateMonthlyData(filteredTransactions)

      // Savings rate
      const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

      const summary: ReportSummary = {
        period: dto.period,
        dateRange,
        totalIncome,
        totalExpense,
        netBalance,
        avgDailyIncome: totalIncome / daysDiff,
        avgDailyExpense: totalExpense / daysDiff,
        transactionCount: filteredTransactions.length,
        topIncomeCategory: incomeByCategory[0],
        topExpenseCategory: expenseByCategory[0],
        savingsRate,
      }

      const report: Report = {
        id: Date.now(),
        type: ReportType.IncomeVsExpense,
        period: dto.period,
        dateRange,
        summary,
        incomeByCategory,
        expenseByCategory,
        monthlyData,
        generatedAt: new Date().toISOString(),
      }

      setCurrentReport(report)
      return report
    } catch (error) {
      console.error('Error generating report:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [getDateRangeForPeriod, filterTransactionsByDateRange, calculateCategoryBreakdown, generateMonthlyData])

  // Export report (mock)
  const exportReport = useCallback(async (format: 'pdf' | 'csv' | 'excel'): Promise<void> => {
    if (!currentReport) {
      throw new Error('No report to export')
    }

    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, this would trigger a download
    console.log(`Exporting report as ${format}...`)
    console.log('Report data:', currentReport)

    // Mock success message
    alert(`Report exported successfully as ${format.toUpperCase()}!`)
  }, [currentReport])

  // Get quick summary for dashboard
  const getQuickSummary = useCallback((): ReportSummary | null => {
    const dateRange = getDateRangeForPeriod(ReportPeriod.Monthly)
    const filteredTransactions = filterTransactionsByDateRange(dateRange)

    if (filteredTransactions.length === 0) return null

    const totalIncome = filteredTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const netBalance = totalIncome - totalExpense
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

    const incomeByCategory = calculateCategoryBreakdown(filteredTransactions, true)
    const expenseByCategory = calculateCategoryBreakdown(filteredTransactions, false)

    return {
      period: ReportPeriod.Monthly,
      dateRange,
      totalIncome,
      totalExpense,
      netBalance,
      avgDailyIncome: totalIncome / 30,
      avgDailyExpense: totalExpense / 30,
      transactionCount: filteredTransactions.length,
      topIncomeCategory: incomeByCategory[0],
      topExpenseCategory: expenseByCategory[0],
      savingsRate,
    }
  }, [getDateRangeForPeriod, filterTransactionsByDateRange, calculateCategoryBreakdown])

  return {
    loading,
    currentReport,
    generateReport,
    exportReport,
    getQuickSummary,
    getDateRangeForPeriod,
  }
}
