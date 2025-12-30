import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Budget from './pages/Budget'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Transactions from './pages/Transactions'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <Budget />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
