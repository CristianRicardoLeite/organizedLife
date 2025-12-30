import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/api'
import { BudgetItem, CategoryType, CreateBudgetDto } from '../../types'

interface BudgetDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: CreateBudgetDto) => Promise<void>
  editBudget?: BudgetItem | null
  currentMonth: string
}

const BudgetDialog = ({ open, onClose, onSave, editBudget, currentMonth }: BudgetDialogProps) => {
  const { categories } = useCategories()
  const [formData, setFormData] = useState({
    categoryId: 0,
    limit: '',
    month: currentMonth,
  })
  const [errors, setErrors] = useState({
    categoryId: '',
    limit: '',
  })
  const [loading, setLoading] = useState(false)

  // Filter only expense categories
  const expenseCategories = categories.filter(c => c.type === CategoryType.EXPENSE)

  useEffect(() => {
    if (editBudget) {
      setFormData({
        categoryId: editBudget.categoryId,
        limit: editBudget.limit.toString(),
        month: editBudget.month,
      })
    } else {
      setFormData({
        categoryId: 0,
        limit: '',
        month: currentMonth,
      })
    }
    setErrors({ categoryId: '', limit: '' })
  }, [editBudget, currentMonth, open])

  const validate = (): boolean => {
    const newErrors = {
      categoryId: '',
      limit: '',
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      newErrors.categoryId = 'Please select a category'
    }

    if (!formData.limit || parseFloat(formData.limit) <= 0) {
      newErrors.limit = 'Please enter a valid amount'
    }

    setErrors(newErrors)
    return !newErrors.categoryId && !newErrors.limit
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      await onSave({
        categoryId: formData.categoryId,
        limit: parseFloat(formData.limit),
        month: formData.month,
      })
      handleClose()
    } catch (error) {
      console.error('Error saving budget:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ categoryId: 0, limit: '', month: currentMonth })
    setErrors({ categoryId: '', limit: '' })
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600}>
          {editBudget ? 'Edit Budget' : 'Create Budget'}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Category Select */}
          <FormControl fullWidth error={!!errors.categoryId}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={formData.categoryId}
              label="Category"
              onChange={e => setFormData(prev => ({ ...prev, categoryId: e.target.value as number }))}
              disabled={!!editBudget}
            >
              <MenuItem value={0} disabled>
                Select a category
              </MenuItem>
              {expenseCategories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        fontSize: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: `${category.color}20`,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography>{category.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {errors.categoryId}
              </Typography>
            )}
          </FormControl>

          {/* Budget Limit */}
          <TextField
            fullWidth
            label="Monthly Budget Limit"
            type="number"
            value={formData.limit}
            onChange={e => setFormData(prev => ({ ...prev, limit: e.target.value }))}
            error={!!errors.limit}
            helperText={errors.limit || 'Set the maximum amount you want to spend in this category'}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            inputProps={{
              min: 0,
              step: 0.01,
            }}
          />

          {/* Month Display */}
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              backgroundColor: 'primary.lighter',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <Typography variant="caption" color="primary.dark" fontWeight={600}>
              📅 Budget for:{' '}
              {new Date(formData.month + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading && 'Saving...'}
          {!loading && editBudget && 'Update'}
          {!loading && !editBudget && 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BudgetDialog
