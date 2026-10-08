import React, { useState } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Info,
  Check,
  X,
  Sparkles,
} from 'lucide-react'
import { formatRupees } from '../utils/formatters'
import { categorySuggestions } from '../data/initialData'

export function ExpenseSetup({
  expenses = [],
  monthlyIncome,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onNext,
  onBack,
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Form states for adding/editing
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('Variable')
  const [error, setError] = useState('')

  const totalPlannedExpenses = expenses.reduce((acc, exp) => acc + (Number(exp.amount) || 0), 0)
  const remainingExpected = monthlyIncome - totalPlannedExpenses

  const handleOpenAdd = () => {
    setName('')
    setAmount('')
    setType('Variable')
    setError('')
    setEditingId(null)
    setIsAdding(true)
  }

  const handleStartEdit = (exp) => {
    setName(exp.name)
    setAmount(String(exp.amount))
    setType(exp.type)
    setError('')
    setEditingId(exp.id)
    setIsAdding(true)
  }

  const handleSaveExpense = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please provide a category name')
      return
    }
    const numAmt = Number(amount)
    if (!numAmt || numAmt <= 0) {
      setError('Please provide a valid expense amount')
      return
    }

    if (editingId) {
      onUpdateExpense(editingId, {
        name: name.trim(),
        amount: numAmt,
        type,
      })
    } else {
      onAddExpense({
        name: name.trim(),
        amount: numAmt,
        type,
      })
    }

    setIsAdding(false)
    setEditingId(null)
    setName('')
    setAmount('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between px-4 py-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full z-10 flex-1 flex flex-col">
        {/* Navigation & Step */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Goals</span>
          </button>
          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 2 of 3: Expense Setup
          </div>
        </div>

        {/* Header & Income Preview Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Where does your money go?
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Set your monthly bills and typical campus expenses.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-white/10 px-4 py-2.5 rounded-2xl">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Total Planned
              </span>
              <span className="text-sm font-extrabold text-white">
                {formatRupees(totalPlannedExpenses)}
              </span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Remaining
              </span>
              <span
                className={`text-sm font-extrabold ${
                  remainingExpected >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatRupees(remainingExpected)}
              </span>
            </div>
          </div>
        </div>

        {/* Informative Guidance Callout */}
        <div className="rounded-2xl p-4 bg-slate-900/60 border border-teal-500/20 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">
              Fixed vs Variable Expenses:
            </span>
            Variable expenses can change from month to month (food, electricity, outings). We'll use
            your usual amount for planning and compare it with your actual spending later.
          </div>
        </div>

        {/* Expenses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-white/20 transition flex items-center justify-between group shadow-sm"
            >
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-base">{exp.name}</span>
                  {/* Fixed / Variable Badge & Toggle */}
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateExpense(exp.id, {
                        type: exp.type === 'Fixed' ? 'Variable' : 'Fixed',
                      })
                    }
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition cursor-pointer ${
                      exp.type === 'Fixed'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                    }`}
                    title="Click to toggle between Fixed and Variable"
                  >
                    {exp.type}
                  </button>
                </div>
                <div className="text-xs text-slate-400">
                  {exp.type === 'Variable' ? 'Usual / Avg Monthly:' : 'Fixed Monthly:'}{' '}
                  <span className="font-bold text-slate-200">{formatRupees(exp.amount)}</span>
                </div>
              </div>

              {/* Action Buttons: Edit, Delete */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStartEdit(exp)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Edit amount or name"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteExpense(exp.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                  title="Delete expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Expense Button Card */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="p-4 rounded-2xl border-2 border-dashed border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition flex items-center justify-center gap-2 text-slate-300 hover:text-emerald-400 font-bold text-sm cursor-pointer min-h-[78px]"
          >
            <Plus className="w-5 h-5" />
            <span>+ Add Expense Category</span>
          </button>
        </div>

        {/* Add / Edit Expense Modal Overlay */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <h3 className="font-bold text-lg text-white">
                  {editingId ? 'Edit Expense' : 'Add Custom Expense'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveExpense} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Medical, Shopping, Books"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {categorySuggestions.map((sug) => (
                      <button
                        key={sug.name}
                        type="button"
                        onClick={() => {
                          setName(sug.name)
                          setType(sug.defaultType)
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        +{sug.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {type === 'Variable'
                      ? 'Usual / Average Monthly Amount (₹)'
                      : 'Fixed Monthly Amount (₹)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Expense Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setType('Variable')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        type === 'Variable'
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                          : 'bg-slate-800/50 text-slate-400 border-white/5'
                      }`}
                    >
                      Variable (Flexible)
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('Fixed')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        type === 'Fixed'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                          : 'bg-slate-800/50 text-slate-400 border-white/5'
                      }`}
                    >
                      Fixed (Committed)
                    </button>
                  </div>
                </div>

                {error && <p className="text-xs text-rose-400">{error}</p>}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-2 rounded-xl border border-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                  >
                    {editingId ? 'Save Changes' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom CTA to Build Plan */}
        <div className="pt-4 mt-auto">
          <button
            type="button"
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Build My Plan →</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
