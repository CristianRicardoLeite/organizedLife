import { Add as AddIcon, Flag as FlagIcon } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, LinearProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoals } from '../../hooks/api/useGoals'
import { GoalStatus } from '../../types'

export const GoalsOverview: React.FC = () => {
  const navigate = useNavigate()
  const { goals, fetchGoals, getSummary, getProgress } = useGoals()

  useEffect(() => {
    fetchGoals(GoalStatus.Active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const summary = getSummary()
  const activeGoals = goals.filter(g => g.status === GoalStatus.Active)
  const topGoals = activeGoals.sort((a, b) => getProgress(b) - getProgress(a)).slice(0, 3)

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const getProgressColor = (progress: number): 'success' | 'warning' | 'error' | 'primary' => {
    if (progress >= 75) return 'success'
    if (progress >= 50) return 'primary'
    if (progress >= 25) return 'warning'
    return 'error'
  }

  return (
    <Card>
      <CardHeader
        avatar={<FlagIcon color="primary" />}
        title="Financial Goals"
        action={
          <Button size="small" startIcon={<AddIcon />} onClick={() => navigate('/goals')}>
            View All
          </Button>
        }
      />
      <CardContent>
        {/* Summary */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Overall Progress
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {summary.overallProgress.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={Math.min(summary.overallProgress, 100)} sx={{ height: 8, borderRadius: 1, mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {formatCurrency(summary.totalCurrentAmount)} of {formatCurrency(summary.totalTargetAmount)}
          </Typography>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{summary.totalGoals}</Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              {summary.activeGoals}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Active
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              {summary.completedGoals}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Done
            </Typography>
          </Box>
        </Box>

        {/* Top Goals */}
        {topGoals.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Top Active Goals
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {topGoals.map(goal => {
                const progress = getProgress(goal)
                return (
                  <Box key={goal.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        {goal.icon} {goal.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {progress.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progress, 100)}
                      color={getProgressColor(progress)}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </>
        )}

        {topGoals.length === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No active goals yet. Start by creating your first goal!
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
