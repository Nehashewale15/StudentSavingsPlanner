import React from 'react'
import { Wallet, TrendingDown, PiggyBank, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function SummaryCards({ plan }) {
  const {
    income,
    totalActualSpent,
    totalPlannedExpenses,
    currentMonthActualSaved,
    goal,
    requiredMonthlySavings,
  } = plan

  const cards = [
    {
      id: 'income',
      title: 'MONTHLY INCOME',
      value: formatRupees(income),
      subtext: 'Pocket money / allowance',
      icon: Wallet,
      color: 'from-blue-500/20 to-indigo-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      badge: 'Budget Base',
      badgeColor: 'bg-blue-500/10 text-blue-400',
    },
    {
      id: 'spent',
      title: 'SPENT THIS MONTH',
      value: formatRupees(totalActualSpent),
      subtext: `Planned: ${formatRupees(totalPlannedExpenses)}`,
      icon: TrendingDown,
      color: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      badge: totalActualSpent > totalPlannedExpenses ? 'Above Plan' : 'Within Budget',
      badgeColor:
        totalActualSpent > totalPlannedExpenses
          ? 'bg-rose-500/10 text-rose-400'
          : 'bg-amber-500/10 text-amber-400',
    },
    {
      id: 'saved',
      title: 'CURRENT SAVINGS',
      value: formatRupees(currentMonthActualSaved),
      subtext: `Required: ${formatRupees(requiredMonthlySavings)}/mo`,
      icon: PiggyBank,
      color: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      badge: currentMonthActualSaved >= requiredMonthlySavings ? 'On Track' : 'Needs Care',
      badgeColor:
        currentMonthActualSaved >= requiredMonthlySavings
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'bg-orange-500/10 text-orange-400',
    },
    {
      id: 'goal',
      title: 'SAVINGS GOAL',
      value: formatRupees(goal),
      subtext: `Target in ${plan.deadlineMonths} months`,
      icon: Target,
      color: 'from-purple-500/20 to-pink-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
      badge: `${plan.goalProgressPercent}% Done`,
      badgeColor: 'bg-purple-500/10 text-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl bg-slate-900/70 border ${card.borderColor} p-5 backdrop-blur-xl transition hover:scale-[1.01] hover:shadow-xl`}
          >
            {/* Ambient subtle glow background */}
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${card.color} rounded-full blur-2xl pointer-events-none`}
            />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                {card.title}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </div>
              <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-white/5 ${card.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
              <span>{card.subtext}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
