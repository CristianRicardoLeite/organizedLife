import { useNavigate } from 'react-router-dom'

const Transactions = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>Transações</h1>
        <div>
          <button onClick={() => navigate('/dashboard')} style={{ marginRight: '1rem' }}>
            Voltar ao Dashboard
          </button>
          <button>Nova Transação</button>
        </div>
      </header>

      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p style={{ textAlign: 'center', color: '#6B7280' }}>
          Nenhuma transação cadastrada ainda.
        </p>
      </div>
    </div>
  )
}

export default Transactions
