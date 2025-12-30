import { Assessment as AssessmentIcon, TrendingDown, TrendingUp } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReports } from '../../hooks/api/useReports'
import { ReportSummary } from '../../types'

export const ReportsOverview: React.FC = () => {
  const navigate = useNavigate()
  const { getQuickSummary } = useReports()
  const [summary, setSummary] = useState<ReportSummary | null>(null)

  useEffect(() => {
    const data = getQuickSummary()
    setSummary(data)
  }, [getQuickSummary])

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  if (!summary) {
    return (
      <Card>
        <CardHeader
          avatar={<AssessmentIcon color="primary" />}
          title="Reports & Analytics"
          action={
            <Button size="small" onClick={() => navigate('/reports')}>
              View Reports
            </Button>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No transaction data available for the last 30 days
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const isPositiveBalance = summary.netBalance >= 0
  const isSavingWell = summary.savingsRate >= 20

  return (
    <Card>
      <CardHeader
        avatar={<AssessmentIcon color="primary" />}
        title="Reports & Analytics"
        subheader="Last 30 days"
        action={
          <Button size="small" onClick={() => navigate('/reports')}>
            View Full Report
          </Button>
        }
      />
      <CardContent>
        {/* Quick Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Total Income
            </Typography>
            <Typography variant="h6" color="success.main">
              {formatCurrency(summary.totalIncome)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Total Expense
            </Typography>
            <Typography variant="h6" color="error.main">
              {formatCurrency(summary.totalExpense)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Net Balance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="h6" color={isPositiveBalance ? 'success.main' : 'error.main'}>
                {formatCurrency(summary.netBalance)}
              </Typography>
              {isPositiveBalance && <TrendingUp fontSize="small" color="success" />}
              {!isPositiveBalance && <TrendingDown fontSize="small" color="error" />}
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Savings Rate
            </Typography>
            <Typography variant="h6" color={isSavingWell ? 'success.main' : 'warning.main'}>
              {summary.savingsRate.toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        {/* Top Categories */}
        {(summary.topIncomeCategory || summary.topExpenseCategory) && (
          <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Top Categories
            </Typography>
            {summary.topIncomeCategory && (
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {summary.topIncomeCategory.categoryIcon} {summary.topIncomeCategory.categoryName}
                  </Typography>
                  <Typography variant="caption" color="success.main" fontWeight="medium">
                    {formatCurrency(summary.topIncomeCategory.totalAmount)}
                  </Typography>
                </Box>
              </Box>
            )}
            {summary.topExpenseCategory && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {summary.topExpenseCategory.categoryIcon} {summary.topExpenseCategory.categoryName}
                  </Typography>
                  <Typography variant="caption" color="error.main" fontWeight="medium">
                    {formatCurrency(summary.topExpenseCategory.totalAmount)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Insights */}
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            💡 Insight:{' '}
            {isSavingWell
              ? 'Great job! Your savings rate is healthy. Keep it up!'
              : 'Try to reduce expenses or increase income to improve your savings rate (target: 20%+).'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
