import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export function Toast({ toast, onClose }) {
  if (!toast) return null

  const { message, type } = toast

  const isError = type === 'error' || type === 'danger'
  const isInfo = type === 'info'

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-bounce duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm font-medium ${
          isError
            ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
            : isInfo
            ? 'bg-blue-950/90 border-blue-500/30 text-blue-200'
            : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <span>{message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
