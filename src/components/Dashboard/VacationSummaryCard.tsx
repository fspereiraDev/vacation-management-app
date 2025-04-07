import { useEffect, useState } from 'react'
import { VacationRequest, User } from '../../types'

const VacationSummaryCard = ({ vacationRequests }: { vacationRequests: VacationRequest[] }) => {
  const [, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('User') || 'null') as User | null

    if (currentUser) {
      setUserId(currentUser.id)
    }
  }, [])

  const pending = vacationRequests.filter(v => v.status === 'pending').length
  const accepted = vacationRequests.filter(v => v.status === 'approved').length

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full md:max-w-sm">
      <h3 className="text-xl font-semibold text-[#2f0e56] mb-4">Vacation Summary</h3>
      <ul className="space-y-3">
        <li className="flex justify-between">
          <span className="text-gray-700">Pending Requests</span>
          <span className="font-bold text-yellow-600">{pending}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-700">Accepted Vacations</span>
          <span className="font-bold text-green-600">{accepted}</span>
        </li>
      </ul>
    </div>
  )
}

export default VacationSummaryCard
