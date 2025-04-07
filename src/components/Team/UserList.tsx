import { useEffect, useState } from 'react'
import Modal from '../Modal'
import { User } from '../../types'

const UserManagementPage = () => {
  const [allUsers, setAllUsers] = useState<User[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [errorMessage, setErrorMessage] = useState('')
  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers))
    }

		const storedCurrentUser = localStorage.getItem('User')
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser))
    }
  }, [])

  const [user, setUser] = useState({
    user_name: '',
    user_email: '',
    user_phone: '' as string | number,
    user_position: '',
    user_password: '',
    user_role: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)  // To handle editing

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
		setErrorMessage('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

		const emailExists = allUsers.some(existingUser => existingUser.email === user.user_email && existingUser.id !== editingUser?.id)
    
    if (emailExists) {
      setErrorMessage('The email address is already in use. Please choose a different one.')
      return
    }

    // If editing, update the user, else add a new user
    if (editingUser) {
      const updatedUsers = allUsers.map((existingUser) =>
        existingUser.id === editingUser.id ? { ...editingUser, ...user } : existingUser
      )
      setAllUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setEditingUser(null)
    } else {
      const lastId = allUsers.length > 0 ? parseInt(allUsers[allUsers.length - 1].id) : 0
      const newUser: User = {
        id: String(lastId + 1),
        name: user.user_name,
        email: user.user_email,
        phone: user.user_phone,
        position: user.user_position,
        password: user.user_password,
        role: user.user_role
      }
      const updatedUsers = [...allUsers, newUser]
      setAllUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
			resetForm()
    }

    setUser({
      user_name: '',
      user_email: '',
      user_phone: '',
      user_position: '',
      user_password: '',
      user_role: ''
    })
    setIsModalOpen(false)
  }

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit)
    setUser({
      user_name: userToEdit.name,
      user_email: userToEdit.email,
      user_phone: userToEdit.phone,
      user_position: userToEdit.position,
      user_password: userToEdit.password,
      user_role: userToEdit.role
    })
    setIsModalOpen(true)
  }

  const handleDelete = (userId: string) => {
    const updatedUsers = allUsers.filter((user) => user.id !== userId)
    setAllUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

	const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

	const resetForm = () => {
    setUser({
      user_name: '',
      user_email: '',
      user_phone: '',
      user_position: '',
      user_password: '',
      user_role: ''
    })
    setErrorMessage('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

	const indexOfLastUser = currentPage * ITEMS_PER_PAGE
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search by name."
					value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-0.5 border border-gray-300 rounded-md shadow-sm"
        />
        {currentUser?.role === 'admin' && (
          <button
            className="bg-[#ff802b] text-white px-4 py-2 rounded-md hover:bg-[#e56c46] transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Add User
          </button>
        )}
      </div>
      {/* Display users in a table */}
      <div className="overflow-x-auto rounded-2xl shadow-md mt-5">
        <table className="min-w-full text-sm bg-white rounde-2xl">
          <thead className="bg-[#f8f4fc] text-[#2f0e56] font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Phone</th>
              <th className="px-4 py-2 border border-gray-300">Position</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{user.id}</td>
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                <td className="px-4 py-2 border border-gray-300">{user.position}</td>
                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                <td className="px-4 py-2 text-center border border-gray-300">
								{currentUser?.role === 'admin' && (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-[#2f0e56] text-white px-4 py-1 rounded-md mr-2 hover:bg-[#240b44] transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
			<div className="flex justify-center mt-5">
        <button
          className="px-4 py-2 bg-[#2f0e56] text-white rounded-md mr-2 hover:bg-[#240b44] transition duration-300"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-[#2f0e56] text-white' : 'bg-gray-300 text-black'} rounded-md mx-1`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-[#2f0e56] text-white rounded-md ml-2 hover:bg-[#240b44] transition duration-300"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)}
        >
          Next
        </button>
      </div>

      {/* Modal for adding a new user */}
      {isModalOpen && (
				<div className="fixed inset-0 bg-black/25 z-40">
					<Modal isOpen={isModalOpen} onClose={closeModal}>
						<h2 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
						<form onSubmit={handleSubmit}>
							<label htmlFor="user_name">User Name</label>
							<input
								name="user_name"
								type="text"
								required
								placeholder="Jonh Doe"
								value={user.user_name}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							/>
							<label htmlFor="user_email">Email</label>
							<input
								name="user_email"
								type="email"
								required
								placeholder="example@company.com"
								value={user.user_email}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							/>
							<label htmlFor="user_phone">Phone Number</label>
							<input
								name="user_phone"
								type="tel"
								pattern="[0-9]{9}"
								placeholder="123456789"
								value={user.user_phone || ''}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							/>
							<label htmlFor="user_position">Position</label>
							<input
								name="user_position"
								type="text"
								required
								placeholder="Software Developer"
								value={user.user_position}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							/>
							<label htmlFor="user_password">Password</label>
							<input
								name="user_password"
								type="password"
								required
								placeholder="**********"
								value={user.user_password}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							/>
							<label htmlFor="user_role">Role</label>
							<select
								name="user_role"
								value={user.user_role}
								onChange={handleChange}
								className="w-full mb-3 p-2 border border-gray-300 rounded-md"
							>
								<option value="admin">Admin</option>
								<option value="user">User</option>
							</select>
							{errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
							<div className="flex justify-end mt-4">
								<button
									type="submit"
									className="bg-[#2f0e56] text-white px-4 py-2 rounded-md hover:bg-[#240b44] transition duration-300"
								>
									Save
								</button>
							</div>
						</form>
					</Modal>
				</div>
      )}
    </div>
  )
}

export default UserManagementPage
