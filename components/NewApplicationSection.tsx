'use client'

import LoanForm from '@/components/LoanForm'
import { useLoansContext } from '@/app/context/LoansContext'

export default function NewApplicationSection() {
  const { isOpen, openModal, setCurrentLoan } = useLoansContext()

  const onClickHandler = () => {
    setCurrentLoan(null)
    openModal()
  }

  return (
    <>
      <div className="flex space-x-2 mt-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          onClick={onClickHandler}
        >
          + Add New Loan Application
        </button>
      </div>
      {isOpen && <LoanForm />}
    </>
  )
}
