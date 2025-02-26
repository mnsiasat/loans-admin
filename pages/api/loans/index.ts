import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'
import { CreateLoanDto } from '@/dto/loan.dto'
import validateDTO from '@/utils/validate'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.loan.findMany()
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err)
    }
  } else if (req.method === 'POST') {
    try {
      const validatedData = await validateDTO(CreateLoanDto, req.body)
      if (Array.isArray(validatedData)) {
        return res.status(400).json({ errors: validatedData })
      }
      const loan = await prisma.loan.create({
        data: validatedData,
      })
      return res.status(201).json(loan)
    } catch (err) {
      return res.status(500).json(err)
    }
  }
  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
