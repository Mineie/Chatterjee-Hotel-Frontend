import React, { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { getDeliveryCharge } from '../utils/whatsapp'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, addItem, removeItem, subtotal, totalItems } = useCart()
  const deliveryCharge = getDeliveryCharge(subtotal)

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative mt-auto bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up">

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100">
          <h2 className="font-display font-bold text-xl text-gray-900">
            Your Cart{' '}
            <span className="text-brand-500 text-base font-body font-semibold">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors font-bold text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {items.length === 0 && (
            <div className="py-16 text-center">
              <span className="text-5xl">🛒</span>
              <p className="mt-3 font-body text-gray-400 text-sm">Your cart is empty</p>
              <p className="font-body text-gray-300 text-xs mt-1">Add items from the menu</p>
            </div>
          )}

          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between py-1.5">
              <div className="flex-1 min-w-0 pr-3">
                <p className="font-body font-semibold text-gray-800 text-sm leading-snug">
                  {item.name}
                </p>
                <p className="font-body text-brand-600 font-bold text-sm mt-0.5">
                  ₹{item.price} × {item.qty} ={' '}
                  <span className="text-gray-800">₹{item.price * item.qty}</span>
                </p>
              </div>
              <div className="flex items-center bg-brand-50 border-2 border-brand-200 rounded-xl overflow-hidden flex-shrink-0">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 flex items-center justify-center text-brand-600 font-bold text-lg hover:bg-brand-100 transition-colors"
                  aria-label="Remove one"
                >
                  −
                </button>
                <span className="w-6 text-center font-body font-bold text-brand-700 text-sm">
                  {item.qty}
                </span>
                <button
                  onClick={() => addItem(item)}
                  className="w-8 h-8 flex items-center justify-center text-brand-600 font-bold text-lg hover:bg-brand-100 transition-colors"
                  aria-label="Add one"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill summary + checkout */}
        {items.length > 0 && (
          <div className="px-5 pb-6 pt-3 border-t border-gray-100 space-y-3">

            <div className="bg-orange-50 rounded-2xl px-4 py-3 space-y-1.5">
              <div className="flex justify-between font-body text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-gray-600">
                <span>Delivery charge</span>
                <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                  {deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`}
                </span>
              </div>
              {deliveryCharge > 0 && (
                <p className="text-xs text-orange-500 font-body">
                  Add ₹{200 - subtotal} more for free delivery!
                </p>
              )}
              <div className="flex justify-between font-body font-bold text-gray-900 text-base pt-1.5 border-t border-orange-200">
                <span>Total (est.)</span>
                <span className="text-brand-600">₹{subtotal + deliveryCharge}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-body font-bold text-lg py-4 rounded-2xl shadow-warm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>📝</span>
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}