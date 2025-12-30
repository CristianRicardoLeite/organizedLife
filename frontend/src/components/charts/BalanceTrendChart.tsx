import { Box, Paper, Typography, useTheme } from '@mui/material'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface BalanceTrendChartProps {
  data: Array<{
    date: string
    balance: number
  }>
}

const BalanceTrendChart = ({ data }: BalanceTrendChartProps) => {
  const theme = useTheme()

  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Balance Trend
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke={theme.palette.primary.main} strokeWidth={2} name="Balance" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}

export default BalanceTrendChart
