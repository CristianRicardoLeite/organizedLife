import { TrendingDown, TrendingUp } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Typography, useTheme } from '@mui/material'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: 'success' | 'error' | 'info' | 'warning'
  trend?: {
    value: number
    isPositive: boolean
  }
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => {
  const theme = useTheme()

  const colorMap = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    warning: theme.palette.warning.main,
  }

  const bgColorMap = {
    success: theme.palette.success.light,
    error: theme.palette.error.light,
    info: theme.palette.info.light,
    warning: theme.palette.warning.light,
  }

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color={colorMap[color]}>
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: bgColorMap[color],
              color: colorMap[color],
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend.isPositive ? <TrendingUp fontSize="small" color="success" /> : <TrendingDown fontSize="small" color="error" />}
            <Typography variant="caption" color={trend.isPositive ? 'success.main' : 'error.main'} fontWeight={600}>
              {trend.value}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard
