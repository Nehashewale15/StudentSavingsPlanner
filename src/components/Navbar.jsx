import React from 'react'
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  CalendarDays,
  Sliders,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { formatRupees } from '../utils/formatters'

export function Navbar({
  activeTab,
  setActiveTab,
  safeDailySpend,
  onResetDemo,
  onStartFresh,
}) {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'track', label: 'Track Spending', icon: PlusCircle },
    { id: 'charts', label: 'Planned vs Actual', icon: BarChart3 },
    { id: 'weekly', label: 'Weekly Report', icon: CalendarDays },
    { id: 'plan', label: 'My Plan', icon: Sliders },
  ]

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-xl">
                🎯
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  Student Savings Planner
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Campus Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart student money coach & savings tracker
              </p>
            </div>
          </div>

          {/* Safe Daily Spend Pill & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/20">
              <span className="text-xs text-slate-400">Safe Daily Spend:</span>
              <span className="text-xs font-bold text-emerald-400">
                {formatRupees(safeDailySpend)}/day
              </span>
            </div>

            {/* Quick Demo Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-white/5">
              <button
                type="button"
                onClick={onResetDemo}
                className="px-2.5 py-1 text-xs font-medium rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
                title="Load sample college student numbers"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Demo Data</span>
              </button>
              <button
                type="button"
                onClick={onStartFresh}
                className="px-2.5 py-1 text-xs font-medium rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
                title="Start a brand new custom plan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Desktop */}
        <div className="hidden sm:flex items-center space-x-1 border-t border-white/5 pt-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition relative ${
                  isActive
                    ? 'text-emerald-400 bg-slate-900/90 border-t-2 border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}
