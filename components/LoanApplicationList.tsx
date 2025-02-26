import { getLoans } from '@/service/actions'
import DeleteButton from '@/components/DeleteButton'
import EditButton from '@/components/EditButton'

export default async function LoanApplicationList() {
  const data = await getLoans()

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-5 bg-gray-800 p-2 font-bold border-b border-gray-700">
        <div className="p-2">ID</div>
        <div className="p-2">Applicant Name</div>
        <div className="p-2">Requested Amount</div>
        <div className="p-2">Status</div>
      </div>
      {data &&
        data.map((loan, index) => (
          <div
            key={index}
            className="grid grid-cols-5 border-b border-gray-700 p-2 items-center"
          >
            <div className="p-2">{loan.id}</div>
            <div className="p-2 flex items-center space-x-2">
              <span>{loan.applicantName}</span>
            </div>
            <div className="p-2">{String(loan.requestedAmount)}</div>
            <div
              className={`p-2 
                ${
                  loan.status === 'REJECTED'
                    ? 'text-red-400'
                    : loan.status === 'PENDING'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                } font-bold`}
            >
              {loan.status}
            </div>
            <div className="p-2 flex space-x-2 justify-center">
              <EditButton loan={loan} />
              <DeleteButton id={loan.id} />
            </div>
          </div>
        ))}
    </div>
  )
}
