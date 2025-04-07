
import { useEffect, useState } from "react"
import { User } from "../../types"

const Summary = () => {
	const [user, setUser] = useState<User | null>(null)

	// Read user data from localStorage when the component mounts
	useEffect(() => {
	  const storedUser = localStorage.getItem("User")
	  if (storedUser) {
		const parsedUser = JSON.parse(storedUser)
		setUser(parsedUser)
	  }
	}, [])

	return(
		<div className="p-6">
			<h3 className="text-2xl font-bold">Welcome, {user?.name}</h3>
		</div>
	)
}

export default Summary