import React from 'react'
import { WHATSAPP_NUMBER } from '../data/menu'

export default function WhatsAppButton({ cartOpen }) {
  // Hide when cart drawer is open to avoid overlap
  if (cartOpen) return null

  return (
    
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Need help? Chat with us on WhatsApp!"
      className="fixed right-4 bottom-24 z-30 w-14 h-14 bg-green-500 hover:bg-green-600 active:green-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
        <path d="M16 .4A15.6 15.6 0 0 0 2.7 23.5L.4 31.6l8.4-2.2A15.6 15.6 0 1 0 16 .4zm0 28.5a13 13 0 0 1-6.6-1.8l-.5-.3-5 1.3 1.3-4.8-.3-.5A13 13 0 1 1 16 28.9zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2a12 12 0 0 1-2.2-2.8c-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5-.1-.7L12 10c-.3-.8-.7-.7-.9-.7h-.7a1.4 1.4 0 0 0-1 .5 4.3 4.3 0 0 0-1.3 3.2 7.4 7.4 0 0 0 1.6 4c.2.3 2.8 4.2 6.7 5.9 4 1.6 4 1.1 4.7 1a3.9 3.9 0 0 0 2.6-1.8 3.2 3.2 0 0 0 .2-1.8c-.1-.2-.4-.3-.8-.5z"/>
      </svg>
    </a>
  )
}