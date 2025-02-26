'use client'

import { TrashIcon } from '@heroicons/react/16/solid'
import { deleteLoan } from '@/service/actions'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <>
      <button
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
        onClick={() => deleteLoan(id)}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </>
  )
}
