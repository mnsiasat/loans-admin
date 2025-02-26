'use server'

import { Decimal } from '@prisma/client/runtime/library'
import { CreateLoanDto } from '@/dto/loan.dto'
import { Loan, Status } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export interface CountPerStatus {
  count: number
  loanStatus: Status
}

export const getSummary = async (): Promise<CountPerStatus[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/loans/summary`)
  const data = await res.json()
  let summary: CountPerStatus[] = []

  if (Array.isArray(data)) {
    summary = data.map((item) => ({
      loanStatus: item.status,
      count: item._count.status,
    }))
  } else {
    console.error('Response is not an array')
  }
  return summary
}

export const getLoans = async (): Promise<Loan[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/loans`)
  return res.json()
}

export const deleteLoan = async (id: string) => {
  await fetch(`${process.env.BASE_URL}/api/loans/${id}`, {
    method: 'DELETE',
  })
  revalidatePath('/')
}

export const saveLoan = async (formData: FormData) => {
  const input = {
    id: formData.get('id') as string,
    applicantName: formData.get('applicantName') as string,
    requestedAmount: Number(formData.get('requestedAmount')),
    status: formData.get('status') as string,
  }

  let response: Response | null

  if (input.id) {
    response = await fetch(`${process.env.BASE_URL}/api/loans/${input.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  } else {
    response = await fetch(`${process.env.BASE_URL}/api/loans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...input,
        id: undefined,
        status: undefined,
      }),
    })
  }

  if (!response.ok) {
    const { errors } = await response.json()
    console.log(errors)
    // setErrors(errors || ['Something went wrong'])
    return
  }
  revalidatePath('/')
}
