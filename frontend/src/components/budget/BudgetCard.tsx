import { DeleteOutline, EditOutlined, TrendingDown, TrendingUp, WarningAmber } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import { BudgetItem } from '../../types'

interface BudgetCardProps {
  budget: BudgetItem
  onEdit?: (budget: BudgetItem) => void
  onDelete?: (id: number) => void
}

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  const { categoryName, categoryIcon, categoryColor, limit, spent } = budget

  // Calculate progress
  const percentage = limit > 0 ? (spent / limit) * 100 : 0
  const remaining = limit - spent
  const isOverBudget = spent > limit
  const isWarning = percentage >= 80 && !isOverBudget

  // Determine color based on status
  const getProgressColor = () => {
    if (isOverBudget) return 'error'
    if (isWarning) return 'warning'
    return 'success'
  }

  // Format currency
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                fontSize: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: `${categoryColor}20`,
              }}
            >
              {categoryIcon}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {categoryName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Monthly Budget
              </Typography>
            </Box>
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {onEdit && (
              <Tooltip title="Edit Budget">
                <IconButton size="small" onClick={() => onEdit(budget)} sx={{ color: 'primary.main' }}>
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Delete Budget">
                <IconButton size="small" onClick={() => onDelete(budget.id)} sx={{ color: 'error.main' }}>
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Budget Status */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Spent: {formatCurrency(spent)}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Limit: {formatCurrency(limit)}
            </Typography>
          </Box>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={Math.min(percentage, 100)}
            color={getProgressColor()}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'action.hover',
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {percentage.toFixed(1)}% used
            </Typography>
            {isOverBudget && (
              <Chip
                icon={<WarningAmber />}
                label={`Over by ${formatCurrency(Math.abs(remaining))}`}
                size="small"
                color="error"
                variant="outlined"
              />
            )}
            {isWarning && !isOverBudget && (
              <Chip icon={<TrendingUp />} label="Near Limit" size="small" color="warning" variant="outlined" />
            )}
            {!isOverBudget && !isWarning && (
              <Chip
                icon={<TrendingDown />}
                label={`${formatCurrency(remaining)} left`}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        {/* Status Message */}
        {isOverBudget && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: 'error.lighter',
              border: '1px solid',
              borderColor: 'error.light',
            }}
          >
            <Typography variant="caption" color="error.dark" fontWeight={600}>
              ⚠️ You&apos;ve exceeded your budget for this category
            </Typography>
          </Box>
        )}

        {isWarning && !isOverBudget && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: 'warning.lighter',
              border: '1px solid',
              borderColor: 'warning.light',
            }}
          >
            <Typography variant="caption" color="warning.dark" fontWeight={600}>
              💡 You&apos;re close to your budget limit
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default BudgetCard
