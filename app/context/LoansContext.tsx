'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Loan } from '@prisma/client'

interface LoansContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  currentLoan: Loan | null
  setCurrentLoan: (loan: Loan | null) => void
}

const LoansContext = createContext<LoansContextType | undefined>(undefined)

export const LoansProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <LoansContext.Provider
      value={{ isOpen, openModal, closeModal, currentLoan, setCurrentLoan }}
    >
      {children}
    </LoansContext.Provider>
  )
}

export const useLoansContext = () => {
  const context = useContext(LoansContext)
  if (!context) {
    throw new Error('useModal must be used within LoansProvider')
  }
  return context
}
