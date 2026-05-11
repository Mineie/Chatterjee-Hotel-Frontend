import React from 'react'
import { WHATSAPP_NUMBER } from '../data/menu'

const features = [
  { icon: '💸', text: 'Direct Restaurant Pricing' },
  { icon: '🏍️', text: 'Fast Local Delivery' },
  { icon: '🍳', text: 'Freshly Prepared Food' },
  { icon: '🏪', text: 'Pickup Available' },
  { icon: '💰', text: 'Order Direct & Save More Than Zomato' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">

      {/* Orange benefits strip */}
      <div className="bg-brand-700 py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {features.map((f, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm font-body text-orange-100">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-4">

        <div>
          <h3 className="font-display font-black text-2xl text-white tracking-tight">
            CHATTERJEE HOTEL
          </h3>
          <p className="text-gray-400 font-body text-sm mt-1">
            Fresh Food &bull; Fast Local Delivery &bull; Free Pickup
          </p>
        </div>

        
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          <span>💬</span>
          <span>Chat on WhatsApp</span>
        </a>

        <p className="text-gray-500 font-body text-xs">
          &copy; {new Date().getFullYear()} Chatterjee Hotel. All rights reserved.
        </p>
        <p className="text-gray-600 font-body text-xs">
          Made with ❤️ for our valued customers
        </p>
      </div>
    </footer>
  )
}