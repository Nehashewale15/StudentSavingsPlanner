import React, { useState } from 'react'
import { X, Plus, Calendar, Tag, FileText, IndianRupee } from 'lucide-react'

export function ExpenseTrackerModal({ isOpen, onClose, categories = [], onAddExpense }) {
  if (!isOpen) return null

  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0]?.name || 'Food')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  const quickAmounts = [50, 100, 200, 500, 1000]

  const handleSubmit = (e) => {
    e.preventDefault()
    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount <= 0) {
      setError('Please enter a valid expense amount')
      return
    }

    onAddExpense({
      amount: numericAmount,
      category,
      date,
      note: note.trim() || `${category} expense`,
    })

    setAmount('')
    setNote('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Record Daily Spend</h3>
              <p className="text-xs text-slate-400">Quick student expense entry</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Expense Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-lg">
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
                autoFocus
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Quick amount chips */}
            <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-slate-300 border border-white/5 hover:border-emerald-500/40 hover:text-emerald-400 transition"
                >
                  +₹{q}
                </button>
              ))}
            </div>

            {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id || c.name} value={c.name} className="bg-slate-900 text-white">
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. College canteen, Auto ride, Books"
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Spend
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
