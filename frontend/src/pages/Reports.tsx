import React, { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Download as DownloadIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import AppLayout from '../components/layout/AppLayout'
import { useReports } from '../hooks/api/useReports'
import { ReportPeriod } from '../types'
import { BalanceTrendChart, ExpenseChart, IncomeExpenseChart } from '../components/charts'

export const Reports: React.FC = () => {
  const { loading, currentReport, generateReport, exportReport, getDateRangeForPeriod } = useReports()
  
  const [period, setPeriod] = useState<ReportPeriod>(ReportPeriod.Monthly)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleGenerateReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGenerateReport = async () => {
    setError(null)
    try {
      const dateRange = period === ReportPeriod.Custom
        ? { startDate: customStartDate, endDate: customEndDate }
        : getDateRangeForPeriod(period)

      if (period === ReportPeriod.Custom && (!customStartDate || !customEndDate)) {
        setError('Please select both start and end dates for custom period')
        return
      }

      await generateReport({ period, dateRange })
    } catch (err) {
      setError('Failed to generate report')
    }
  }

  const handleExport = async (format: 'pdf' | 'csv' | 'excel') => {
    try {
      await exportReport(format)
    } catch (err) {
      setError(`Failed to export as ${format}`)
    }
  }

  const formatCurrency = (value: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reports & Analytics
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Period</InputLabel>
                <Select
                  value={period}
                  onChange={e => setPeriod(e.target.value as ReportPeriod)}
                  label="Period"
                >
                  <MenuItem value={ReportPeriod.Monthly}>Monthly (Last 30 days)</MenuItem>
                  <MenuItem value={ReportPeriod.Quarterly}>Quarterly (Last 3 months)</MenuItem>
                  <MenuItem value={ReportPeriod.Yearly}>Yearly (Last 12 months)</MenuItem>
                  <MenuItem value={ReportPeriod.Custom}>Custom Range</MenuItem>
                </Select>
              </FormControl>

              {period === ReportPeriod.Custom && (
                <>
                  <TextField
                    type="date"
                    label="Start Date"
                    value={customStartDate}
                    onChange={e => setCustomStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="date"
                    label="End Date"
                    value={customEndDate}
                    onChange={e => setCustomEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleGenerateReport}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>

              {currentReport && (
                <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport('pdf')}
                    size="small"
                  >
                    PDF
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport('csv')}
                    size="small"
                  >
                    CSV
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExport('excel')}
                    size="small"
                  >
                    Excel
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {loading && (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Generating report...
          </Typography>
        )}

        {!loading && !currentReport && (
          <Alert severity="info">
            Select a period and click &ldquo;Generate Report&rdquo; to view analytics
          </Alert>
        )}

        {!loading && currentReport && (
          <>
            {/* Summary Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Report Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Period: {currentReport.summary.period} ({formatDate(currentReport.summary.dateRange.startDate)} -{' '}
                  {formatDate(currentReport.summary.dateRange.endDate)})
                </Typography>
              </CardContent>
            </Card>

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
                    Total Income
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(currentReport.summary.totalIncome)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg: {formatCurrency(currentReport.summary.avgDailyIncome)}/day
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total Expense
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    {formatCurrency(currentReport.summary.totalExpense)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg: {formatCurrency(currentReport.summary.avgDailyExpense)}/day
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Net Balance
                  </Typography>
                  <Typography
                    variant="h5"
                    color={currentReport.summary.netBalance >= 0 ? 'success.main' : 'error.main'}
                  >
                    {formatCurrency(currentReport.summary.netBalance)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {currentReport.summary.transactionCount} transactions
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Savings Rate
                  </Typography>
                  <Typography
                    variant="h5"
                    color={currentReport.summary.savingsRate >= 20 ? 'success.main' : 'warning.main'}
                  >
                    {currentReport.summary.savingsRate.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {currentReport.summary.savingsRate >= 20 ? 'Great job!' : 'Can improve'}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            {/* Top Categories */}
            {(currentReport.summary.topIncomeCategory || currentReport.summary.topExpenseCategory) && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Categories
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                    {currentReport.summary.topIncomeCategory && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Top Income Category
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {currentReport.summary.topIncomeCategory.categoryIcon}{' '}
                          {currentReport.summary.topIncomeCategory.categoryName}
                        </Typography>
                        <Typography variant="body2">
                          {formatCurrency(currentReport.summary.topIncomeCategory.totalAmount)} (
                          {currentReport.summary.topIncomeCategory.percentage.toFixed(1)}%)
                        </Typography>
                      </Box>
                    )}
                    {currentReport.summary.topExpenseCategory && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Top Expense Category
                        </Typography>
                        <Typography variant="h6" color="error.main">
                          {currentReport.summary.topExpenseCategory.categoryIcon}{' '}
                          {currentReport.summary.topExpenseCategory.categoryName}
                        </Typography>
                        <Typography variant="body2">
                          {formatCurrency(currentReport.summary.topExpenseCategory.totalAmount)} (
                          {currentReport.summary.topExpenseCategory.percentage.toFixed(1)}%)
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Charts */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Visual Analytics
            </Typography>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              {currentReport.monthlyData.length > 0 && (
                <IncomeExpenseChart
                  data={currentReport.monthlyData.map(m => ({
                    month: m.month,
                    income: m.income,
                    expense: m.expense,
                  }))}
                />
              )}

              {currentReport.monthlyData.length > 0 && (
                <BalanceTrendChart
                  data={currentReport.monthlyData.map(m => ({
                    date: m.month,
                    balance: m.balance,
                  }))}
                />
              )}

              {currentReport.expenseByCategory.length > 0 && (
                <ExpenseChart
                  data={currentReport.expenseByCategory.map(c => ({
                    name: c.categoryName,
                    value: c.totalAmount,
                  }))}
                />
              )}
            </div>
          </>
        )}
      </Container>
    </AppLayout>
  )
}

export default Reports
