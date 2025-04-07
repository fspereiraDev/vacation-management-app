import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/LoginPage'
import AdminDashboard from './pages/Dashboard'
import Summary from './components/Dashboard/Summary'
import ProfilePage from './components/Profile/Profile'
import UserList from './components/Team/UserList'
import usersData from './users.json'
import vacationsData from './vacationsRequest.json'
import { useEffect } from 'react'
import VacationsManager from './components/VacationsManager'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    const storedVacations = localStorage.getItem('vacations')

    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(usersData))
    }

    if (!storedVacations) {
      localStorage.setItem('vacations', JSON.stringify(vacationsData))
    }
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<Summary />}></Route>
          <Route path="/admin-dashboard/profile" element={<ProfilePage/>}></Route>
          <Route path="/admin-dashboard/team" element={<UserList/>}></Route>
          <Route path="/admin-dashboard/vacations" element={
            <ProtectedRoute allowedRole="admin">
              <VacationsManager />
            </ProtectedRoute>}>
          </Route>
        </Route>
      </Routes>
  )
}

export default App;


