import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const loanId = id as string

  switch (req.method) {
    case 'GET':
      try {
        const loan = await prisma.loan.findUnique({
          where: { id: loanId },
        })
        if (!loan) {
          return res.status(404).json({ message: 'Loan not found' })
        }
        return res.status(200).json(loan)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to retrieve loan' })
      }

    case 'PUT':
      try {
        const updatedLoan = await prisma.loan.update({
          where: { id: loanId },
          data: req.body,
        })
        return res.status(200).json(updatedLoan)
      } catch (error) {
        console.error(error)
        return res.status(400).json({ message: 'Failed to update loan' })
      }

    case 'DELETE':
      try {
        await prisma.loan.delete({
          where: { id: loanId },
        })
        return res.status(204).end()
      } catch (error) {
        console.error(error)
        return res.status(400).json({ message: 'Failed to delete loan' })
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
