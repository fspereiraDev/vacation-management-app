import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Modal from './Modal'
import VacationRequestForm from './VacationRequestForm'
import { VacationRequest } from '../types'

const VacationCalendar = ({
  vacationRequests,
  addVacationRequest
}: {
  vacationRequests: VacationRequest[]
  addVacationRequest: (r: VacationRequest) => void
}) => {
  const [date, setDate] = useState<Date>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getHighlightDates = (currentMonth: Date) => {
    const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const currentMonthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    return vacationRequests
      .filter((request) => request.status === 'approved')
      .flatMap((request) => {
        const startDate = new Date(request.startDate)
        const endDate = new Date(request.endDate)
        const highlightedDates: Date[] = []

        while (startDate <= endDate) {
          const normalizedStartDate = normalizeDate(startDate)
          if (normalizedStartDate >= currentMonthStart && normalizedStartDate <= currentMonthEnd) {
            highlightedDates.push(normalizedStartDate)
          }
          startDate.setDate(startDate.getDate() + 1)
        }

        return highlightedDates
      })
  }

	const normalizeDate = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate)
    }
  }

  return (
    <div className="mt-2 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-[#2f0e56]">Vacation Calendar</h2>

        <div className="[&_.react-calendar]:w-full [&_.react-calendar]:border-none [&_.react-calendar]:rounded-xl [&_.react-calendar]:p-2 [&_.react-calendar]:text-sm [&_.react-calendar]:font-medium [&_.react-calendar]:bg-white">
				<Calendar
            value={date}
            onChange={handleDateChange}
            tileClassName={({ date }) => {
              const highlightDates = getHighlightDates(date)
              const normalizedDate = normalizeDate(date)
              const isHighlighted = highlightDates.some((highlightedDate) => normalizedDate.getTime() === highlightedDate.getTime());

              if (isHighlighted) {
                return "bg-teal-600 text-yellow-600 !important"
              }

              return ""
            }}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ff802b] text-white px-4 py-2 rounded-md hover:bg-[#e56c46] transition duration-300"
          >
            Request Vacation
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <VacationRequestForm
						addVacationRequest={addVacationRequest}
            selectedDate={date} 
            onClose={() => setIsModalOpen(false)} 
            onSubmit={addVacationRequest}
          />
        </Modal>
      )}
    </div>
  )
}

export default VacationCalendar
