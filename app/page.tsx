import NewApplicationSection from '@/components/NewApplicationSection'
import LoanApplicationList from '@/components/LoanApplicationList'
import SummaryCards from '@/components/SummaryCards'

export default async function Home() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Loan Applications Summary</h1>
      <SummaryCards />
      <NewApplicationSection />
      <button className="bg-gray-700 px-4 py-2 rounded-lg mt-4">🔀 Highest First</button>
      <LoanApplicationList />
    </div>
  )
}
