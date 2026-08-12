import React from 'react'

export const ErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-6 text-center max-w-md">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-slate-300">{message ?? 'Unable to fetch weather data.'}</p>
        <div className="mt-4 flex justify-center gap-3">
          <button className="btn" onClick={onRetry}>Retry</button>
        </div>
      </div>
    </div>
  )
}
