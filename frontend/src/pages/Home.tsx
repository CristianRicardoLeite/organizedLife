import { Login as LoginIcon, PersonAdd as RegisterIcon } from '@mui/icons-material'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => (
  <Container maxWidth="sm">
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 2,
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          OrganizedLife
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Financial Organization System
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/login" variant="contained" size="large" startIcon={<LoginIcon />} sx={{ px: 4, py: 1.5 }}>
            Sign In
          </Button>

          <Button component={RouterLink} to="/register" variant="outlined" size="large" startIcon={<RegisterIcon />} sx={{ px: 4, py: 1.5 }}>
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Box>
  </Container>
)

export default Home
