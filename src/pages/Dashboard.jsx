import React from 'react'
import { PlusCircle, ArrowRight, Sparkles, TrendingUp, BarChart3, Calendar } from 'lucide-react'
import { getTimeGreeting, formatRupees } from '../utils/formatters'
import { SummaryCards } from '../components/SummaryCards'
import { EmotionalIndicator } from '../components/EmotionalIndicator'
import { SavingsGoalCard } from '../components/SavingsGoalCard'
import { AIInsights } from '../components/AIInsights'
import { CategoryBreakdown } from '../components/CategoryBreakdown'

export function Dashboard({
  plan,
  goalTitle,
  categoryBreakdowns,
  insights,
  onOpenAddExpense,
  onNavigateTab,
}) {
  const greeting = getTimeGreeting()

  return (
    <div className="space-y-6 pb-16">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{greeting}</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's how your savings journey is going.
          </p>
        </div>

        {/* Quick CTA to Add Spend */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAddExpense}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Daily Spend</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Summary Cards */}
      <SummaryCards plan={plan} />

      {/* Primary Goal & Emotional Vibe Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SavingsGoalCard plan={plan} goalTitle={goalTitle} />
        </div>
        <div className="lg:col-span-5">
          <EmotionalIndicator plan={plan} />
        </div>
      </div>

      {/* AI Coaching Insights */}
      <AIInsights insights={insights} />

      {/* Category Breakdown (Donut + Progress bars) */}
      <CategoryBreakdown categoryBreakdowns={categoryBreakdowns} />

      {/* Quick Jump Callout to Full Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onNavigateTab('charts')}
          className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/30 text-left transition group backdrop-blur-xl flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Planned vs Actual Charts</h4>
              <p className="text-xs text-slate-400">
                View month-by-month trajectory and cumulative growth
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('weekly')}
          className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-teal-500/30 text-left transition group backdrop-blur-xl flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Weekly Spending Report</h4>
              <p className="text-xs text-slate-400">
                Check 7-day spending pace and largest expense category
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  )
}
