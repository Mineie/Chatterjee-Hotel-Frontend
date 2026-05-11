import React, { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { buildWhatsAppMessage, openWhatsApp, getDeliveryCharge } from '../utils/whatsapp'
import { DELIVERY_RADIUS_KM } from '../data/menu'

export default function CheckoutPage({ onBack }) {
  const { items, subtotal, clearCart } = useCart()

  const [form, setForm] = useState({
    name:      '',
    phone:     '',
    address:   '',
    orderType: 'delivery',
  })
  const [errors,  setErrors]  = useState({})
  const [placing, setPlacing] = useState(false)

  const deliveryCharge = form.orderType === 'delivery' ? getDeliveryCharge(subtotal) : 0
  const total          = subtotal + deliveryCharge

  // Validation
  const validate = () => {
    const e = {}
    if (!form.name.trim())
      e.name = 'Please enter your name'
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = 'Enter a valid 10-digit mobile number'
    if (form.orderType === 'delivery' && !form.address.trim())
      e.address = 'Please enter your delivery address'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }

    setPlacing(true)
    const message = buildWhatsAppMessage({ ...form, items, subtotal })

    setTimeout(() => {
      openWhatsApp(message)
      clearCart()
      setPlacing(false)
      onBack()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 animate-fade-in">

      {/* Top navigation bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm flex items-center gap-3 px-4 py-4">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-xl leading-none"
        >
          ‹
        </button>
        <h1 className="font-display font-bold text-xl text-gray-900">Checkout</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 space-y-4">

        {/* ── Order Summary ── */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-gray-50">
            <span className="text-lg">🛒</span>
            <h2 className="font-display font-bold text-base text-gray-900">Order Summary</h2>
          </div>

          <div className="px-4 py-3 space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-baseline text-sm">
                <span className="font-body text-gray-700">
                  {item.name}
                  <span className="text-gray-400 ml-1">×{item.qty}</span>
                </span>
                <span className="font-body font-semibold text-gray-800 flex-shrink-0 ml-2">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 bg-orange-50 space-y-1.5 border-t border-orange-100">
            <div className="flex justify-between text-sm font-body text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-gray-600">
              <span>Delivery</span>
              <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                {form.orderType === 'pickup'
                  ? 'FREE (Pickup)'
                  : deliveryCharge === 0
                  ? 'FREE 🎉'
                  : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-body font-bold text-gray-900 text-base border-t border-orange-200 pt-1.5">
              <span>Total</span>
              <span className="text-brand-600 text-lg">₹{total}</span>
            </div>
          </div>
        </div>

        {/* ── Order Type ── */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h2 className="font-display font-bold text-base text-gray-900 mb-3">
            📦 Order Type
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'delivery', label: 'Home Delivery', icon: '🏍️', note: `Within ${DELIVERY_RADIUS_KM} km` },
              { value: 'pickup',   label: 'Pickup',        icon: '🏪', note: 'Free — Come collect' },
            ].map(opt => (
              <label
                key={opt.value}
                className={`
                  flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer
                  transition-all duration-150
                  ${form.orderType === opt.value
                    ? 'border-brand-500 bg-orange-50'
                    : 'border-gray-100 hover:border-orange-200'}
                `}
              >
                <input
                  type="radio"
                  name="orderType"
                  value={opt.value}
                  checked={form.orderType === opt.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-2xl">{opt.icon}</span>
                <span className="font-body font-semibold text-sm text-gray-800">{opt.label}</span>
                <span className="font-body text-xs text-gray-400">{opt.note}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Customer Details ── */}
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
          <h2 className="font-display font-bold text-base text-gray-900">👤 Your Details</h2>

          {/* Name */}
          <div>
            <label className="block font-body font-semibold text-sm text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`
                w-full px-4 py-3 rounded-xl border-2 font-body text-gray-800
                placeholder-gray-300 outline-none transition-colors
                ${errors.name
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-100 focus:border-brand-400 bg-gray-50'}
              `}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 font-body">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-body font-semibold text-sm text-gray-700 mb-1.5">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              className={`
                w-full px-4 py-3 rounded-xl border-2 font-body text-gray-800
                placeholder-gray-300 outline-none transition-colors
                ${errors.phone
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-100 focus:border-brand-400 bg-gray-50'}
              `}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500 font-body">{errors.phone}</p>
            )}
          </div>

          {/* Address — only for delivery */}
          {form.orderType === 'delivery' && (
            <div>
              <label className="block font-body font-semibold text-sm text-gray-700 mb-1.5">
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="House/flat no., street, landmark, area…"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 font-body text-gray-800
                  placeholder-gray-300 outline-none transition-colors resize-none
                  ${errors.address
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-100 focus:border-brand-400 bg-gray-50'}
                `}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500 font-body">{errors.address}</p>
              )}
              <p className="mt-1.5 text-xs text-gray-400 font-body">
                ℹ️ We deliver within {DELIVERY_RADIUS_KM} km from the restaurant
              </p>
            </div>
          )}
        </div>

        {/* ── WhatsApp notice ── */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
          <span className="text-2xl mt-0.5 flex-shrink-0">💬</span>
          <p className="font-body text-sm text-green-800">
            Tapping <strong>Confirm Order</strong> will open{' '}
            <strong>WhatsApp</strong> with your full order pre-filled.
            Just tap <strong>Send</strong> to confirm with us!
          </p>
        </div>

        {/* ── Place Order button ── */}
        <button
          onClick={handleSubmit}
          disabled={placing}
          className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:opacity-70 text-white font-body font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">📲</span>
          <span>{placing ? 'Opening WhatsApp…' : 'Confirm Order on WhatsApp'}</span>
        </button>

        <p className="text-center font-body text-xs text-gray-400 pb-2">
          💵 Payment collected at delivery / pickup. No online payment required.
        </p>
      </div>
    </div>
  )
}