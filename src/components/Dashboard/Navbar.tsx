import { FaUser } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"

const Navbar = () => {
	const {user} = useAuth()
	return (
		<div className="flex items-center text-white h-12 bg-[#2f0e56] px-4">
			<button className="ml-auto flex items-center space-x-4 py-2.5 px-4">
			<FaUser />
				<p>{user?.name}</p>
			</button>
		</div>
	)
}

export default Navbar