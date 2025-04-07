import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) => {
  const storedUser = localStorage.getItem('User')
  const user = storedUser ? JSON.parse(storedUser) : null

  if (!user || user.role !== allowedRole) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
}

export default ProtectedRoute