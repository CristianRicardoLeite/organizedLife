import { PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormAlert, FormTextField } from '../components/forms'
import AuthLayout from '../components/layout/AuthLayout'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  const getPasswordStrength = (pwd: string): number => {
    let strength = 0
    if (pwd.length >= 8) strength += 25
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25
    if (pwd.match(/[0-9]/)) strength += 25
    if (pwd.match(/[^a-zA-Z0-9]/)) strength += 25
    return strength
  }

  const passwordStrength = getPasswordStrength(password)

  const getStrengthColor = (): 'error' | 'warning' | 'info' | 'success' => {
    if (passwordStrength <= 25) return 'error'
    if (passwordStrength <= 50) return 'warning'
    if (passwordStrength <= 75) return 'info'
    return 'success'
  }

  const getStrengthLabel = (): string => {
    if (passwordStrength <= 25) return 'Weak'
    if (passwordStrength <= 50) return 'Fair'
    if (passwordStrength <= 75) return 'Good'
    return 'Strong'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (passwordStrength < 50) {
      setError('Password is too weak. Please use a stronger password.')
      return
    }

    setLoading(true)

    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join us and start organizing your finances">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormAlert message={error} show={!!error} />

        <FormTextField name="name" label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" autoFocus />

        <FormTextField name="email" label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />

        <FormTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {password && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Password Strength
              </Typography>
              <Typography variant="caption" color={`${getStrengthColor()}.main`} fontWeight={600}>
                {getStrengthLabel()}
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={passwordStrength} color={getStrengthColor()} sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        )}

        <FormTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          error={confirmPassword !== '' && password !== confirmPassword}
          helperText={confirmPassword !== '' && password !== confirmPassword ? 'Passwords do not match' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle confirm password visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} startIcon={<PersonAdd />} sx={{ mt: 3, mb: 2, py: 1.5 }}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  )
}

export default Register
