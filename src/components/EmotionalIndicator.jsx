import React from 'react'
import { formatRupees } from '../utils/formatters'

export function EmotionalIndicator({ plan }) {
  const {
    cumulativeSaved,
    goal,
    goalProgressPercent,
    savingsGap,
    planStatus,
    amountToGo,
  } = plan

  // Determine emotional emoji and message based on plan health and progress
  let emoji = '😊'
  let statusHeadline = 'On Track'
  let friendlyMessage = "You're doing great — keep going! 😊"
  let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'

  if (planStatus === 'GOAL_ACHIEVED' || cumulativeSaved >= goal) {
    emoji = '🎉'
    statusHeadline = 'Goal Achieved!'
    friendlyMessage = 'Incredible work! You achieved your savings goal! 🎉'
    badgeStyle = 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  } else if (savingsGap > 1500) {
    emoji = '😰'
    statusHeadline = 'Goal At Risk'
    friendlyMessage = "Your goal is at risk. Let's fix the biggest spending gap first. 😰"
    badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  } else if (savingsGap > 500) {
    emoji = '😟'
    statusHeadline = 'Getting Close to Missing Target'
    friendlyMessage = "You're falling behind your required monthly pace. Let's adjust flexible spending. 😟"
    badgeStyle = 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  } else if (savingsGap > 0) {
    emoji = '😐'
    statusHeadline = 'Slightly Behind Plan'
    friendlyMessage = "You're slightly behind your plan. A small adjustment can get you back on track. 😐"
    badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  } else {
    emoji = '😊'
    statusHeadline = 'Smooth Sailing'
    friendlyMessage = "You're on track with your plan — keep going! 😊"
    badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  }

  return (
    <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background glow based on status */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl animate-bounce duration-1000">
              {emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Savings Journey Vibe</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${badgeStyle}`}>
                  {statusHeadline}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">{friendlyMessage}</p>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xs text-slate-400 uppercase font-semibold">Remaining Target</div>
          <div className="text-lg font-bold text-white">{formatRupees(amountToGo)} to go</div>
        </div>
      </div>

      {/* Visual Indicator Track: ₹0 [Emoji] ────── [Goal] */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>₹0 Starting Line</span>
          <span className="text-emerald-400 font-bold">{goalProgressPercent}% Completed</span>
          <span>🎉 {formatRupees(goal)}</span>
        </div>

        {/* Progress bar container */}
        <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-emerald-300 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(4, goalProgressPercent)}%` }}
          />
        </div>

        {/* Progress track label */}
        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
          <span>Saved: {formatRupees(cumulativeSaved)}</span>
          <span className="font-mono text-slate-400">{plan.deadlineMonths} months total plan</span>
        </div>
      </div>
    </div>
  )
}
