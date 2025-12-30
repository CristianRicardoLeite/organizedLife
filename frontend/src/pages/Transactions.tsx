import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material'
import { Box, Chip, Fab, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import AppLayout from '../components/layout/AppLayout'

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - will be replaced with real data later
  const transactions: Array<{
    id: number
    description: string
    amount: number
    type: 'income' | 'expense'
    category: string
    date: string
  }> = []

  const filteredTransactions = transactions.filter(transaction => transaction.description.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            Transactions
          </Typography>
        </Box>

        <Paper sx={{ mb: 3, p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }} align="right">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      No transactions found. Click the + button to add your first transaction!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map(transaction => (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Chip label={transaction.category} size="small" />
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color={transaction.type === 'income' ? 'success.main' : 'error.main'}>
                        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Fab
          color="primary"
          aria-label="add transaction"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => {
            // TODO: Open add transaction modal
            console.log('Add transaction')
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </AppLayout>
  )
}

export default Transactions
