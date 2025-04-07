import { FaCog, FaSignOutAlt, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import useAuth  from '../../hooks/useAuth'

const SideBar = () => {
	const { logout } = useAuth()

	return(
		<div className="bg-[#3e1d6e] text-white h-screen flex flex-col space-y-2 w-64">
			<div className="bg-[#2f0e56] h-12 flex items-center justify-center">
				<h3 className="text-2x1 text-center">VertCal</h3>
			</div>
			<div className="space-y-2">
				<NavLink
					to="/admin-dashboard"
					className={({ isActive }) =>
						`flex items-center space-x-4 py-2.5 px-4 mx-2 rounded ${
							isActive ? "bg-[#ff802b] text-white" : "text-gray-300"
						}`
						
					}
					end
				>
					<FaTachometerAlt />
					<span>Dashboard</span>
				</NavLink>
				<NavLink 
					to="/admin-dashboard/profile" 
					className={({ isActive }) =>
						`flex items-center space-x-4 py-2.5 px-4 mx-2 rounded ${
							isActive ? "bg-[#ff802b] text-white" : "text-gray-300"
						}`
					}
				>
					<FaUser />
					<span>My Profile</span>
				</NavLink>
				<NavLink 
					to="/admin-dashboard/team" 
					className={({ isActive }) =>
						`flex items-center space-x-4 py-2.5 px-4 mx-2 rounded ${
							isActive ? "bg-[#ff802b] text-white" : "text-gray-300"
						}`
					}
				>
					<FaUsers />
					<span>Team</span>
				</NavLink>
				<NavLink 
					to="/admin-dashboard/vacations" 
					className={({ isActive }) =>
						`flex items-center space-x-4 py-2.5 px-4 mx-2 rounded ${
							isActive ? "bg-[#ff802b] text-white" : "text-gray-300"
						}`
					}
				>
					<FaCog/>
					<span>Manage Vacations</span>
				</NavLink>
			</div>
			<div className="mt-auto flex items-center space-x-4 py-2.5 px-6">
				<FaSignOutAlt />
				<button className="py-2.5 rounded" onClick={logout}>
					Logout
				</button>
			</div>
		</div>
	)
}

export default SideBar