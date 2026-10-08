import { formatRupees } from './formatters'

/**
 * Generate personalized, realistic money coaching recommendations
 * based on actual student numbers and spending behaviors.
 */
export function generatePersonalizedInsights({
  plan,
  categoryBreakdowns,
  weeklyMetrics,
  transactions,
}) {
  const insights = []
  const {
    income,
    requiredMonthlySavings,
    expectedAvailable,
    savingsGap,
    variablePlannedExpenses,
  } = plan

  // 1. Core Savings Gap / Surplus Analysis
  if (savingsGap > 0) {
    // Student is short
    insights.push({
      id: 'gap-alert',
      type: 'warning',
      badge: 'Savings Gap',
      title: `You're ${formatRupees(savingsGap)}/month short of your target`,
      description: `You need ${formatRupees(requiredMonthlySavings)}/month to reach your goal on time, but your current budget leaves only ${formatRupees(expectedAvailable)}. You're ${formatRupees(savingsGap)} short.`,
      icon: 'AlertCircle',
    })
  } else {
    // Student is on track or ahead
    const surplus = Math.abs(savingsGap)
    insights.push({
      id: 'on-track-positive',
      type: 'success',
      badge: 'Target Achieved',
      title: `Great job! You're ahead by ${formatRupees(surplus)}/month`,
      description: `Your planned expenses leave ${formatRupees(expectedAvailable)} for savings, which exceeds your required ${formatRupees(requiredMonthlySavings)}/month target.`,
      icon: 'CheckCircle2',
    })
  }

  // 2. Identify the Largest Variable / Flexible Expense Opportunity
  const variableCategories = categoryBreakdowns
    .filter((c) => c.type === 'Variable')
    .sort((a, b) => b.planned - a.planned)

  if (variableCategories.length > 0) {
    const largestVar = variableCategories[0]
    if (savingsGap > 0) {
      const suggestedWeeklyCut = Math.ceil(savingsGap / 4)
      const annualBoost = suggestedWeeklyCut * 52
      insights.push({
        id: 'flexible-cut',
        type: 'opportunity',
        badge: 'High Impact Opportunity',
        title: `Trim ${largestVar.name} to close the gap`,
        description: `${largestVar.name} is your largest flexible expense (${formatRupees(largestVar.planned)}/month). Reducing it by just ${formatRupees(suggestedWeeklyCut)} per week could save you ~${formatRupees(annualBoost)} annually and completely cover your monthly deficit!`,
        icon: 'TrendingDown',
        actionCategory: largestVar.name,
      })
    } else {
      insights.push({
        id: 'flexible-guard',
        type: 'info',
        badge: 'Flexible Expense Spotlight',
        title: `${largestVar.name} is your top variable cost`,
        description: `You have budgeted ${formatRupees(largestVar.planned)} for ${largestVar.name}. Since this is flexible, keeping tabs here protects your ${formatRupees(requiredMonthlySavings)} monthly goal.`,
        icon: 'Compass',
      })
    }
  }

  // 3. Actual Spending Deviation (Check for Overspent Categories)
  const overspentCategories = categoryBreakdowns
    .filter((c) => c.actual > c.planned && c.planned > 0)
    .sort((a, b) => b.diff - a.diff)

  if (overspentCategories.length > 0) {
    const topOver = overspentCategories[0]
    const percentOver = Math.round((topOver.diff / topOver.planned) * 100)
    insights.push({
      id: 'overspend-warning',
      type: 'danger',
      badge: 'Spending Spike',
      title: `${topOver.name} is ${percentOver}% over planned budget`,
      description: `You've spent ${formatRupees(topOver.actual)} on ${topOver.name} against a planned ${formatRupees(topOver.planned)} (${formatRupees(topOver.diff)} over limit). Cooling down this category this week will restore your safety buffer.`,
      icon: 'AlertTriangle',
    })
  }

  // 4. Weekly Spending Momentum
  if (weeklyMetrics && weeklyMetrics.spentThisWeek > 0) {
    if (weeklyMetrics.categoryDiff > 0 && weeklyMetrics.largestCategory !== 'None') {
      insights.push({
        id: 'weekly-rebalance',
        type: 'advice',
        badge: 'Weekly Adjustment',
        title: `Weekly ${weeklyMetrics.largestCategory} pacing tip`,
        description: `You spent ${formatRupees(weeklyMetrics.largestAmount)} on ${weeklyMetrics.largestCategory} this week, which is ${formatRupees(weeklyMetrics.categoryDiff)} above your weekly plan. Reducing it by ${formatRupees(weeklyMetrics.categoryDiff)} next week will balance things out!`,
        icon: 'Sparkles',
      })
    } else if (weeklyMetrics.savedThisWeek > 0) {
      insights.push({
        id: 'weekly-praise',
        type: 'success',
        badge: 'Weekly Win',
        title: `Saved ${formatRupees(weeklyMetrics.savedThisWeek)} this week!`,
        description: `Your spending this week remained comfortably within budget limits. Keep this consistent pace through the weekend!`,
        icon: 'Flame',
      })
    }
  }

  // 5. Daily Safe Spend Guidance
  insights.push({
    id: 'daily-safe-spend',
    type: 'tip',
    badge: 'Daily Safe-to-Spend',
    title: `Your daily safe spend limit: ${formatRupees(plan.safeDailySpend)}/day`,
    description: `After locking away rent/fixed bills and your required ${formatRupees(requiredMonthlySavings)} savings, you can safely spend up to ${formatRupees(plan.safeDailySpend)} every day completely guilt-free.`,
    icon: 'Coffee',
  })

  return insights
}
