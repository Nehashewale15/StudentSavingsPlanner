import React, { useState } from 'react'
import { Plus, Trash2, Calendar, Tag, FileText, Search, ArrowDownRight, Wallet } from 'lucide-react'
import { formatRupees, formatDate } from '../utils/formatters'

export function TrackSpending({
  transactions = [],
  categories = [],
  monthlyIncome,
  totalActualSpent,
  onAddTransaction,
  onDeleteTransaction,
}) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0]?.name || 'Food')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [error, setError] = useState('')

  const remainingMoney = Math.max(0, monthlyIncome - totalActualSpent)
  const quickAmounts = [50, 100, 200, 500, 1000]

  const handleSubmit = (e) => {
    e.preventDefault()
    const numAmt = Number(amount)
    if (!numAmt || numAmt <= 0) {
      setError('Please enter a valid amount')
      return
    }

    onAddTransaction({
      amount: numAmt,
      category,
      date,
      note: note.trim() || `${category} expense`,
    })

    setAmount('')
    setNote('')
    setError('')
  }

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Track Daily Spending
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Log expenses in seconds to keep your plan and safe daily spend up to date.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/10 px-4 py-2.5 rounded-2xl">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Remaining Money
            </span>
            <span className="text-sm font-extrabold text-emerald-400">
              {formatRupees(remainingMoney)}
            </span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Total Spent
            </span>
            <span className="text-sm font-extrabold text-amber-400">
              {formatRupees(totalActualSpent)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Add Expense Form Card */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
        <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Quick Record Expense</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setError('')
                  }}
                  placeholder="120"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c.id || c.name} value={c.name} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
              </input>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="College canteen, metro..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick Amount Chips & Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <span className="text-xs text-slate-400 self-center mr-1">Quick:</span>
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 border border-white/5 hover:border-emerald-500/40 hover:text-emerald-400 transition"
                >
                  +₹{q}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Expense</span>
            </button>
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}
        </form>
      </div>

      {/* Transactions History Header & Filters */}
      <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-bold text-lg text-white">Expense History</h3>
            <p className="text-xs text-slate-400">
              {transactions.length} transactions recorded this month
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id || c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Wallet className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No expenses recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Add your first spend above to start tracking!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="py-3.5 flex items-center justify-between hover:bg-slate-800/20 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-white/5 text-emerald-400">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {tx.note || tx.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-semibold">
                        {tx.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {formatDate(tx.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base font-extrabold text-white">
                    -{formatRupees(tx.amount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeleteTransaction(tx.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
