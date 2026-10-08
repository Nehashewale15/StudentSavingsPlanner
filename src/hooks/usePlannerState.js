import { useState, useEffect } from 'react'
import { demoState } from '../data/demoData'
import { blankState } from '../data/initialData'
import {
  calculateFinancialPlan,
  calculateCategoryBreakdown,
  calculateWeeklyMetrics,
} from '../utils/calculations'
import { generatePersonalizedInsights } from '../utils/insightsGenerator'

const STORAGE_KEY = 'student_savings_planner_state_v2'

export function usePlannerState() {
  // Initialize state from LocalStorage or demoState
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to read localStorage:', e)
    }
    return demoState
  })

  // Navigation state: always start on welcome screen by default
  const [currentScreen, setCurrentScreen] = useState('welcome')

  // Active dashboard tab if in 'app' screen:
  // 'overview' | 'track' | 'charts' | 'weekly' | 'plan'
  const [activeTab, setActiveTab] = useState('overview')

  // Toast notification state
  const [toast, setToast] = useState(null)

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('Failed to write to localStorage:', e)
    }
  }, [state])

  // Show auto-dismissing toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  // Financial Calculations derived from state
  const plan = calculateFinancialPlan({
    monthlyIncome: state.monthlyIncome,
    savingsGoal: state.savingsGoal,
    deadlineMonths: state.deadlineMonths,
    expenses: state.expenses,
    transactions: state.transactions,
    totalSavedToDate: state.totalSavedToDate,
  })

  const categoryBreakdowns = calculateCategoryBreakdown(state.expenses, state.transactions)

  const weeklyMetrics = calculateWeeklyMetrics(
    state.monthlyIncome,
    plan.totalPlannedExpenses,
    state.transactions,
    state.expenses
  )

  const insights = generatePersonalizedInsights({
    plan,
    categoryBreakdowns,
    weeklyMetrics,
    transactions: state.transactions,
  })

  // State Mutators
  const updateMoneyGoal = (data) => {
    setState((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const addExpense = (newExp) => {
    const expenseWithId = {
      ...newExp,
      id: `exp-${Date.now()}`,
    }
    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, expenseWithId],
    }))
    showToast(`Added ${newExp.name} to expenses`)
  }

  const updateExpense = (id, updatedExp) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((e) => (e.id === id ? { ...e, ...updatedExp } : e)),
    }))
    showToast('Updated expense details')
  }

  const deleteExpense = (id) => {
    const target = state.expenses.find((e) => e.id === id)
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }))
    showToast(`Removed ${target?.name || 'expense'}`, 'info')
  }

  const addTransaction = (transaction) => {
    const newTx = {
      ...transaction,
      id: `tx-${Date.now()}`,
      date: transaction.date || new Date().toISOString().split('T')[0],
    }
    setState((prev) => ({
      ...prev,
      transactions: [newTx, ...prev.transactions],
    }))
    showToast(`Recorded ${transaction.category} expense of ₹${transaction.amount}`)
  }

  const deleteTransaction = (id) => {
    setState((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }))
    showToast('Deleted transaction record', 'info')
  }

  const completeSetup = () => {
    setState((prev) => ({
      ...prev,
      hasCompletedSetup: true,
    }))
    setCurrentScreen('app')
    setActiveTab('overview')
  }

  const resetToDemo = () => {
    setState(demoState)
    setCurrentScreen('app')
    setActiveTab('overview')
    showToast('Loaded demo data for ₹10k income & ₹30k goal', 'success')
  }

  const startFromScratch = () => {
    setState({
      ...blankState,
      expenses: [
        { id: 'exp-1', name: 'Rent', amount: 3000, type: 'Fixed', icon: 'Home' },
        { id: 'exp-2', name: 'Food', amount: 2500, type: 'Variable', icon: 'Utensils' },
        { id: 'exp-3', name: 'Travel', amount: 1000, type: 'Variable', icon: 'Bus' },
        { id: 'exp-4', name: 'Electricity Bill', amount: 800, type: 'Variable', icon: 'Zap' },
        { id: 'exp-5', name: 'Mobile Bill', amount: 500, type: 'Fixed', icon: 'Smartphone' },
      ],
      transactions: [],
      hasCompletedSetup: false,
    })
    setCurrentScreen('setup-money')
    showToast('Starting fresh savings plan setup!', 'info')
  }

  return {
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
  }
}
