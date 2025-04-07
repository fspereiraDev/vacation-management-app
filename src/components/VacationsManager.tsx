import { useEffect, useState } from 'react'
import { VacationRequest } from '../types'
import TableComponent from './TableComponent'

const VacationsManager = () => {
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([])

  const pendingRequests = vacationRequests.filter(req => req.status === 'pending')
  const resolvedRequests = vacationRequests.filter(req => req.status !== 'pending')

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('vacations') || '[]')
    setVacationRequests(storedRequests)
  }, [])

  const updateRequestStatus = (id: string, newStatus: 'approved' | 'denied') => {
    const updatedRequests = vacationRequests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    )

    setVacationRequests(updatedRequests)
    localStorage.setItem('vacations', JSON.stringify(updatedRequests))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#2f0e56] mb-4">Vacations Manager</h2>
			<div className='mb-4'>
				<TableComponent
					requests={pendingRequests}
					showActions={true}
					updateRequestStatus={updateRequestStatus}
				/>
			</div>
      <div>
				<TableComponent
        	requests={resolvedRequests}
        	showActions={false}
      	/>
			</div>
    </div>
  )
}

export default VacationsManager

