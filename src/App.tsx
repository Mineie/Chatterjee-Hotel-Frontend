import React, { useState } from 'react'
import { CartProvider } from './hooks/useCart'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import FloatingCart from './components/FloatingCart'
import CartDrawer from './components/CartDrawer'
import CheckoutPage from './pages/CheckoutPage'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)
  const [page, setPage] = useState('menu')

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => setPage('checkout'), 50)
  }

  if (page === 'checkout') {
    return <CheckoutPage onBack={() => setPage('menu')} />
  }

  return (
    <div className="min-h-screen bg-white font-body">
      <Hero />
      <MenuSection />
      <Footer />

      <FloatingCart onOpen={() => setCartOpen(true)} />
      <WhatsAppButton cartOpen={cartOpen} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}