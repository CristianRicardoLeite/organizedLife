import { Add as AddIcon } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ContributionDialog } from '../components/goals/ContributionDialog'
import { GoalCard } from '../components/goals/GoalCard'
import { GoalDialog } from '../components/goals/GoalDialog'
import AppLayout from '../components/layout/AppLayout'
import { useGoals } from '../hooks/api/useGoals'
import { AddContributionDto, CreateGoalDto, Goal, GoalStatus, UpdateGoalDto } from '../types'

export const Goals: React.FC = () => {
  const { goals, loading, fetchGoals, createGoal, updateGoal, deleteGoal, addContribution, getSummary, getProgress, getRemaining, getDaysRemaining } =
    useGoals()

  const [statusFilter, setStatusFilter] = useState<GoalStatus | 'all'>('all')
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [contributionDialogOpen, setContributionDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const status = statusFilter === 'all' ? undefined : statusFilter
    fetchGoals(status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const summary = getSummary()

  const handleCreateGoal = () => {
    setSelectedGoal(undefined)
    setGoalDialogOpen(true)
  }

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    setGoalDialogOpen(true)
  }

  const handleDeleteGoal = (id: number) => {
    setGoalToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (goalToDelete === null) return

    try {
      await deleteGoal(goalToDelete)
      setDeleteDialogOpen(false)
      setGoalToDelete(null)
    } catch (err) {
      setError('Failed to delete goal')
    }
  }

  const handleAddContribution = (goal: Goal) => {
    setSelectedGoal(goal)
    setContributionDialogOpen(true)
  }

  const handleGoalSubmit = async (data: CreateGoalDto | UpdateGoalDto) => {
    try {
      if ('id' in data) {
        await updateGoal(data)
      } else {
        await createGoal(data)
      }
      setGoalDialogOpen(false)
      setSelectedGoal(undefined)
      const status = statusFilter === 'all' ? undefined : statusFilter
      fetchGoals(status)
    } catch (err) {
      throw new Error('Failed to save goal')
    }
  }

  const handleContributionSubmit = async (data: AddContributionDto) => {
    try {
      await addContribution(data)
      setContributionDialogOpen(false)
      setSelectedGoal(undefined)
      const status = statusFilter === 'all' ? undefined : statusFilter
      fetchGoals(status)
    } catch (err) {
      throw new Error('Failed to add contribution')
    }
  }

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const filteredGoals = statusFilter === 'all' ? goals : goals.filter(g => g.status === statusFilter)

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Financial Goals
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Goals
              </Typography>
              <Typography variant="h4">{summary.totalGoals}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Goals
              </Typography>
              <Typography variant="h4" color="primary">
                {summary.activeGoals}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Goals
              </Typography>
              <Typography variant="h4" color="success.main">
                {summary.completedGoals}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Overall Progress
              </Typography>
              <Typography variant="h4">{summary.overallProgress.toFixed(1)}%</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(summary.totalCurrentAmount)} / {formatCurrency(summary.totalTargetAmount)}
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value as GoalStatus | 'all')} label="Filter by Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={GoalStatus.Active}>Active</MenuItem>
              <MenuItem value={GoalStatus.Completed}>Completed</MenuItem>
              <MenuItem value={GoalStatus.Paused}>Paused</MenuItem>
              <MenuItem value={GoalStatus.Cancelled}>Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Goals Grid */}
        {loading && <Typography>Loading goals...</Typography>}

        {!loading && filteredGoals.length === 0 && (
          <Alert severity="info">
            {statusFilter === 'all' ? 'No goals yet. Create your first goal to get started!' : `No ${statusFilter.toLowerCase()} goals found.`}
          </Alert>
        )}

        {!loading && filteredGoals.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                progress={getProgress(goal)}
                remaining={getRemaining(goal)}
                daysRemaining={getDaysRemaining(goal)}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
                onAddContribution={handleAddContribution}
              />
            ))}
          </div>
        )}

        {/* FAB for adding new goal */}
        <Fab color="primary" aria-label="add goal" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleCreateGoal}>
          <AddIcon />
        </Fab>

        {/* Dialogs */}
        <GoalDialog open={goalDialogOpen} goal={selectedGoal} onClose={() => setGoalDialogOpen(false)} onSubmit={handleGoalSubmit} />

        <ContributionDialog
          open={contributionDialogOpen}
          goal={selectedGoal}
          onClose={() => setContributionDialogOpen(false)}
          onSubmit={handleContributionSubmit}
        />

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Goal</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this goal? This action cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppLayout>
  )
}
