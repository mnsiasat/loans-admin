import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const groupLoans = await prisma.loan.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    })
    return res.status(200).json(groupLoans)
  }
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
