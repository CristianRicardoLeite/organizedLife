import { AccountBalance, ArrowForward } from '@mui/icons-material'
import { Box, Button, Card, CardContent, LinearProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../hooks/api'

const BudgetOverview = () => {
  const { budgets, loading, fetchBudgets, getSummary } = useBudget()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBudgets()
  }, [fetchBudgets])

  const summary = getSummary()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  // Get top 3 categories closest to budget limit
  const topCategories = [...budgets]
    .sort((a, b) => {
      const aPercentage = (a.spent / a.limit) * 100
      const bPercentage = (b.spent / b.limit) * 100
      return bPercentage - aPercentage
    })
    .slice(0, 3)

  if (loading || budgets.length === 0) {
    return null
  }

  return (
    <Card elevation={2}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AccountBalance sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" fontWeight={600}>
              Budget Overview
            </Typography>
          </Box>
          <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/budget')}>
            View All
          </Button>
        </Box>

        {/* Overall Budget Progress */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 1, backgroundColor: 'action.hover' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Overall Budget
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCurrency(summary.totalSpent)} / {formatCurrency(summary.totalBudget)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(summary.percentageUsed, 100)}
            color={(() => {
              if (summary.percentageUsed > 100) return 'error'
              if (summary.percentageUsed > 80) return 'warning'
              return 'success'
            })()}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {summary.percentageUsed.toFixed(1)}% used
            </Typography>
            <Typography
              variant="caption"
              fontWeight={600}
              color={summary.remaining >= 0 ? 'success.main' : 'error.main'}
            >
              {formatCurrency(Math.abs(summary.remaining))} {summary.remaining >= 0 ? 'remaining' : 'over'}
            </Typography>
          </Box>
        </Box>

        {/* Top Categories */}
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Top Categories
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {topCategories.map(budget => {
            const percentage = (budget.spent / budget.limit) * 100
            const isOverBudget = percentage > 100

            return (
              <Box key={budget.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                  <Box
                    sx={{
                      fontSize: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: `${budget.categoryColor}20`,
                    }}
                  >
                    {budget.categoryIcon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {budget.categoryName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(percentage, 100)}
                      color={(() => {
                        if (isOverBudget) return 'error'
                        if (percentage > 80) return 'warning'
                        return 'success'
                      })()}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Alert if over budget */}
        {summary.overBudgetCount > 0 && (
          <Box
            sx={{
              mt: 3,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: 'error.lighter',
              border: '1px solid',
              borderColor: 'error.light',
            }}
          >
            <Typography variant="caption" color="error.dark" fontWeight={600}>
              ⚠️ {summary.overBudgetCount} {summary.overBudgetCount === 1 ? 'category is' : 'categories are'} over budget
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default BudgetOverview
