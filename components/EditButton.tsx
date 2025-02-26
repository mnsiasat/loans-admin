'use client'

import { PencilIcon } from '@heroicons/react/16/solid'
import { useLoansContext } from '@/app/context/LoansContext'
import { Loan } from '@prisma/client'

export default function EditButton({ loan }: { loan: Loan }) {
  const { openModal, setCurrentLoan } = useLoansContext()

  const onClickHandler = () => {
    setCurrentLoan(loan)
    openModal()
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
        onClick={onClickHandler}
      >
        <PencilIcon className="h-5 w-5" />
      </button>
    </>
  )
}
