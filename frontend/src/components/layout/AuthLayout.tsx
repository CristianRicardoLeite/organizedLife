import { Box, Container, Paper, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            component={Link}
            to="/"
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              textDecoration: 'none',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            OrganizedLife
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
