import { useEffect, useState } from "react";
import { User, VacationRequest } from "../../types";

const VacationRequests = ({ vacationRequests }: { vacationRequests: VacationRequest[] }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
  
    useEffect(() => {
      // Get users and vacation requests from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      const loggedInUser = JSON.parse(localStorage.getItem('User') || '[]')
      const user = users.find((u: User) => u.id === loggedInUser?.id)
      if (user) {
        setCurrentUser(user)
        vacationRequests.filter((request: VacationRequest) => request.userId === user.id)
      }
    }, [])

  return (
    <div>
    {currentUser && (
      <>
        <h2 className="text-2xl font-bold text-[#2f0e56] mb-2 mt-2">My Vacation Requests</h2>
        <div className="overflow-x-auto bg-white text-sm rounded-2xl shadow-md">
        <table className="min-w-full text-sm bg-white rounded-2xl">
            <thead className="bg-[#f8f4fc] text-[#2f0e56] font-semibold">
                <tr>
                <th className="px-4 py-2 border border-gray-300">Requested By</th>
                <th className="px-4 py-2 border border-gray-300">Start Date</th>
                <th className="px-4 py-2 border border-gray-300">End Date</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Approved By</th>
                <th className="px-4 py-2 border border-gray-300">Approved Date</th>
                </tr>
            </thead>
            <tbody>
                {vacationRequests.map((request: VacationRequest) => (
                <tr key={request.id} className="hover:bg-gray-50 transition text-center">
                    <td className="px-4 py-2 border border-gray-300">{request.requestedBy}</td>
                    <td className="px-4 py-2 border border-gray-300">{request.startDate}</td>
                    <td className="px-4 py-2 border border-gray-300">{request.endDate}</td>
                    <td className="px-4 py-2 border border-gray-300">{request.status}</td>
                    <td className="bpx-4 py-2 border border-gray-300">
                        {request.status === 'approved' ? request.approvedBy : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                        {request.status === 'approved' ? request.approvedDate : 'N/A'}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </>
    )}
  </div>
  
  );
};

export default VacationRequests;
