import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AddContributionDto, Goal } from '../../types'

interface ContributionDialogProps {
  open: boolean
  goal?: Goal
  onClose: () => void
  onSubmit: (data: AddContributionDto) => Promise<void>
}

export const ContributionDialog: React.FC<ContributionDialogProps> = ({ open, goal, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AddContributionDto>({
    goalId: 0,
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    note: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (goal) {
      setFormData({
        goalId: goal.id,
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        note: '',
      })
    }
    setError(null)
  }, [goal, open])

  const handleChange = (field: keyof AddContributionDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const validate = (): boolean => {
    if (!formData.amount || formData.amount <= 0) {
      setError('Contribution amount must be greater than 0')
      return false
    }

    if (!formData.date) {
      setError('Date is required')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError('Failed to add contribution. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  if (!goal) return null

  const remaining = goal.targetAmount - goal.currentAmount

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Contribution to {goal.name}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Current: {formatCurrency(goal.currentAmount)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Target: {formatCurrency(goal.targetAmount)}
          </Typography>
          <Typography variant="body2" color="error" fontWeight="medium">
            Remaining: {formatCurrency(remaining)}
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Contribution Amount"
          type="number"
          value={formData.amount || ''}
          onChange={e => handleChange('amount', parseFloat(e.target.value) || 0)}
          margin="normal"
          required
          inputProps={{ min: 0, step: 0.01 }}
          autoFocus
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          value={formData.date}
          onChange={e => handleChange('date', e.target.value)}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Note"
          value={formData.note}
          onChange={e => handleChange('note', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          placeholder="Optional: Add a note about this contribution"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Adding...' : 'Add Contribution'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
