import React from 'react'

const badges = [
  { icon: '💸', text: 'Direct Restaurant Pricing' },
  { icon: '🚫', text: 'No Extra Charges Like Zomato' },
  { icon: '🏍️', text: 'Fast Local Delivery' },
  { icon: '🍳', text: 'Freshly Prepared Food' },
  { icon: '🏪', text: 'Pickup Available' },
]

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-white">

      {/* Decorative blobs + dot grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-70" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ea580c" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-8 text-center">

        {/* Logo badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-600 rounded-2xl shadow-warm-lg mb-5 animate-fade-in">
          <span className="text-white font-display font-black text-3xl leading-none">CH</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-4xl sm:text-5xl text-gray-900 leading-tight tracking-tight mb-2 animate-slide-up">
          CHATTERJEE<br />
          <span className="text-brand-600">HOTEL</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-500 font-body font-medium mb-7 animate-fade-in">
          Fresh Food &bull; Fast Local Delivery &bull; Free Pickup
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {badges.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-brand-700 text-xs sm:text-sm font-body font-medium px-3 py-1.5 rounded-full animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToMenu}
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-body font-bold text-lg px-8 py-4 rounded-2xl shadow-warm-lg hover:shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>🍽️</span>
          <span>View Full Menu</span>
        </button>

        {/* Delivery info */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 font-body">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
          Delivery within 4 km &nbsp;•&nbsp; ₹20 charge below ₹200 &nbsp;•&nbsp; Free above ₹200
        </div>

      </div>
    </section>
  )
}