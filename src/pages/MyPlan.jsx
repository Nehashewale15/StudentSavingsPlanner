import React, { useState } from 'react'
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Sliders,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { formatRupees } from '../utils/formatters'
import { categorySuggestions } from '../data/initialData'

export function MyPlan({
  state,
  plan,
  onUpdateMoneyGoal,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onResetDemo,
  onStartFresh,
}) {
  const [income, setIncome] = useState(state.monthlyIncome)
  const [goal, setGoal] = useState(state.savingsGoal)
  const [deadline, setDeadline] = useState(state.deadlineMonths)
  const [goalTitle, setGoalTitle] = useState(state.goalTitle || 'Primary Savings Goal')

  // Expense modal state
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [expName, setExpName] = useState('')
  const [expAmount, setExpAmount] = useState('')
  const [expType, setExpType] = useState('Variable')
  const [modalError, setModalError] = useState('')

  const handleSaveBudget = (e) => {
    e.preventDefault()
    onUpdateMoneyGoal({
      monthlyIncome: Number(income) || 0,
      savingsGoal: Number(goal) || 0,
      deadlineMonths: Number(deadline) || 1,
      goalTitle: goalTitle.trim(),
    })
  }

  const handleOpenAdd = () => {
    setExpName('')
    setExpAmount('')
    setExpType('Variable')
    setEditingId(null)
    setModalError('')
    setIsAdding(true)
  }

  const handleStartEdit = (exp) => {
    setExpName(exp.name)
    setExpAmount(String(exp.amount))
    setExpType(exp.type)
    setEditingId(exp.id)
    setModalError('')
    setIsAdding(true)
  }

  const handleSaveExpense = (e) => {
    e.preventDefault()
    if (!expName.trim()) {
      setModalError('Please enter category name')
      return
    }
    const numAmt = Number(expAmount)
    if (!numAmt || numAmt <= 0) {
      setModalError('Please enter a valid amount')
      return
    }

    if (editingId) {
      onUpdateExpense(editingId, {
        name: expName.trim(),
        amount: numAmt,
        type: expType,
      })
    } else {
      onAddExpense({
        name: expName.trim(),
        amount: numAmt,
        type: expType,
      })
    }

    setIsAdding(false)
    setEditingId(null)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-7 h-7 text-emerald-400" />
            <span>Customize My Plan</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Modify your monthly income, savings targets, and category allocations. Auto-recalculates instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDemo}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reload Demo Data</span>
          </button>
          <button
            type="button"
            onClick={onStartFresh}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh</span>
          </button>
        </div>
      </div>

      {/* Income & Goal Editor Form */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl">
        <h3 className="font-bold text-base text-white mb-4">Core Money & Goal Parameters</h3>

        <form onSubmit={handleSaveBudget} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Monthly Income (₹)
              </label>
              <input
                type="number"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Goal Name
              </label>
              <input
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Savings Goal (₹)
              </label>
              <input
                type="number"
                min="0"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Deadline (Months)
              </label>
              <input
                type="number"
                min="1"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-slate-400">
              Required Monthly Savings Pace:{' '}
              <span className="font-bold text-emerald-400">
                {formatRupees(Math.ceil((Number(goal) || 0) / Math.max(1, Number(deadline) || 1)))}/mo
              </span>
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Category Management */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-white">Expense Categories</h3>
            <p className="text-xs text-slate-400">
              Add, edit, or adjust planned monthly amounts and type
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {state.expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 hover:border-white/20 transition flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{exp.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateExpense(exp.id, {
                        type: exp.type === 'Fixed' ? 'Variable' : 'Fixed',
                      })
                    }
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition cursor-pointer ${
                      exp.type === 'Fixed'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                    }`}
                    title="Click to toggle type"
                  >
                    {exp.type}
                  </button>
                </div>
                <div className="text-xs text-slate-400">
                  Planned: <span className="font-bold text-white">{formatRupees(exp.amount)}/mo</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStartEdit(exp)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteExpense(exp.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Expense Category Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <h3 className="font-bold text-base text-white">
                {editingId ? 'Edit Category' : 'New Expense Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  value={expName}
                  onChange={(e) => setExpName(e.target.value)}
                  placeholder="e.g. Subscriptions"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                  autoFocus
                />

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {categorySuggestions.map((sug) => (
                    <button
                      key={sug.name}
                      type="button"
                      onClick={() => {
                        setExpName(sug.name)
                        setExpType(sug.defaultType)
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      +{sug.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Monthly Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="500"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExpType('Variable')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      expType === 'Variable'
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                        : 'bg-slate-800/50 text-slate-400 border-white/5'
                    }`}
                  >
                    Variable (Flexible)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpType('Fixed')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      expType === 'Fixed'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                        : 'bg-slate-800/50 text-slate-400 border-white/5'
                    }`}
                  >
                    Fixed (Committed)
                  </button>
                </div>
              </div>

              {modalError && <p className="text-xs text-rose-400">{modalError}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2 rounded-xl border border-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold"
                >
                  {editingId ? 'Save Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
