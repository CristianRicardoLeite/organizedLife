import { Box, Paper, Typography, useTheme } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface IncomeExpenseChartProps {
  data: Array<{
    month: string
    income: number
    expense: number
  }>
}

const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  const theme = useTheme()

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Income vs Expenses
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill={theme.palette.success.main} name="Income" />
            <Bar dataKey="expense" fill={theme.palette.error.main} name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}

export default IncomeExpenseChart
