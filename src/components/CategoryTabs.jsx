import React, { useRef, useEffect } from 'react'
import { MENU_CATEGORIES } from '../data/menu'

export default function CategoryTabs({ activeId, onSelect }) {
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeId])

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto px-4 py-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MENU_CATEGORIES.map(cat => {
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(cat.id)}
              className={`
                flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                font-body font-semibold text-sm transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'bg-brand-600 text-white shadow-warm'
                  : 'bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-brand-600'}
              `}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}