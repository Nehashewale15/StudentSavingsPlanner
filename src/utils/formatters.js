/**
 * Format numeric value to Indian Rupee currency string
 * e.g. 10000 -> "₹10,000"
 */
export function formatRupees(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0'
  }
  const numericAmount = Math.round(Number(amount))
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount)
}

/**
 * Format raw number with Indian numbering system
 */
export function formatNumber(value) {
  if (value === undefined || value === null || isNaN(value)) {
    return '0'
  }
  return new Intl.NumberFormat('en-IN').format(Math.round(Number(value)))
}

/**
 * Format date string into human friendly label
 */
export function formatDate(dateStr) {
  if (!dateStr) return 'Today'
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Get greeting according to hour
 */
export function getTimeGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning ☀️'
  if (hour < 17) return 'Good afternoon 🌤️'
  return 'Good evening 🌙'
}
