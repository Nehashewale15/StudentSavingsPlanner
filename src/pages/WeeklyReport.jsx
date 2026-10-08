import React from 'react'
import { CalendarDays, TrendingDown, PiggyBank, Flame, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function WeeklyReport({ weeklyMetrics, plan }) {
  const {
    spentThisWeek,
    savedThisWeek,
    plannedWeeklyExpenses,
    largestCategory,
    largestAmount,
    plannedCategoryWeekly,
    categoryDiff,
    isAbovePlanned,
  } = weeklyMetrics

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Weekly Report</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          7-day sprint analysis of spending pace, top categories, and savings performance.
        </p>
      </div>

      {/* Primary 4 Metric Cards for This Week */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spent This Week */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              SPENT THIS WEEK
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {formatRupees(spentThisWeek)}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Planned weekly: {formatRupees(plannedWeeklyExpenses)}
          </p>
        </div>

        {/* Saved This Week */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              SAVED THIS WEEK
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {formatRupees(savedThisWeek)}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Remaining allowance safe
          </p>
        </div>

        {/* Largest Spending Category */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              LARGEST CATEGORY
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {largestCategory}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {formatRupees(largestAmount)} spent this week
          </p>
        </div>

        {/* Weekly Pace Status */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-teal-500/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              PACE STATUS
            </span>
            <div
              className={`p-2 rounded-lg ${
                isAbovePlanned ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
              }`}
            >
              {isAbovePlanned ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>
          <div
            className={`text-xl sm:text-2xl font-black ${
              isAbovePlanned ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {isAbovePlanned ? 'Above Plan' : 'On Track'}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {isAbovePlanned
              ? `${formatRupees(spentThisWeek - plannedWeeklyExpenses)} over plan`
              : 'Safely within 7-day budget'}
          </p>
        </div>
      </div>

      {/* Category Weekly Comparison Box */}
      <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl">
        <h3 className="font-bold text-lg text-white mb-2">Weekly Pace Diagnosis</h3>
        <div
          className={`p-4 rounded-xl border mb-4 ${
            categoryDiff > 0
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
          }`}
        >
          <div className="font-bold text-sm mb-1 text-white">
            {categoryDiff > 0
              ? `You're ${formatRupees(categoryDiff)} above your planned weekly ${largestCategory} spending.`
              : `Your weekly ${largestCategory} spending is right on target!`}
          </div>
          <p className="text-xs opacity-90 leading-relaxed">
            Target weekly for {largestCategory}: {formatRupees(plannedCategoryWeekly)}. Actual this
            week: {formatRupees(largestAmount)}.
          </p>
        </div>

        {/* Personalized Coach Actionable Recommendation */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Weekly Coach Recommendation</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {categoryDiff > 0
              ? `If you reduce ${largestCategory} spending by ${formatRupees(categoryDiff)} next week, you'll move directly closer to your monthly savings target without having to cut into essentials.`
              : `You maintained a strong pace this week! Continue keeping daily spends near ${formatRupees(plan.safeDailySpend)}/day to close the month with a comfortable surplus.`}
          </p>
        </div>
      </div>
    </div>
  )
}
