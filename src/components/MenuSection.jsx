import React, { useState, useEffect, useRef } from 'react'
import { MENU_CATEGORIES } from '../data/menu'
import CategoryTabs from './CategoryTabs'
import FoodCard from './FoodCard'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id)
  const sectionRefs  = useRef({})
  const scrollingRef = useRef(false)

  // Highlight active tab as user scrolls through menu
  useEffect(() => {
    const observers = []

    MENU_CATEGORIES.forEach(cat => {
      const el = sectionRefs.current[cat.id]
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !scrollingRef.current) {
            setActiveCategory(cat.id)
          }
        },
        { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleTabSelect = (id) => {
    scrollingRef.current = true
    setActiveCategory(id)

    const el = sectionRefs.current[id]
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    // Re-enable scroll tracking after animation
    setTimeout(() => { scrollingRef.current = false }, 900)
  }

  return (
    <div id="menu">
      <CategoryTabs activeId={activeCategory} onSelect={handleTabSelect} />

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-8">
        {MENU_CATEGORIES.map(cat => (
          <section
            key={cat.id}
            ref={el => (sectionRefs.current[cat.id] = el)}
            id={`cat-${cat.id}`}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {cat.emoji}
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-gray-900 leading-tight">
                  {cat.name}
                </h2>
                <p className="font-body text-xs text-gray-400">{cat.description}</p>
              </div>
            </div>

            {/* Item cards */}
            <div className="space-y-2.5">
              {cat.items.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Spacer so last items aren't hidden behind floating cart */}
        <div className="h-28" />
      </div>
    </div>
  )
}