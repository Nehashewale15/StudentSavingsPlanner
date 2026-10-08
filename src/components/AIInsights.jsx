import React from 'react'
import {
  Lightbulb,
  AlertCircle,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Sparkles,
  Coffee,
  Flame,
} from 'lucide-react'

export function AIInsights({ insights = [] }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'AlertCircle':
        return AlertCircle
      case 'TrendingDown':
        return TrendingDown
      case 'CheckCircle2':
        return CheckCircle2
      case 'AlertTriangle':
        return AlertTriangle
      case 'Compass':
        return Compass
      case 'Coffee':
        return Coffee
      case 'Flame':
        return Flame
      default:
        return Sparkles
    }
  }

  const getTypeStyle = (type) => {
    switch (type) {
      case 'danger':
        return {
          border: 'border-rose-500/30',
          bg: 'bg-rose-500/5',
          iconColor: 'text-rose-400 bg-rose-500/10',
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        }
      case 'warning':
      case 'opportunity':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          iconColor: 'text-amber-400 bg-amber-500/10',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        }
      case 'success':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-emerald-500/5',
          iconColor: 'text-emerald-400 bg-emerald-500/10',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        }
      case 'tip':
        return {
          border: 'border-teal-500/30',
          bg: 'bg-teal-500/5',
          iconColor: 'text-teal-400 bg-teal-500/10',
          badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        }
      default:
        return {
          border: 'border-indigo-500/30',
          bg: 'bg-indigo-500/5',
          iconColor: 'text-indigo-400 bg-indigo-500/10',
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        }
    }
  }

  return (
    <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Your Personal Money Insight 💡
            </h3>
            <p className="text-xs text-slate-400">
              Personalized advice dynamically calculated from your real numbers
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" /> AI Coach Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const Icon = getIcon(insight.icon)
          const style = getTypeStyle(insight.type)
          return (
            <div
              key={insight.id}
              className={`rounded-xl p-4.5 border ${style.border} ${style.bg} transition hover:scale-[1.01] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                    {insight.badge}
                  </span>
                  <div className={`p-1.5 rounded-lg ${style.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-bold text-sm text-white mb-1.5">
                  {insight.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
