import React from 'react'
import { Box, Card, CardContent, Chip, IconButton, LinearProgress, Typography } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material'
import { Goal, GoalStatus } from '../../types'

interface GoalCardProps {
  goal: Goal
  progress: number
  remaining: number
  daysRemaining: number | null
  onEdit: (goal: Goal) => void
  onDelete: (id: number) => void
  onAddContribution: (goal: Goal) => void
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, progress, remaining, daysRemaining, onEdit, onDelete, onAddContribution }) => {
  const isCompleted = goal.status === GoalStatus.Completed
  const isActive = goal.status === GoalStatus.Active

  const getStatusColor = () => {
    switch (goal.status) {
      case GoalStatus.Completed:
        return 'success'
      case GoalStatus.Active:
        return 'primary'
      case GoalStatus.Paused:
        return 'warning'
      case GoalStatus.Cancelled:
        return 'error'
      default:
        return 'default'
    }
  }

  const getProgressColor = (): 'success' | 'warning' | 'error' | 'primary' => {
    if (isCompleted) return 'success'
    if (progress >= 75) return 'success'
    if (progress >= 50) return 'primary'
    if (progress >= 25) return 'warning'
    return 'error'
  }

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'No deadline'
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isCompleted ? '2px solid #4CAF50' : undefined,
        opacity: goal.status === GoalStatus.Cancelled ? 0.6 : 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Header with icon and status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="span">
              {goal.icon}
            </Typography>
            <Chip label={goal.status} color={getStatusColor()} size="small" />
          </Box>
          <Box>
            {isActive && (
              <IconButton size="small" onClick={() => onAddContribution(goal)} color="primary" title="Add contribution">
                <AddIcon />
              </IconButton>
            )}
            <IconButton size="small" onClick={() => onEdit(goal)} title="Edit">
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(goal.id)} color="error" title="Delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Goal name and description */}
        <Typography variant="h6" component="h3" gutterBottom>
          {goal.name}
        </Typography>
        {goal.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {goal.description}
          </Typography>
        )}

        {/* Progress bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {Math.min(progress, 100).toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={Math.min(progress, 100)} color={getProgressColor()} sx={{ height: 8, borderRadius: 1 }} />
        </Box>

        {/* Amounts */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Current
            </Typography>
            <Typography variant="body2" fontWeight="medium" color="primary">
              {formatCurrency(goal.currentAmount)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Target
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {formatCurrency(goal.targetAmount)}
            </Typography>
          </Box>
          {!isCompleted && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Remaining
              </Typography>
              <Typography variant="body2" fontWeight="medium" color="error">
                {formatCurrency(remaining)}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Target date and days remaining */}
        {goal.targetDate && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary">
              Target date: {formatDate(goal.targetDate)}
            </Typography>
            {daysRemaining !== null && !isCompleted && (
              <Typography variant="caption" color={daysRemaining < 30 ? 'error' : 'text.secondary'} fontWeight="medium">
                {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
