import React from 'react'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Zap,
} from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function PlanAnalysis({ plan, categoryBreakdowns, onGoToDashboard, onBack }) {
  const {
    income,
    totalPlannedExpenses,
    requiredMonthlySavings,
    expectedAvailable,
    savingsGap,
    planStatus,
    variablePlannedExpenses,
  } = plan

  const isShort = savingsGap > 0
  const flexibleCategories = categoryBreakdowns
    .filter((c) => c.type === 'Variable')
    .sort((a, b) => b.planned - a.planned)

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Adjust Expenses</span>
          </button>
          <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 3 of 3: Plan Analysis
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 inline-block">
              {isShort ? '🧐' : '🎉'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Plan Analysis & Feasibility
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Here is how your numbers stack up against your goal.
            </p>
          </div>

          {/* 4 Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Income
              </span>
              <span className="text-lg font-extrabold text-white">
                {formatRupees(income)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Planned Costs
              </span>
              <span className="text-lg font-extrabold text-amber-400">
                {formatRupees(totalPlannedExpenses)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Required Save
              </span>
              <span className="text-lg font-extrabold text-purple-400">
                {formatRupees(requiredMonthlySavings)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                Available
              </span>
              <span
                className={`text-lg font-extrabold ${
                  expectedAvailable >= requiredMonthlySavings
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {formatRupees(expectedAvailable)}
              </span>
            </div>
          </div>

          {/* Plan Status Banner */}
          <div
            className={`rounded-2xl p-5 border mb-6 flex items-start gap-4 ${
              isShort
                ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                isShort ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isShort ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  STATUS: {isShort ? 'NEEDS ATTENTION' : 'ON TRACK'}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                {isShort
                  ? `You're ${formatRupees(savingsGap)}/month short of your goal.`
                  : `Your plan is completely on track!`}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {isShort
                  ? `You need ${formatRupees(requiredMonthlySavings)}/month for your goal, but your current planned expenses leave ${formatRupees(expectedAvailable)}. Let's look at your flexible expenses.`
                  : `Your planned budget comfortably leaves ${formatRupees(expectedAvailable)}, leaving you an extra buffer of ${formatRupees(Math.abs(savingsGap))} each month.`}
              </p>
            </div>
          </div>

          {/* Flexible Expense Optimization Opportunity */}
          {isShort && (
            <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-5 mb-6">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Your flexible expenses give you the best opportunity to close this gap.</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                You have {formatRupees(variablePlannedExpenses)} allocated across variable categories.
                Here are concrete ways to balance your budget without drastic sacrifices:
              </p>

              <div className="space-y-2.5">
                {flexibleCategories.slice(0, 3).map((cat) => {
                  const suggestedCut = Math.ceil(savingsGap / Math.max(1, flexibleCategories.length))
                  const newTarget = Math.max(0, cat.planned - suggestedCut)
                  return (
                    <div
                      key={cat.id || cat.name}
                      className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{cat.name}</span>
                        <span className="text-slate-400 text-[11px]">
                          Currently {formatRupees(cat.planned)}/mo
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-semibold block">
                          Reduce by ~{formatRupees(suggestedCut)}/mo
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (Target: {formatRupees(newTarget)}/mo)
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={onGoToDashboard}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to My Dashboard →</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
