import React from 'react'
import { Target, Calendar, Sparkles, TrendingUp } from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function SavingsGoalCard({ plan, goalTitle }) {
  const {
    cumulativeSaved,
    goal,
    amountToGo,
    goalProgressPercent,
    deadlineMonths,
    requiredMonthlySavings,
  } = plan

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-emerald-500/20 p-6 backdrop-blur-xl relative overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Primary Goal
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Active Target
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {goalTitle || 'Campus Savings Goal'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-white/5 text-xs text-slate-300">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Deadline: {deadlineMonths} Months</span>
        </div>
      </div>

      {/* Progress Amount & Goal numbers */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {formatRupees(cumulativeSaved)}{' '}
            <span className="text-sm sm:text-base font-normal text-slate-400">
              / {formatRupees(goal)}
            </span>
          </div>
          <div className="text-sm font-semibold text-emerald-400">
            {formatRupees(amountToGo)} to go
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-emerald-300 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${Math.max(3, goalProgressPercent)}%` }}
          />
        </div>
      </div>

      {/* Bottom Insights Footnote */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs">
        <div>
          <span className="text-slate-400 block">Monthly Target Pace</span>
          <span className="font-bold text-white text-sm">
            {formatRupees(requiredMonthlySavings)}/mo
          </span>
        </div>
        <div>
          <span className="text-slate-400 block">Progress</span>
          <span className="font-bold text-emerald-400 text-sm">
            {goalProgressPercent}% Achieved
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-slate-400 block">Projected Finish</span>
          <span className="font-bold text-slate-200 text-sm flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> On Schedule
          </span>
        </div>
      </div>
    </div>
  )
}
