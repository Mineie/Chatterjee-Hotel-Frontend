import { WHATSAPP_NUMBER, DELIVERY_CHARGE, FREE_DELIVERY_ABOVE } from '../data/menu'

export function getDeliveryCharge(subtotal) {
  if (subtotal >= FREE_DELIVERY_ABOVE) return 0
  return DELIVERY_CHARGE
}

export function buildWhatsAppMessage({ name, phone, address, orderType, items, subtotal }) {
  const deliveryCharge = orderType === 'delivery' ? getDeliveryCharge(subtotal) : 0
  const total          = subtotal + deliveryCharge

  const itemLines = items
    .map(i => `  • ${i.name} x${i.qty} = ₹${i.price * i.qty}`)
    .join('\n')

  const lines = [
    '🍽️ *NEW ORDER — CHATTERJEE HOTEL*',
    '',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    orderType === 'delivery'
      ? `📍 *Address:* ${address}`
      : `🏪 *Order Type:* Pickup`,
    '',
    '*📋 Order Details:*',
    itemLines,
    '',
    `💰 *Subtotal:* ₹${subtotal}`,
    orderType === 'delivery'
      ? `🚚 *Delivery Charge:* ₹${deliveryCharge}${deliveryCharge === 0 ? ' (FREE!)' : ''}`
      : `🏪 *Pickup:* FREE`,
    `✅ *TOTAL: ₹${total}*`,
    '',
    '_Order placed via Chatterjee Hotel website_',
  ]

  return lines.join('\n')
}

export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message)
  const url     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}