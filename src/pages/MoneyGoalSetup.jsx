import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Target, IndianRupee, Calendar, Sparkles } from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function MoneyGoalSetup({ initialData, onNext, onBack }) {
  const [monthlyIncome, setMonthlyIncome] = useState(initialData?.monthlyIncome || 10000)
  const [savingsGoal, setSavingsGoal] = useState(initialData?.savingsGoal || 30000)
  const [deadlineMonths, setDeadlineMonths] = useState(initialData?.deadlineMonths || 12)
  const [goalTitle, setGoalTitle] = useState(initialData?.goalTitle || 'Semester Savings & Laptop')
  const [error, setError] = useState('')

  // Live calculation: Goal / Deadline
  const numericGoal = Number(savingsGoal) || 0
  const numericDeadline = Math.max(1, Number(deadlineMonths) || 1)
  const requiredMonthlySavings = Math.ceil(numericGoal / numericDeadline)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!monthlyIncome || Number(monthlyIncome) <= 0) {
      setError('Please enter your monthly income / pocket money')
      return
    }
    if (!savingsGoal || Number(savingsGoal) <= 0) {
      setError('Please enter a target savings goal amount')
      return
    }
    if (!deadlineMonths || Number(deadlineMonths) < 1) {
      setError('Please choose a valid deadline (at least 1 month)')
      return
    }

    onNext({
      monthlyIncome: Number(monthlyIncome),
      savingsGoal: Number(savingsGoal),
      deadlineMonths: Number(deadlineMonths),
      goalTitle: goalTitle.trim() || 'Savings Goal',
    })
  }

  const quickIncomes = [5000, 8000, 10000, 15000, 20000]
  const quickGoals = [10000, 20000, 30000, 50000]
  const quickDeadlines = [3, 6, 12, 18, 24]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        {/* Step Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 1 of 3: Foundations
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              Let's build your savings plan
            </h2>
            <p className="text-sm text-slate-400">
              Start with your monthly money and what you want to achieve.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Monthly Income */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Monthly Money / Pocket Money Received (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="500"
                  step="100"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(e.target.value)
                    setError('')
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  placeholder="10000"
                />
              </div>

              {/* Quick Suggestions */}
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {quickIncomes.map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setMonthlyIncome(inc)}
                    className={`px-3 py-1 text-xs rounded-lg border transition ${
                      Number(monthlyIncome) === inc
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                        : 'bg-slate-800/70 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    ₹{inc.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Savings Goal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Savings Goal (₹)
                </label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. New Laptop"
                  className="text-xs bg-slate-800/60 border border-white/10 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-emerald-500 w-44 text-right"
                />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-purple-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={savingsGoal}
                  onChange={(e) => {
                    setSavingsGoal(e.target.value)
                    setError('')
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition"
                  placeholder="30000"
                />
              </div>

              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {quickGoals.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSavingsGoal(g)}
                    className={`px-3 py-1 text-xs rounded-lg border transition ${
                      Number(savingsGoal) === g
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                        : 'bg-slate-800/70 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    ₹{g.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Goal Deadline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Goal Deadline (Months)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={deadlineMonths}
                  onChange={(e) => {
                    setDeadlineMonths(e.target.value)
                    setError('')
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3.5 text-lg font-bold text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 transition"
                  placeholder="12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                  Months
                </span>
              </div>

              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {quickDeadlines.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDeadlineMonths(m)}
                    className={`px-3 py-1 text-xs rounded-lg border transition ${
                      Number(deadlineMonths) === m
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                        : 'bg-slate-800/70 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculation Banner (Required by Section 5) */}
            <div className="rounded-2xl p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Live Required Savings</span>
                <span className="text-base sm:text-lg font-extrabold text-white">
                  You need to save{' '}
                  <span className="text-emerald-400 underline decoration-emerald-500/50">
                    {formatRupees(requiredMonthlySavings)}/month
                  </span>{' '}
                  to reach your goal.
                </span>
              </div>
            </div>

            {error && <p className="text-sm text-rose-400 font-medium">{error}</p>}

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Expenses</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
