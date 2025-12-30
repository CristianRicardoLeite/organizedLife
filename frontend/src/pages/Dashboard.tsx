import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>Dashboard - Bem-vindo, {user?.name}!</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Saldo Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981' }}>R$ 0,00</p>
        </div>

        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Receitas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B82F6' }}>R$ 0,00</p>
        </div>

        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Despesas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EF4444' }}>R$ 0,00</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/transactions')} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          Ver Transações
        </button>
      </div>
    </div>
  )
}

export default Dashboard
