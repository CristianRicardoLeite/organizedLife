import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CreateGoalDto, Goal, GoalType, UpdateGoalDto } from '../../types'

interface GoalDialogProps {
  open: boolean
  goal?: Goal
  onClose: () => void
  onSubmit: (data: CreateGoalDto | UpdateGoalDto) => Promise<void>
}

export const GoalDialog: React.FC<GoalDialogProps> = ({ open, goal, onClose, onSubmit }) => {
  const isEdit = !!goal

  const [formData, setFormData] = useState<CreateGoalDto>({
    name: '',
    description: '',
    type: GoalType.Savings,
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        description: goal.description || '',
        type: goal.type,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        targetDate: goal.targetDate || '',
      })
    } else {
      setFormData({
        name: '',
        description: '',
        type: GoalType.Savings,
        targetAmount: 0,
        currentAmount: 0,
        targetDate: '',
      })
    }
    setError(null)
  }, [goal, open])

  const handleChange = (field: keyof CreateGoalDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      setError('Goal name is required')
      return false
    }

    if (formData.targetAmount <= 0) {
      setError('Target amount must be greater than 0')
      return false
    }

    const currentAmount = formData.currentAmount || 0

    if (currentAmount < 0) {
      setError('Current amount cannot be negative')
      return false
    }

    if (currentAmount > formData.targetAmount) {
      setError('Current amount cannot exceed target amount')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      if (isEdit && goal) {
        await onSubmit({
          id: goal.id,
          ...formData,
        } as UpdateGoalDto)
      } else {
        await onSubmit(formData)
      }
      onClose()
    } catch (err) {
      setError('Failed to save goal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getButtonText = (): string => {
    if (loading) return 'Saving...'
    return isEdit ? 'Update' : 'Create'
  }

  const goalTypeLabels: Record<GoalType, string> = {
    [GoalType.Savings]: '💰 Savings',
    [GoalType.DebtPayment]: '💳 Debt Payment',
    [GoalType.EmergencyFund]: '🏥 Emergency Fund',
    [GoalType.Retirement]: '🏖️ Retirement',
    [GoalType.Investment]: '📈 Investment',
    [GoalType.Purchase]: '🛍️ Purchase',
    [GoalType.Other]: '🎯 Other',
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Goal' : 'Create New Goal'}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Goal Name"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          margin="normal"
          required
          placeholder="e.g., Emergency Fund, New Car"
        />

        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          placeholder="Optional: Add more details about your goal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Goal Type</InputLabel>
          <Select value={formData.type} onChange={e => handleChange('type', e.target.value)} label="Goal Type">
            {Object.entries(goalTypeLabels).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Target Amount"
          type="number"
          value={formData.targetAmount || ''}
          onChange={e => handleChange('targetAmount', parseFloat(e.target.value) || 0)}
          margin="normal"
          required
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          fullWidth
          label="Current Amount"
          type="number"
          value={formData.currentAmount || ''}
          onChange={e => handleChange('currentAmount', parseFloat(e.target.value) || 0)}
          margin="normal"
          inputProps={{ min: 0, step: 0.01 }}
          helperText="How much you've already saved"
        />

        <TextField
          fullWidth
          label="Target Date"
          type="date"
          value={formData.targetDate}
          onChange={e => handleChange('targetDate', e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          helperText="Optional: When do you want to achieve this goal?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {getButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
