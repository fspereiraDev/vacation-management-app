import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import SideBar from '../components/Dashboard/SideBar'
import Navbar from '../components/Dashboard/Navbar'
import { useEffect } from 'react'

const Dashboard = () => {
	const {user} = useAuth()
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!user) {
		  navigate('/login')  // Navigates if user is not logged in
		}
	  }, [user, navigate])

	return(
		<div className='flex'>
			<SideBar/>
			<div className='flex-1'>
				<Navbar/>
				<Outlet/>
			</div>
		</div>
	)
}

export default Dashboard