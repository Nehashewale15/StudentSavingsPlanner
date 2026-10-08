import React from 'react'
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function WelcomeScreen({ onStart, onDemo }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center text-xl">
              🎯
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              Student Savings Planner
            </span>
            <span className="block text-[11px] text-emerald-400 font-semibold">
              Campus Money Coach
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onDemo}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Launch Demo Data</span>
        </button>
      </header>

      {/* Main Welcome Content */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 flex-1">
        {/* Left Column: Heading, Subtitle, Prominent Button */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUILT FOR COLLEGE STUDENTS • 100% FREE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Take control of your money.{' '}
            <span className="inline-block transform hover:rotate-12 transition-transform duration-300">
              🎯
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl">
            Plan your spending, track your savings, and reach your goal without the stress.
          </p>

          {/* Student Campus Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-slate-300">
              ☕ Daily Safe-to-Spend
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-slate-300">
              📚 Textbooks & Rent
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-medium text-slate-300">
              ⚡ Zero Spreadsheets
            </span>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onStart}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-lg font-bold shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Let's Build My Plan</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>No bank login or credit card required • Takes 2 minutes</span>
          </div>
        </div>

        {/* Right Column: 3D Mascot Showcase */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl p-3 bg-gradient-to-b from-white/10 to-white/0 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="overflow-hidden rounded-2xl bg-slate-900 aspect-square relative">
              <img
                src="/hero-student.jpg"
                alt="Student Savings Planner Mascot with 3D Piggy Bank and Target Dartboard"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floating Highlight 1: Goal */}
            <div className="absolute -top-4 -right-4 bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl rounded-xl p-3 shadow-xl hidden sm:flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-lg">
                💻
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Laptop Goal</div>
                <div className="text-xs font-bold text-white">₹12,500 / ₹30,000</div>
              </div>
            </div>

            {/* Floating Highlight 2: Safe Daily Spend */}
            <div className="absolute -bottom-4 -left-4 bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl rounded-xl p-3 shadow-xl hidden sm:flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 text-lg">
                ☕
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Safe Daily Spend</div>
                <div className="text-xs font-bold text-emerald-400">₹185 / day guilt-free</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3 Pillars Footer Highlight */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-white/5 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Know Exactly What to Spend</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculate daily safe allowances after locking away rent and goal savings.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Flexible Expense Detection</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically identifies where small tweaks save you thousands.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white">Stay On Track Emotionally</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time emojis and personalized coaching guidance based on your actual pace.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
