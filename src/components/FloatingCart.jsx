import React from 'react'
import { useCart } from '../hooks/useCart'

export default function FloatingCart({ onOpen }) {
  const { totalItems, subtotal } = useCart()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full max-w-sm flex items-center justify-between bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white px-5 py-4 rounded-2xl shadow-warm-lg hover:shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
      >
        {/* Left side — cart icon + count */}
        <div className="flex items-center gap-3">
          <span className="relative">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-brand-600 rounded-full text-xs font-bold flex items-center justify-center animate-pop">
              {totalItems}
            </span>
          </span>
          <span className="font-body font-semibold text-sm">
            {totalItems} item{totalItems > 1 ? 's' : ''} added
          </span>
        </div>

        {/* Right side — subtotal */}
        <div className="flex items-center gap-1.5">
          <span className="font-body font-bold text-base">₹{subtotal}</span>
          <span className="text-orange-200 text-lg">›</span>
        </div>
      </button>
    </div>
  )
}