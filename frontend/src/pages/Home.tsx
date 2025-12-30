import { Link } from 'react-router-dom'

const Home = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>OrganizedLife</h1>
    <p>Sistema de Organização Financeira</p>
    <div style={{ marginTop: '2rem' }}>
      <Link to="/login" style={{ marginRight: '1rem' }}>
        Login
      </Link>
      <Link to="/register">Cadastrar</Link>
    </div>
  </div>
)

export default Home
