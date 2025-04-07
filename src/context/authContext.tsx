import { useEffect, useState } from "react"
import { User } from "../types"
import { useNavigate } from "react-router-dom"
import userContext from "./userContext"

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = () => {
      try {
        const storedUser = localStorage.getItem("User")
        console.log("Stored User:", storedUser);
        const parsedUser = storedUser ? JSON.parse(storedUser) : null
        console.log("Parsed User:", parsedUser)

        if (!parsedUser) {
          navigate("/login")
          return
        }

        const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const foundUser = allUsers.find((u: User) => u.id === parsedUser.id)

        if (foundUser) {
          setUser(foundUser)
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error("Verification error:", error)
        navigate("/login")
      } finally {
        setLoading(false)
      }
    };

    verifyUser()
  }, [navigate])

  const login = (user: User | null) => {
    setUser(user)
    localStorage.setItem("User", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("User")
    navigate("/login")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

export default AuthContext






