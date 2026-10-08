import React, { useState } from 'react'
import { usePlannerState } from './hooks/usePlannerState'

// Components
import { Navbar } from './components/Navbar'
import { Toast } from './components/Toast'
import { ExpenseTrackerModal } from './components/ExpenseTrackerModal'

// Pages / Views
import { WelcomeScreen } from './pages/WelcomeScreen'
import { MoneyGoalSetup } from './pages/MoneyGoalSetup'
import { ExpenseSetup } from './pages/ExpenseSetup'
import { PlanAnalysis } from './pages/PlanAnalysis'
import { Dashboard } from './pages/Dashboard'
import { TrackSpending } from './pages/TrackSpending'
import { PlannedVsActual } from './pages/PlannedVsActual'
import { WeeklyReport } from './pages/WeeklyReport'
import { MyPlan } from './pages/MyPlan'

export default function App() {
  const {
    state,
    currentScreen,
    setCurrentScreen,
    activeTab,
    setActiveTab,
    plan,
    categoryBreakdowns,
    weeklyMetrics,
    insights,
    toast,
    showToast,
    updateMoneyGoal,
    addExpense,
    updateExpense,
    deleteExpense,
    addTransaction,
    deleteTransaction,
    completeSetup,
    resetToDemo,
    startFromScratch,
  } = usePlannerState()

  // Modal for quick adding daily expense from anywhere
  const [isQuickExpenseOpen, setIsQuickExpenseOpen] = useState(false)

  // 1. Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <>
        <WelcomeScreen
          onStart={() => setCurrentScreen('setup-money')}
          onDemo={resetToDemo}
        />
        <Toast toast={toast} onClose={() => {}} />
      </>
    )
  }

  // 2. Setup Step 1: Money & Goal Setup
  if (currentScreen === 'setup-money') {
    return (
      <>
        <MoneyGoalSetup
          initialData={state}
          onNext={(data) => {
            updateMoneyGoal(data)
            setCurrentScreen('setup-expenses')
          }}
          onBack={() => setCurrentScreen('welcome')}
        />
        <Toast toast={toast} onClose={() => {}} />
      </>
    )
  }

  // 3. Setup Step 2: Expense Setup
  if (currentScreen === 'setup-expenses') {
    return (
      <>
        <ExpenseSetup
          expenses={state.expenses}
          monthlyIncome={state.monthlyIncome}
          onAddExpense={addExpense}
          onUpdateExpense={updateExpense}
          onDeleteExpense={deleteExpense}
          onNext={() => setCurrentScreen('plan-analysis')}
          onBack={() => setCurrentScreen('setup-money')}
        />
        <Toast toast={toast} onClose={() => {}} />
      </>
    )
  }

  // 4. Setup Step 3: Plan Analysis
  if (currentScreen === 'plan-analysis') {
    return (
      <>
        <PlanAnalysis
          plan={plan}
          categoryBreakdowns={categoryBreakdowns}
          onGoToDashboard={completeSetup}
          onBack={() => setCurrentScreen('setup-expenses')}
        />
        <Toast toast={toast} onClose={() => {}} />
      </>
    )
  }

  // 5. Main Application Screen (Dashboard, Track Spending, Charts, Weekly Report, My Plan)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Persistent Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        safeDailySpend={plan.safeDailySpend}
        onResetDemo={resetToDemo}
        onStartFresh={startFromScratch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 z-10">
        {activeTab === 'overview' && (
          <Dashboard
            plan={plan}
            goalTitle={state.goalTitle}
            categoryBreakdowns={categoryBreakdowns}
            insights={insights}
            onOpenAddExpense={() => setIsQuickExpenseOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'track' && (
          <TrackSpending
            transactions={state.transactions}
            categories={state.expenses}
            monthlyIncome={state.monthlyIncome}
            totalActualSpent={plan.totalActualSpent}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        )}

        {activeTab === 'charts' && (
          <PlannedVsActual state={state} plan={plan} />
        )}

        {activeTab === 'weekly' && (
          <WeeklyReport weeklyMetrics={weeklyMetrics} plan={plan} />
        )}

        {activeTab === 'plan' && (
          <MyPlan
            state={state}
            plan={plan}
            onUpdateMoneyGoal={updateMoneyGoal}
            onAddExpense={addExpense}
            onUpdateExpense={updateExpense}
            onDeleteExpense={deleteExpense}
            onResetDemo={resetToDemo}
            onStartFresh={startFromScratch}
          />
        )}
      </main>

      {/* Quick Add Expense Modal */}
      <ExpenseTrackerModal
        isOpen={isQuickExpenseOpen}
        onClose={() => setIsQuickExpenseOpen(false)}
        categories={state.expenses}
        onAddExpense={addTransaction}
      />

      {/* Floating Notifications */}
      <Toast toast={toast} onClose={() => {}} />
    </div>
  )
}
