import { useContext } from 'react'
import userContext from '../context/userContext'
import { AuthContextType } from '../types'

const useAuth = (): AuthContextType => {
  const context = useContext(userContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
};

export default useAuth