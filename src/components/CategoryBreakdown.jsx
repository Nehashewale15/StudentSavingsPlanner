import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatRupees } from '../utils/formatters'
import { AlertTriangle, Sparkles, PieChart as PieIcon } from 'lucide-react'

const CATEGORY_COLORS = [
  '#10b981', // emerald
  '#6366f1', // indigo
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#14b8a6', // teal
  '#f97316', // orange
]

export function CategoryBreakdown({ categoryBreakdowns = [] }) {
  // Sort categories by highest planned amount
  const sortedCategories = [...categoryBreakdowns].sort((a, b) => b.planned - a.planned)

  // Chart data
  const chartData = sortedCategories.map((c) => ({
    name: c.name,
    value: c.actual > 0 ? c.actual : c.planned,
    type: c.type,
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900 border border-white/10 p-2.5 rounded-lg shadow-xl text-xs">
          <div className="font-bold text-white">{data.name}</div>
          <div className="text-emerald-400 font-semibold">{formatRupees(data.value)}</div>
          <div className="text-slate-400 text-[10px]">{data.type} Expense</div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Expense Category Breakdown</h3>
            <p className="text-xs text-slate-400">
              Planned vs Actual spending with flexible cost detection
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Visual Progress Bars with Highlights */}
        <div className="lg:col-span-7 space-y-4">
          {sortedCategories.map((cat, idx) => {
            const isHighest = idx === 0
            const isOverspent = cat.isOverspent
            const isVariable = cat.type === 'Variable'

            return (
              <div
                key={cat.id || cat.name}
                className="p-3 rounded-xl bg-slate-800/40 border border-white/5 hover:border-white/10 transition"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{cat.name}</span>
                    {isVariable && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        Variable
                      </span>
                    )}
                    {isHighest && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Top Expense
                      </span>
                    )}
                    {isOverspent && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Over Budget
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-white">
                      {formatRupees(cat.actual)}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        / {formatRupees(cat.planned)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar comparing actual vs planned */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverspent
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, cat.percentUsed))}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                  <span>{cat.percentUsed}% of budget used</span>
                  <span>
                    {cat.diff > 0
                      ? `Exceeded by ${formatRupees(cat.diff)}`
                      : `${formatRupees(Math.abs(cat.diff))} remaining`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Recharts Donut Breakdown */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/40 rounded-xl border border-white/5">
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2 text-[11px] text-slate-400">
            {sortedCategories.slice(0, 5).map((cat, index) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                  }}
                />
                <span className="text-slate-300">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
