import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LoansProvider } from './context/LoansContext'

export const metadata = {
  title: 'Loans Admin',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoansProvider>{children}</LoansProvider>
      </body>
    </html>
  )
}
