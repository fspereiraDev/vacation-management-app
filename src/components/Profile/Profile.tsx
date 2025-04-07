import { useEffect, useState } from 'react'
import { User, VacationRequest } from '../../types'
import VacationSummaryCard from '../Dashboard/VacationSummaryCard'
import VacationCalendar from '../VacationCalendar'
import VacationRequests from '../Dashboard/VacationList'

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    password: ''
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('User')
    const storedRequests = localStorage.getItem('vacations')

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setCurrentUser(parsedUser)
      setForm({
        name: parsedUser.name,
        email: parsedUser.email,
        phone: parsedUser.phone ?? '',
        position: parsedUser.position,
        password: parsedUser.password
      })

      const allVacationRequests = JSON.parse(storedRequests || '[]')
      const userRequests = allVacationRequests.filter(
        (request: VacationRequest) => request.userId === parsedUser.id
      )
      setVacationRequests(userRequests)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!currentUser) return

    const updatedUser: User = {
      ...currentUser,
      name: form.name,
      email: form.email,
      phone: form.phone === '' ? '' : parseInt(form.phone),
      position: form.position,
      password: form.password
    }

    localStorage.setItem('User', JSON.stringify(updatedUser))

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = allUsers.map((u: User) =>
      u.id === currentUser.id ? updatedUser : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    setCurrentUser(updatedUser)
    setIsEditing(false)
  }

  const addVacationRequest = (newRequest: VacationRequest) => {
		
    const allVacationRequests = JSON.parse(localStorage.getItem('vacations') || '[]')
    const updatedAll = [...allVacationRequests, newRequest]
    localStorage.setItem('vacations', JSON.stringify(updatedAll))

    if (currentUser &&  String(newRequest.userId) === String(currentUser.id)) {
      setVacationRequests(prev => [...prev, newRequest])
    }
  }

  if (!currentUser) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-700">No profile found.</h2>
      </div>
    )
  }

  return (
		<div className="flex flex-col md:flex-row gap-6 p-6">
    	<div className="flex-1 max-w-12xl">
				<div className="mx-auto p-6 bg-white rounded-xl shadow-lg">
      		<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-[#2f0e56]">My Profile</h2>
							{!isEditing && (
								<button
									onClick={() => setIsEditing(true)}
									className="text-sm text-white bg-[#2f0e56] px-3 py-1 rounded-md hover:bg-[#240b44] transition"
								>
									Edit Profile
								</button>
							)}
						</div>

					{isEditing ? (
						<div className="space-y-4">
							<div>
								<label className="text-gray-500 text-sm">Full Name</label>
								<input
									name="name"
									value={form.name}
									onChange={handleChange}
									className="w-full border border-gray-300 p-2 rounded-md"
									required
								/>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Email</label>
								<input
									name="email"
									type="email"
									value={form.email}
									onChange={handleChange}
									className="w-full border border-gray-300 p-2 rounded-md"
									required
								/>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Phone</label>
								<input
									name="phone"
									type="tel"
									pattern="[0-9]{9}"
									value={form.phone}
									onChange={handleChange}
									className="w-full border border-gray-300 p-2 rounded-md"
								/>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Position</label>
								<input
									name="position"
									value={form.position}
									onChange={handleChange}
									className="w-full border border-gray-300 p-2 rounded-md"
									required
								/>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Password</label>
								<input
									name="password"
									type="password"
									value={form.password}
									onChange={handleChange}
									className="w-full border border-gray-300 p-2 rounded-md"
									required
								/>
							</div>

							<div className="flex justify-end gap-3 pt-4">
								<button
									onClick={() => setIsEditing(false)}
									className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className="px-4 py-2 bg-[#2f0e56] text-white rounded-md hover:bg-[#240b44] transition"
								>
									Save Changes
								</button>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							<div>
								<label className="text-gray-500 text-sm">Full Name</label>
								<p className="text-lg">{currentUser.name}</p>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Email</label>
								<p className="text-lg">{currentUser.email}</p>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Phone</label>
								<p className="text-lg">{currentUser.phone ?? 'N/A'}</p>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Position</label>
								<p className="text-lg">{currentUser.position}</p>
							</div>
							<div>
								<label className="text-gray-500 text-sm">Role</label>
								<p className="text-lg capitalize">{currentUser.role}</p>
							</div>
						</div>
					)}
				</div>
				<div>
					<VacationRequests vacationRequests={vacationRequests} />
				</div>
			</div>
			<div>
				<div className="w-full md:w-[350px]">
					<VacationSummaryCard vacationRequests={vacationRequests}/>
				</div>
				<div className="w-full md:w-[350px]">
					<VacationCalendar addVacationRequest={addVacationRequest} vacationRequests={vacationRequests}/>
				</div>
			</div>
  	</div>
  )
}

export default ProfilePage
