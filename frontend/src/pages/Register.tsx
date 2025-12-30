import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      setError('Falha no cadastro. Tente novamente.')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Nome:
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ display: 'block', width: '100%', padding: '0.5rem' }} />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  )
}

export default Register
