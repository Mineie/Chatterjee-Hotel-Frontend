import React, { useState } from 'react';
import { load } from '@cashfreepayments/cashfree-js';

export default function App() {
  const menu = [
    {
      category: '🥔 Pakoda',
      items: [
        ['Paneer Pakoda', 180],
        ['Mix Veg Pakoda', 160],
        ['Aalu Pakoda', 140],
        ['Pyaz Pakoda', 160],
      ],
    },

    {
      category: '🍄 Full Mushroom Specials',
      items: [
        ['Mushroom Masala', 220],
        ['Mushroom Chatpata', 280],
        ['Mushroom Kadhai', 320],
        ['Mushroom Handi', 300],
        ['Chilli Mushroom', 300],
      ],
    },

    {
      category: '🧀 Full Paneer Specials',
      items: [
        ['Paneer Masala', 200],
        ['Paneer Butter Masala', 220],
        ['Paneer Chatpata', 280],
        ['Paneer Kadhai', 280],
        ['Paneer Handi', 270],
        ['Shahi Paneer', 280],
        ['Kaju Paneer', 280],
        ['Chilli Paneer', 300],
        ['Paneer Bhujia', 280],
      ],
    },

    {
      category: '🍲 Full Sabji',
      items: [
        ['Aalu Gobhi', 120],
        ['Mix Veg', 180],
        ['Chana Masala', 120],
        ['Dal Fry', 100],
        ['Aalu Dam', 100],
        ['Dal Makhani', 140],
        ['Aalu Patal', 120],
        ['Tadka', 120],
        ['Jeera Aalu', 120],
        ['Sev Tamatar', 140],
      ],
    },

    {
      category: '🫓 Full Breakfast & Roti',
      items: [
        ['Tava Roti', 10],
        ['Tandoori Roti', 15],
        ['Butter Tandoori Roti', 20],
        ['Naan', 40],
        ['Butter Naan', 50],
        ['Laccha Paratha', 60],
        ['Butter Laccha Paratha', 70],
        ['Plain Dosa', 80],
        ['Masala Dosa', 100],
      ],
    },

    {
      category: '🍛 Full Special Thali',
      items: [
        ['Chatterjee Special Thali', 100],
        ['Chatterjee Premium Thali', 130],
        ['Rajrappa Thali', 170],
        ['Rajrappa Special Thali', 180],
        ['Maaza Thali', 200],
        ['Maaza Special Thali', 250],
        ['Special Jumbo Thali', 280],
      ],
    },

    {
      category: '🥤 Drinks & Beverages',
      items: [
        ['Tea', 10],
        ['Coffee', 20],
        ['Cold Drink', 30],
        ['Mineral Water', 20],
      ],
    },

    {
      category: '🍽️ Breakfast',
      items: [
        ['Tava Roti', 10],
        ['Tandoori Roti', 15],
        ['Naan', 40],
        ['Butter Naan', 50],
        ['Dosa', 80],
      ],
    },

    {
      category: '🍛 Thali',
      items: [
        ['Chatterjee Special Thali', 100],
        ['Rajrappa Thali', 170],
        ['Rajrappa Special Thali', 180],
        ['Maaza Thali', 200],
        ['Maaza Special Thali', 250],
        ['Special Jumbo Thali', 280],
      ],
    },
  ];

  const [cart, setCart] = useState([]);

  const [showCheckout, setShowCheckout] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [customerName, setCustomerName] = useState('');

  const [customerPhone, setCustomerPhone] = useState('');

  const [customerAddress, setCustomerAddress] = useState('');

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const total = cart.reduce((acc, item) => acc + item[1], 0);

  const deliveryCharge = cart.length > 0 ? 40 : 0;

  const finalTotal = total + deliveryCharge;

  const orderNow = () => {
    const orderText = cart
      .map((item) => `• ${item[0]} - ₹${item[1]}`)
      .join('%0A');

    const message =
      `🍴 CHATTERJEE HOTEL ORDER %0A%0A` +
      `👤 Name: ${customerName}%0A` +
      `📞 Phone: ${customerPhone}%0A` +
      `📍 Address: ${customerAddress}%0A%0A` +
      `${orderText}%0A%0A` +
      `🚚 Delivery Charge: ₹${deliveryCharge}%0A` +
      `💰 Total: ₹${finalTotal}%0A%0A` +
      `💳 UPI: 7992430127@ybl`;

    const url = `https://wa.me/919631897127?text=${message}`;

    window.location.href = url;
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(
        'https://cashfree-backend-06gv.onrender.com/api/payment',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: customerName,
            phone: customerPhone,
            address: customerAddress,
            amount: total,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      const cashfree = await load({
        mode: 'production',
      });

      const result = await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_modal',
      });

      if (result) {
        setPaymentSuccess(true);
        setShowCheckout(false);
        setCart([]);
      }
    } catch (err) {
      console.log('FULL ERROR:', err);

      alert('Check console');
    }
  };

  return (
    <div
      style={{
        background: '#f8f6f3',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#222',
      }}
    >
      {paymentSuccess && (
        <div
          style={{
            background: '#d4edda',
            color: '#155724',
            padding: '18px',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '700',
          }}
        >
          🎉 Order placed successfully!
        </div>
      )}

      {/* HEADER */}
      <div
        style={{
          background: 'linear-gradient(135deg,#fff1e6,#fffaf5)',
          padding: '28px',
          borderBottomLeftRadius: '35px',
          borderBottomRightRadius: '35px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            letterSpacing: '4px',
            color: '#ff6b00',
            fontWeight: '700',
            marginBottom: '10px',
          }}
        >
          ✦ AUTHENTIC INDIAN KITCHEN ✦
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: '42px',
            fontWeight: '900',
          }}
        >
          CHATTERJEE HOTEL
        </h1>

        <p
          style={{
            marginTop: '12px',
            color: '#666',
            fontSize: '18px',
          }}
        >
          Fresh Food • Fast Delivery • Free Pickup
        </p>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '18px',
            flexWrap: 'wrap',
          }}
        >
          {['🚚 Delivery within 4KM', '💸 ₹40 Delivery', '🛍️ Free Pickup'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: 'white',
                  padding: '10px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>

      {/* MENU */}
      <div style={{ padding: '22px' }}>
        {menu.map((section) => (
          <div key={section.category}>
            <h2
              style={{
                fontSize: '32px',
                marginBottom: '18px',
                marginTop: '35px',
                fontWeight: '800',
              }}
            >
              {section.category}
            </h2>

            <div
              style={{
                display: 'grid',
                gap: '18px',
              }}
            >
              {section.items.map((item) => (
                <div
                  key={item[0]}
                  style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    transition: '0.3s',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '22px',
                        fontWeight: '700',
                      }}
                    >
                      {item[0]}
                    </h3>

                    <div
                      style={{
                        marginTop: '10px',
                        color: '#ff6b00',
                        fontSize: '24px',
                        fontWeight: '800',
                      }}
                    >
                      ₹{item[1]}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      border: 'none',
                      background: 'linear-gradient(135deg,#ff7a18,#ff9f43)',
                      color: 'white',
                      padding: '14px 22px',
                      borderRadius: '18px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 8px 18px rgba(255,122,24,0.25)',
                    }}
                  >
                    + ADD
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showCheckout && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'white',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '30px',
              padding: '25px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: '32px',
              }}
            >
              Checkout 🍴
            </h2>

            <input
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid #ddd',
                marginTop: '15px',
                fontSize: '16px',
              }}
            />

            <input
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid #ddd',
                marginTop: '15px',
                fontSize: '16px',
              }}
            />

            <textarea
              placeholder="Delivery Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid #ddd',
                marginTop: '15px',
                fontSize: '16px',
                minHeight: '100px',
              }}
            />

            <div
              style={{
                marginTop: '20px',
                background: '#fafafa',
                borderRadius: '18px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Subtotal</span>
                <strong>₹{total}</strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <span>Delivery</span>
                <strong>₹40</strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '18px',
                  fontSize: '22px',
                }}
              >
                <strong>Total</strong>
                <strong>₹{finalTotal}</strong>
              </div>
            </div>

            <button
              onClick={handlePayment}
              style={{
                width: '100%',
                marginTop: '22px',
                border: 'none',
                background: 'linear-gradient(135deg,#ff6b00,#ff944d)',
                color: 'white',
                padding: '18px',
                borderRadius: '18px',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              Confirm Order →
            </button>

            <button
              onClick={() => setShowCheckout(true)}
              style={{
                width: '100%',
                marginTop: '12px',
                border: 'none',
                background: '#efefef',
                padding: '16px',
                borderRadius: '18px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '18px',
            left: '18px',
            right: '18px',
            background: 'white',
            borderRadius: '28px',
            padding: '20px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: '800',
                fontSize: '20px',
              }}
            >
              {cart.length} Items Added
            </div>

            <div
              style={{
                color: '#666',
                marginTop: '5px',
              }}
            >
              ₹{total} + ₹40 delivery
            </div>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            style={{
              border: 'none',
              background: 'linear-gradient(135deg,#ff6b00,#ff944d)',
              color: 'white',
              padding: '16px 28px',
              borderRadius: '20px',
              fontSize: '18px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(255,107,0,0.3)',
            }}
          >
            ₹{finalTotal} • Order Now →
          </button>
        </div>
      )}
    </div>
  );
}
