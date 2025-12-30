import { Add, CalendarToday, TrendingDown, TrendingUp, Wallet } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CircularProgress, Fab, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BudgetCard, BudgetDialog } from '../components/budget'
import AppLayout from '../components/layout/AppLayout'
import { useBudget, useCategories } from '../hooks/api'
import { BudgetItem, CreateBudgetDto, UpdateBudgetDto } from '../types'

const Budget = () => {
  const { budgets, loading, fetchBudgets, createBudget, updateBudget, deleteBudget, getSummary } = useBudget()
  const { fetchCategories } = useCategories()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<BudgetItem | null>(null)
  const [currentMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  useEffect(() => {
    fetchBudgets(currentMonth)
    fetchCategories()
  }, [fetchBudgets, fetchCategories, currentMonth])

  const summary = getSummary()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  const handleCreateBudget = () => {
    setEditingBudget(null)
    setDialogOpen(true)
  }

  const handleEditBudget = (budget: BudgetItem) => {
    setEditingBudget(budget)
    setDialogOpen(true)
  }

  const handleDeleteBudget = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id)
    }
  }

  const handleSaveBudget = async (data: CreateBudgetDto) => {
    if (editingBudget) {
      const updateData: UpdateBudgetDto = {
        id: editingBudget.id,
        limit: data.limit,
      }
      await updateBudget(updateData)
    } else {
      await createBudget(data)
    }
  }

  if (loading && budgets.length === 0) {
    return (
      <AppLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Monthly Budget
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <CalendarToday fontSize="small" />
            <Typography variant="body1">
              {new Date(currentMonth + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 3,
            mb: 4,
          }}
        >
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'primary.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Wallet sx={{ color: 'primary.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Budget
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {formatCurrency(summary.totalBudget)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'error.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingDown sx={{ color: 'error.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {formatCurrency(summary.totalSpent)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: summary.remaining >= 0 ? 'success.lighter' : 'error.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp sx={{ color: summary.remaining >= 0 ? 'success.main' : 'error.main', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Remaining
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color={summary.remaining >= 0 ? 'success.main' : 'error.main'}>
                    {formatCurrency(summary.remaining)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'info.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    {summary.percentageUsed.toFixed(0)}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Budget Used
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {summary.categoriesCount} categories
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Over Budget Alert */}
        {summary.overBudgetCount > 0 && (
          <Card
            elevation={2}
            sx={{
              mb: 4,
              backgroundColor: 'error.lighter',
              border: '2px solid',
              borderColor: 'error.light',
            }}
          >
            <CardContent>
              <Typography variant="body1" color="error.dark" fontWeight={600}>
                ⚠️ Warning: {summary.overBudgetCount} {summary.overBudgetCount === 1 ? 'category is' : 'categories are'} over
                budget!
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Budget List */}
        {budgets.length === 0 && (
          <Card elevation={2} sx={{ textAlign: 'center', py: 8 }}>
            <CardContent>
              <Wallet sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom color="text.secondary">
                No Budgets Set
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first budget to start tracking your spending
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateBudget}>
                Create Budget
              </Button>
            </CardContent>
          </Card>
        )}

        {budgets.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 3,
            }}
          >
            {budgets.map(budget => (
              <BudgetCard key={budget.id} budget={budget} onEdit={handleEditBudget} onDelete={handleDeleteBudget} />
            ))}
          </Box>
        )}

        {/* FAB for adding budget */}
        {budgets.length > 0 && (
          <Fab
            color="primary"
            aria-label="add budget"
            onClick={handleCreateBudget}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
            }}
          >
            <Add />
          </Fab>
        )}

        {/* Budget Dialog */}
        <BudgetDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveBudget}
          editBudget={editingBudget}
          currentMonth={currentMonth}
        />
      </Box>
    </AppLayout>
  )
}

export default Budget
