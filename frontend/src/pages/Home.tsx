import { AccountBalance, Login as LoginIcon, PieChart as PieChartIcon, PersonAdd as RegisterIcon, TrendingUp } from '@mui/icons-material'
import { Box, Button, Container, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { BalanceTrendChart, ExpenseChart, IncomeExpenseChart } from '../components/charts'

const Home = () => {
  const theme = useTheme()

  // Mock data for charts preview
  const balanceData = [
    { date: 'Jan', balance: 3500 },
    { date: 'Feb', balance: 4200 },
    { date: 'Mar', balance: 3800 },
    { date: 'Apr', balance: 4500 },
    { date: 'May', balance: 5100 },
    { date: 'Jun', balance: 4800 },
  ]

  const incomeExpenseData = [
    { month: 'Jan', income: 5000, expense: 1500 },
    { month: 'Feb', income: 5200, expense: 1800 },
    { month: 'Mar', income: 4800, expense: 2200 },
    { month: 'Apr', income: 5500, expense: 2000 },
    { month: 'May', income: 5300, expense: 1700 },
    { month: 'Jun', income: 5600, expense: 2100 },
  ]

  const expenseData = [
    { name: 'Housing', value: 1200 },
    { name: 'Food', value: 450 },
    { name: 'Transport', value: 200 },
    { name: 'Entertainment', value: 150 },
    { name: 'Utilities', value: 180 },
  ]

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 2,
            mb: 6,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            OrganizedLife
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            Financial Organization System
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Track your income, expenses, and financial goals with beautiful visualizations and insights.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Sign In
            </Button>

            <Button
              component={RouterLink}
              to="/register"
              variant="outlined"
              size="large"
              startIcon={<RegisterIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} sx={{ mb: 4 }}>
            Powerful Financial Insights
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 3,
              mb: 6,
            }}
          >
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <TrendingUp sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your financial growth with detailed trend analysis and projections
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <PieChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Visualize Spending
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See where your money goes with intuitive charts and breakdowns
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <AccountBalance sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Manage Budget
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set goals and stay on track with smart budgeting tools
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Charts Preview Section */}
        <Box>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} sx={{ mb: 4 }}>
            Interactive Dashboard
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: 3,
            }}
          >
            <BalanceTrendChart data={balanceData} />
            <IncomeExpenseChart data={incomeExpenseData} />
            <ExpenseChart data={expenseData} />

            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                And Much More!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Drag and drop to customize your dashboard, set financial goals, and get personalized insights
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Get Started Free
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Home
