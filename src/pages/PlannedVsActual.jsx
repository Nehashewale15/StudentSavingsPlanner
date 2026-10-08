import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { formatRupees } from '../utils/formatters'
import { BarChart3, TrendingUp, Sparkles, Target } from 'lucide-react'

export function PlannedVsActual({ state, plan }) {
  const historyData = state.monthlyHistory || [
    { month: 'Month 1', planned: 2500, actual: 2200, cumulative: 2200, status: 'Short by ₹300' },
    { month: 'Month 2', planned: 2500, actual: 2700, cumulative: 4900, status: 'Saved +₹200' },
    { month: 'Month 3', planned: 2500, actual: 2400, cumulative: 7300, status: 'Close to Target' },
    { month: 'Month 4', planned: 2500, actual: 2600, cumulative: 9900, status: 'Ahead +₹100' },
    { month: 'Month 5 (Now)', planned: 2500, actual: 2200, cumulative: 12500, status: 'Current Pace' },
  ]

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-white/10 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <div className="font-bold text-white mb-1">{label}</div>
          <div className="text-teal-400 flex items-center justify-between gap-4">
            <span>Planned Savings:</span>
            <span className="font-bold">{formatRupees(payload[0].value)}</span>
          </div>
          <div className="text-emerald-400 flex items-center justify-between gap-4">
            <span>Actual Savings:</span>
            <span className="font-bold">{formatRupees(payload[1].value)}</span>
          </div>
          <div className="text-slate-400 text-[10px] pt-1 border-t border-white/5">
            Difference: {formatRupees(payload[1].value - payload[0].value)}
          </div>
        </div>
      )
    }
    return null
  }

  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-white/10 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <div className="font-bold text-white mb-1">{label}</div>
          <div className="text-purple-400 flex items-center justify-between gap-4">
            <span>Cumulative Saved:</span>
            <span className="font-bold">{formatRupees(payload[0].value)}</span>
          </div>
          <div className="text-slate-400 text-[10px]">
            Target: {formatRupees(plan.goal)}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Planned vs Actual Savings</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compare monthly savings trajectory against your required savings pace.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <Target className="w-4 h-4" />
          <span>Goal Target: {formatRupees(plan.goal)}</span>
        </div>
      </div>

      {/* Main Interactive Bar Chart */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-lg text-white">Monthly Comparison</h3>
            <p className="text-xs text-slate-400">
              Planned target vs actual money saved into your goal
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-teal-500" />
              <span className="text-slate-300">Planned Savings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-400" />
              <span className="text-slate-300">Actual Savings</span>
            </div>
          </div>
        </div>

        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={historyData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="planned" fill="#0d9488" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="actual" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Goal Progress Line Chart */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Cumulative Savings Growth</span>
            </h3>
            <p className="text-xs text-slate-400">
              Total accumulated savings climbing toward {formatRupees(plan.goal)}
            </p>
          </div>

          <div className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            {plan.goalProgressPercent}% of Total Target
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={historyData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Summary Breakdown Table */}
      <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl">
        <h3 className="font-bold text-base text-white mb-4">Historical Month Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Period</th>
                <th className="py-2.5 px-3">Planned Savings</th>
                <th className="py-2.5 px-3">Actual Saved</th>
                <th className="py-2.5 px-3">Variance</th>
                <th className="py-2.5 px-3">Cumulative Total</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {historyData.map((row) => {
                const diff = row.actual - row.planned
                return (
                  <tr key={row.month} className="hover:bg-slate-800/20 transition">
                    <td className="py-3 px-3 font-bold text-white">{row.month}</td>
                    <td className="py-3 px-3">{formatRupees(row.planned)}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">
                      {formatRupees(row.actual)}
                    </td>
                    <td
                      className={`py-3 px-3 font-semibold ${
                        diff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {diff >= 0 ? `+${formatRupees(diff)}` : `-${formatRupees(Math.abs(diff))}`}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-white">
                      {formatRupees(row.cumulative)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-white/5 font-semibold text-slate-300">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
