/**
 * Core product financial calculations
 */

export function calculateFinancialPlan({
  monthlyIncome = 10000,
  savingsGoal = 30000,
  deadlineMonths = 12,
  expenses = [],
  transactions = [],
  totalSavedToDate = 12500,
}) {
  const income = Math.max(0, Number(monthlyIncome) || 0)
  const goal = Math.max(0, Number(savingsGoal) || 0)
  const months = Math.max(1, Number(deadlineMonths) || 1)

  // Required monthly savings to hit goal by deadline
  const requiredMonthlySavings = goal > 0 ? Math.ceil(goal / months) : 0

  // Planned expense breakdowns
  const totalPlannedExpenses = expenses.reduce((acc, exp) => acc + (Number(exp.amount) || 0), 0)
  const fixedPlannedExpenses = expenses
    .filter((e) => e.type === 'Fixed')
    .reduce((acc, exp) => acc + (Number(exp.amount) || 0), 0)
  const variablePlannedExpenses = expenses
    .filter((e) => e.type === 'Variable')
    .reduce((acc, exp) => acc + (Number(exp.amount) || 0), 0)

  // Expected available for savings after planned expenses
  const expectedAvailable = income - totalPlannedExpenses

  // Planned Savings Gap
  // Gap = Required - Available. If > 0, student is short.
  const savingsGap = requiredMonthlySavings - expectedAvailable

  // Actual transactions calculations (this month's spending)
  const totalActualSpent = transactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0)
  const actualRemaining = Math.max(0, income - totalActualSpent)
  const currentMonthActualSaved = Math.max(0, income - totalActualSpent)

  // Total cumulative savings (Base accumulated + this month's saved)
  const cumulativeSaved = Math.min(goal, totalSavedToDate)
  const amountToGo = Math.max(0, goal - cumulativeSaved)
  const goalProgressPercent = goal > 0 ? Math.min(100, Math.round((cumulativeSaved / goal) * 100)) : 100

  // Determine overall status
  let planStatus = 'ON_TRACK'
  if (cumulativeSaved >= goal && goal > 0) {
    planStatus = 'GOAL_ACHIEVED'
  } else if (savingsGap <= 0) {
    planStatus = 'ON_TRACK'
  } else if (savingsGap <= requiredMonthlySavings * 0.25) {
    planStatus = 'SLIGHTLY_AT_RISK'
  } else {
    planStatus = 'AT_RISK'
  }

  // Safe daily spend estimate (Remaining money divided by remaining days in month ~ 30)
  const safeDailySpend = Math.max(0, Math.round((income - fixedPlannedExpenses - requiredMonthlySavings) / 30))

  return {
    income,
    goal,
    deadlineMonths: months,
    requiredMonthlySavings,
    totalPlannedExpenses,
    fixedPlannedExpenses,
    variablePlannedExpenses,
    expectedAvailable,
    savingsGap,
    planStatus,
    totalActualSpent,
    actualRemaining,
    currentMonthActualSaved,
    cumulativeSaved,
    amountToGo,
    goalProgressPercent,
    safeDailySpend,
  }
}

/**
 * Calculate Category-level Planned vs Actual spending
 */
export function calculateCategoryBreakdown(expenses = [], transactions = []) {
  return expenses.map((exp) => {
    const planned = Number(exp.amount) || 0
    const actual = transactions
      .filter((t) => t.category.toLowerCase().trim() === exp.name.toLowerCase().trim())
      .reduce((acc, t) => acc + (Number(t.amount) || 0), 0)

    const diff = actual - planned
    const percentUsed = planned > 0 ? Math.round((actual / planned) * 100) : 0
    const isOverspent = actual > planned

    return {
      id: exp.id,
      name: exp.name,
      type: exp.type,
      planned,
      actual,
      diff,
      percentUsed,
      isOverspent,
    }
  })
}

/**
 * Calculate Weekly Report metrics from transactions
 */
export function calculateWeeklyMetrics(income, plannedExpenses, transactions = [], expenses = []) {
  const now = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(now.getDate() - 7)

  // Filter transactions in the last 7 days
  const recentTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date)
    return txDate >= sevenDaysAgo && txDate <= now
  })

  const spentThisWeek = recentTransactions.reduce((acc, t) => acc + (Number(t.amount) || 0), 0)
  const plannedWeeklyExpenses = Math.round(plannedExpenses / 4.2)
  const plannedWeeklyIncome = Math.round(income / 4.2)
  const savedThisWeek = Math.max(0, plannedWeeklyIncome - spentThisWeek)

  // Find largest spending category this week
  const categoryTotals = {}
  recentTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount)
  })

  let largestCategory = 'None'
  let largestAmount = 0
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > largestAmount) {
      largestAmount = amt
      largestCategory = cat
    }
  })

  // Compare with planned category budget for that category
  const matchingPlan = expenses.find((e) => e.name.toLowerCase().trim() === largestCategory.toLowerCase().trim())
  const plannedCategoryWeekly = matchingPlan ? Math.round(Number(matchingPlan.amount) / 4.2) : 0
  const categoryDiff = largestAmount - plannedCategoryWeekly

  return {
    spentThisWeek,
    savedThisWeek,
    plannedWeeklyExpenses,
    largestCategory,
    largestAmount,
    plannedCategoryWeekly,
    categoryDiff,
    isAbovePlanned: spentThisWeek > plannedWeeklyExpenses,
  }
}
