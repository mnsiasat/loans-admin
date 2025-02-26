'use client'

import { saveLoan } from '@/service/actions'
import { useFormStatus } from 'react-dom'
import { useLoansContext } from '@/app/context/LoansContext'
import { Status } from '@prisma/client'

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
      disabled={pending}
    >
      {pending ? 'Submitting ... ' : 'Submit'}
    </button>
  )
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>, closeModal: () => void) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  saveLoan(formData)
  closeModal()
}

export default function LoanForm() {
  const { isOpen, closeModal, currentLoan } = useLoansContext()

  if (!isOpen) return null

  const statusOptions = Object.values(Status)

  return (
    <div className="fixed inset-0 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">New Loan Application</h2>
        <form onSubmit={(e) => handleSubmit(e, closeModal)}>
          <label className="block mb-2">
            ID:
            <input
              type="string"
              name="id"
              value={currentLoan ? currentLoan.id : ''}
              className="w-full p-2 border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed rounded-lg overflow-x-auto"
              readOnly
            />
          </label>
          <label className="block mb-2">
            Applicant Name:
            <input
              type="string"
              name="applicantName"
              defaultValue={currentLoan ? currentLoan.applicantName : ''}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Loan Amount:
            <input
              type="number"
              name="requestedAmount"
              defaultValue={currentLoan ? Number(currentLoan.requestedAmount) : 0}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          {currentLoan?.id && (
            <label className="block mb-2">
              Status:
              <div className="relative w-full max-w-sm">
                <select
                  name="status"
                  defaultValue={currentLoan?.status ? currentLoan.status : ''}
                  className="w-full appearance-none border border-gray-300 bg-white rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a status...
                  </option>
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">⌄</div>
              </div>
            </label>
          )}
          <div className="flex justify-end mt-4 gap-4">
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              onClick={closeModal}
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
