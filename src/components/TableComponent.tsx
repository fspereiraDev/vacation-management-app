import { useState } from 'react';
import { VacationRequest } from "../types";

interface TableProps {
  requests: VacationRequest[];
  showActions: boolean;
  updateRequestStatus?: (id: string, newStatus: 'approved' | 'denied') => void;
}

const TableComponent = ({ requests, showActions, updateRequestStatus }: TableProps) => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = requests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full text-sm bg-white rounded-2xl">
          <thead className="bg-[#f8f4fc] text-[#2f0e56] font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">User</th>
              <th className="px-4 py-2 border border-gray-300">Id</th>
              <th className="px-4 py-2 border border-gray-300">Start Date</th>
              <th className="px-4 py-2 border border-gray-300">End Date</th>
              <th className="px-4 py-2 border border-gray-300">Note</th>
              <th className="px-4 py-2 border border-gray-300">Approved By</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              {showActions && <th className="px-4 py-2 border border-gray-300">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition text-center">
                <td className="px-4 py-2 border border-gray-300">{req.requestedBy}</td>
                <td className="px-4 py-2 border border-gray-300">{req.userId}</td>
                <td className="px-4 py-2 border border-gray-300">{req.startDate}</td>
                <td className="px-4 py-2 border border-gray-300">{req.endDate}</td>
                <td className="px-4 py-2 border border-gray-300">{req.note}</td>
                <td className="px-4 py-2 border border-gray-300">{req.approvedBy}</td>
                <td className="px-4 py-2 border border-gray-300 capitalize">{req.status}</td>
                {showActions && updateRequestStatus && (
                  <td className="py-2 border border-gray-200 flex gap-2 items-center justify-center">
                    <button
                      onClick={() => updateRequestStatus(req.id, 'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateRequestStatus(req.id, 'denied')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs"
                    >
                      Deny
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="p-4 text-center text-gray-500">No vacation requests found.</div>
        )}
      </div>
      {requests.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#2f0e56] text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-[#2f0e56] font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#2f0e56] text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;

