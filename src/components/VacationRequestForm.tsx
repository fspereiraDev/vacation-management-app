// VacationRequestForm.tsx
import { useState } from 'react';
import { VacationRequest, VacationFormProps } from '../types'; // Adjust the import patch as necessary

const VacationRequestForm: React.FC<VacationFormProps> = ({ addVacationRequest, onClose }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const user = JSON.parse(localStorage.getItem('User') || '[]')

  const getNextId = () => {
    const stored = localStorage.getItem('vacations')
    const parsed = stored ? JSON.parse(stored) : []
    if (parsed.length === 0) return '1'
    const newId = (Number(parsed[parsed.length - 1].id) + 1).toString()
    return newId
  }

  const handleVacationRequest = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.')
      return
    }

    setError('')

    const newRequest: VacationRequest = {
      id: getNextId(),
      userId: user.id,
      startDate,
      endDate,
      note,
      status: 'pending',
      employeeName: user.name,
      requestedBy: user.name,
      approvedDate: '',
    };

    const stored = localStorage.getItem('vacations')
    const parsed = stored ? JSON.parse(stored) : []
    parsed.push(newRequest)

    addVacationRequest(newRequest)
    localStorage.setItem('vacations', JSON.stringify(parsed))

    setStartDate('')
    setEndDate('')
    setNote('')
    onClose()
  }

  return (
    <div className="mt-8 bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Request Vacation</h2>

      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Any notes about this vacation..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleVacationRequest}
          className="bg-[#2f0e56] text-white px-4 py-2 rounded-md hover:bg-[#240b44] transition duration-300"
        >
          Request Vacation
        </button>
      </div>
    </div>
  );
};

export default VacationRequestForm;
