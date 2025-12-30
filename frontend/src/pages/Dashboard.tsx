import { AccountBalance, Add, TrendingDown, TrendingUp } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BalanceTrendChart, ExpenseChart, IncomeExpenseChart } from '../components/charts'
import { DraggableGrid } from '../components/common'
import { BudgetOverview, StatCard } from '../components/dashboard'
import { GoalsOverview } from '../components/dashboard/GoalsOverview'
import { ReportsOverview } from '../components/dashboard/ReportsOverview'
import AppLayout from '../components/layout/AppLayout'
import { useTransactions } from '../hooks/api'
import { useAuth } from '../hooks/useAuth'
import { TransactionType } from '../types'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { transactions, loading, getSummary, fetchTransactions } = useTransactions()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const summary = getSummary()
  const recentTransactions = transactions.slice(0, 5)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  if (loading) {
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
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Here&apos;s an overview of your financial status
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 3,
          }}
        >
          <StatCard
            title="Total Balance"
            value={formatCurrency(summary.balance)}
            icon={<AccountBalance />}
            color="success"
            trend={{
              value: summary.balance > 0 ? 15.3 : -5.2,
              isPositive: summary.balance > 0,
            }}
          />

          <StatCard
            title="Total Income"
            value={formatCurrency(summary.totalIncome)}
            icon={<TrendingUp />}
            color="info"
            trend={{ value: 12.5, isPositive: true }}
          />

          <StatCard
            title="Total Expenses"
            value={formatCurrency(summary.totalExpense)}
            icon={<TrendingDown />}
            color="error"
            trend={{ value: 8.3, isPositive: false }}
          />
        </Box>

        {/* Draggable Charts Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            Financial Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Drag and drop to reorder your charts
          </Typography>

          <DraggableGrid
            initialItems={[
              {
                id: 'balance-trend',
                component: (
                  <BalanceTrendChart
                    data={[
                      { date: 'Jan', balance: 3500 },
                      { date: 'Feb', balance: 4200 },
                      { date: 'Mar', balance: 3800 },
                      { date: 'Apr', balance: 4500 },
                      { date: 'May', balance: summary.balance },
                    ]}
                  />
                ),
              },
              {
                id: 'income-expense',
                component: (
                  <IncomeExpenseChart
                    data={[
                      { month: 'Jan', income: 5000, expense: 1500 },
                      { month: 'Feb', income: 5200, expense: 1800 },
                      { month: 'Mar', income: 4800, expense: 2200 },
                      { month: 'Apr', income: 5500, expense: 2000 },
                      { month: 'May', income: summary.totalIncome, expense: summary.totalExpense },
                    ]}
                  />
                ),
              },
              {
                id: 'expense-breakdown',
                component: (
                  <ExpenseChart
                    data={transactions
                      .filter(t => t.type === TransactionType.Expense)
                      .reduce<Array<{ name: string; value: number }>>((acc, t) => {
                        const categoryName = t.categoryName || 'Other'
                        const existing = acc.find(item => item.name === categoryName)
                        if (existing) {
                          existing.value += t.amount
                        } else {
                          acc.push({ name: categoryName, value: t.amount })
                        }
                        return acc
                      }, [])}
                  />
                ),
              },
            ]}
          />
        </Box>

        {/* Budget Overview Section */}
        <Box sx={{ mt: 4 }}>
          <BudgetOverview />
        </Box>

        {/* Goals Overview Section */}
        <Box sx={{ mt: 4 }}>
          <GoalsOverview />
        </Box>

        {/* Reports Overview Section */}
        <Box sx={{ mt: 4 }}>
          <ReportsOverview />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Recent Transactions
                </Typography>
                <Button variant="outlined" size="small" onClick={() => navigate('/transactions')}>
                  View All
                </Button>
              </Box>

              {recentTransactions.length === 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    gap: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No transactions yet. Start by adding your first transaction!
                  </Typography>
                  <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/transactions')}>
                    Add Transaction
                  </Button>
                </Box>
              )}

              {recentTransactions.length > 0 && (
                <List>
                  {recentTransactions.map((transaction, index) => (
                    <Box key={transaction.id}>
                      {index > 0 && <Divider />}
                      <ListItem
                        sx={{
                          py: 2,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: transaction.categoryColor + '20',
                              fontSize: '1.5rem',
                            }}
                          >
                            {transaction.categoryIcon}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography variant="body1" fontWeight={600}>
                                {transaction.description}
                              </Typography>
                              <Typography variant="h6" fontWeight={700} color={transaction.type === TransactionType.Income ? 'success.main' : 'error.main'}>
                                {transaction.type === TransactionType.Income ? '+' : '-'}
                                {formatCurrency(transaction.amount)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                mt: 0.5,
                              }}
                            >
                              <Chip
                                label={transaction.categoryName}
                                size="small"
                                sx={{
                                  backgroundColor: transaction.categoryColor + '20',
                                  color: transaction.categoryColor,
                                  fontWeight: 600,
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(transaction.date)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AppLayout>
  )
}

export default Dashboard
