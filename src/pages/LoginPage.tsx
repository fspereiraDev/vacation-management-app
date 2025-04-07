import { useState } from 'react'
import users from '../users.json'
import useAuth  from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const {login} = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const user = users.find(user => user.email === email && user.password === password)
		if (user) {
			login(user)
			localStorage.setItem('User', JSON.stringify(user))
			if (user.role === 'admin') {
				navigate('/admin-dashboard')
			} else {
				navigate('/employee-dashboard')
			}
			navigate('/admin-dashboard')
			console.log("Login successful:", user)
		}
		else {
			setError('Invalid Credentials')
			console.error("Invalid Credentials")
		}
	}

	return(
		<div className='flex flex-col items-center h-screen justify-center bg-[linear-gradient(90deg,_rgba(123,62,218,1)_0%,_rgba(229,108,70,1)_80%,_rgba(255,128,43,1)_100%)] text-white p-4 space-y-6'>
			<h2>Vertcal – Vacation Planner</h2>
			<div className='border shadow p-6 w-80 rounded bg-white'>
				<h2 className='font-bold mb-4 text-black'>Login</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4 text-black'>
						<label htmlFor='email' className='block text-gray-700'>Email</label>
						<input 
							type='email'
							name='email'
							placeholder='Enter Email'
							className='w-full px-3 py-2 border border-gray-200 placeholder-gray-200 rounded'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='mb-4 text-black'>
						<label htmlFor='password' className='block text-gray-700'>Password</label>
						<input 
							type='password'
							name='password'
							placeholder='********'
							className='w-full px-3 py-2 border border-gray-200 placeholder-gray-200 rounded'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='mb-4 flex items-center justify-between'>
						<label className='inline-flex items-center'>
							<input type='checkbox' className='form-checkbox'/>
							<span className='ml-2 text-gray-700'>Remember me</span>
						</label>
						<a href='#' className='text-teal-600'>
							Forgot password?
						</a>
					</div>
					<div className='mb-4'>
						<button type='submit' className='w-full bg-teal-600 text-white py-2'>
							Login
						</button>
					</div>
					{error && <p className='text-red-500'>{error}</p>}
				</form>
			</div>
		</div>
	)
}

export default Login