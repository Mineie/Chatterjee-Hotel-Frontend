import React from 'react'
import { useCart } from '../hooks/useCart'

export default function FoodCard({ item }) {
  const { addItem, removeItem, getQty } = useCart()
  const qty = getQty(item.id)

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3.5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-gray-50">

      {/* Left — veg dot + name + price */}
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-start gap-2">

          {/* FSSAI-style veg indicator */}
          <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-sm border-2 border-green-600 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-green-600 block" />
          </span>

          <p className="font-body font-semibold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2">
            {item.name}
          </p>
        </div>
        <p className="ml-6 mt-1 font-body font-bold text-brand-600 text-base">
          ₹{item.price}
        </p>
      </div>

      {/* Right — ADD button or qty stepper */}
      <div className="flex-shrink-0">
        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="flex items-center gap-1 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-body font-bold text-sm px-4 py-2 rounded-xl shadow-warm transition-all duration-150 hover:shadow-warm-lg active:scale-95"
          >
            <span className="text-base leading-none">+</span>
            <span>ADD</span>
          </button>
        ) : (
          <div className="flex items-center gap-0 bg-brand-50 border-2 border-brand-200 rounded-xl overflow-hidden">
            <button
              onClick={() => removeItem(item.id)}
              className="w-9 h-9 flex items-center justify-center text-brand-600 font-bold text-xl hover:bg-brand-100 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center font-body font-bold text-brand-700 text-base">
              {qty}
            </span>
            <button
              onClick={() => addItem(item)}
              className="w-9 h-9 flex items-center justify-center text-brand-600 font-bold text-xl hover:bg-brand-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>

    </div>
  )
}