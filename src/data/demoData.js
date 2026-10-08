import { defaultExpenses } from './initialData'

const getRelativeDate = (daysAgo) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

export const demoState = {
  monthlyIncome: 10000,
  savingsGoal: 30000,
  deadlineMonths: 12,
  goalTitle: 'MacBook & Semester Cushion 💻',
  expenses: defaultExpenses,
  totalSavedToDate: 12500,
  hasCompletedSetup: true,
  transactions: [
    {
      id: 'tx-1',
      amount: 120,
      category: 'Food',
      date: getRelativeDate(0), // Today
      note: 'College canteen snacks & tea',
    },
    {
      id: 'tx-2',
      amount: 250,
      category: 'Travel',
      date: getRelativeDate(1), // Yesterday
      note: 'Metro card monthly recharge',
    },
    {
      id: 'tx-3',
      amount: 600,
      category: 'Food',
      date: getRelativeDate(3),
      note: 'Dinner outside with project teammates',
    },
    {
      id: 'tx-4',
      amount: 3000,
      category: 'Rent',
      date: getRelativeDate(4),
      note: 'Monthly PG hostel rent paid',
    },
    {
      id: 'tx-5',
      amount: 500,
      category: 'Mobile Bill',
      date: getRelativeDate(6),
      note: '5G Data recharge',
    },
    {
      id: 'tx-6',
      amount: 800,
      category: 'Electricity Bill',
      date: getRelativeDate(8),
      note: 'Room cooler & electricity bill',
    },
    {
      id: 'tx-7',
      amount: 350,
      category: 'Travel',
      date: getRelativeDate(11),
      note: 'Auto ride to hackathon venue',
    },
    {
      id: 'tx-8',
      amount: 1100,
      category: 'Food',
      date: getRelativeDate(14),
      note: 'Mess card renewal fee',
    },
    {
      id: 'tx-9',
      amount: 680,
      category: 'Food',
      date: getRelativeDate(18),
      note: 'Instant noodles & late study snacks',
    },
  ],
  monthlyHistory: [
    { month: 'Month 1', planned: 2500, actual: 2200, cumulative: 2200, status: 'Short by ₹300' },
    { month: 'Month 2', planned: 2500, actual: 2700, cumulative: 4900, status: 'Saved +₹200 Extra' },
    { month: 'Month 3', planned: 2500, actual: 2400, cumulative: 7300, status: 'Close to Target' },
    { month: 'Month 4', planned: 2500, actual: 2600, cumulative: 9900, status: 'Ahead +₹100' },
    { month: 'Month 5 (Now)', planned: 2500, actual: 2200, cumulative: 12500, status: 'Current Pace' },
  ],
}
