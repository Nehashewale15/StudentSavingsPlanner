export const defaultExpenses = [
  { id: 'exp-1', name: 'Rent', amount: 3000, type: 'Fixed', icon: 'Home' },
  { id: 'exp-2', name: 'Food', amount: 2500, type: 'Variable', icon: 'Utensils' },
  { id: 'exp-3', name: 'Travel', amount: 1000, type: 'Variable', icon: 'Bus' },
  { id: 'exp-4', name: 'Electricity Bill', amount: 800, type: 'Variable', icon: 'Zap' },
  { id: 'exp-5', name: 'Mobile Bill', amount: 500, type: 'Fixed', icon: 'Smartphone' },
]

export const categorySuggestions = [
  { name: 'Medical', defaultType: 'Variable', icon: 'HeartPulse' },
  { name: 'Shopping', defaultType: 'Variable', icon: 'ShoppingBag' },
  { name: 'Groceries', defaultType: 'Variable', icon: 'ShoppingCart' },
  { name: 'Entertainment', defaultType: 'Variable', icon: 'Film' },
  { name: 'College Expenses', defaultType: 'Variable', icon: 'GraduationCap' },
  { name: 'Subscriptions', defaultType: 'Fixed', icon: 'CreditCard' },
  { name: 'Other', defaultType: 'Variable', icon: 'Tag' },
]

export const blankState = {
  monthlyIncome: 10000,
  savingsGoal: 30000,
  deadlineMonths: 12,
  goalTitle: 'Emergency Fund & Laptop',
  expenses: defaultExpenses,
  transactions: [],
  totalSavedToDate: 0,
  hasCompletedSetup: false,
}
