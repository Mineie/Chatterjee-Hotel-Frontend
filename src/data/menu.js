export const MENU_CATEGORIES = [
  {
    id: 'nasta',
    name: 'Nasta',
    emoji: '🥐',
    description: 'Morning snacks & breakfast specials',
    items: [
      { id: 'n1',  name: 'Green Matar Kachori',                     price: 15,  veg: true },
      { id: 'n2',  name: 'Chola Bhatura',                            price: 70,  veg: true },
      { id: 'n3',  name: 'Aalu Paratha',                             price: 50,  veg: true },
      { id: 'n4',  name: 'Paneer Paratha',                           price: 70,  veg: true },
      { id: 'n5',  name: 'Gobhi Paratha',                            price: 60,  veg: true },
      { id: 'n6',  name: 'Aalu Paratha 2pc (Chola-Dahi)',            price: 150, veg: true },
      { id: 'n7',  name: 'Gobhi Paratha 2pc (Chola-Dahi)',           price: 205, veg: true },
      { id: 'n8',  name: 'Paneer Paratha 2pc (Chola-Dahi)',          price: 230, veg: true },
      { id: 'n9',  name: 'Chola Bhatura, Cold Drink & Meetha',       price: 115, veg: true },
      { id: 'n10', name: 'Special Paneer Chhola Bhatura & Meetha',   price: 210, veg: true },
    ]
  },
  {
    id: 'paneer',
    name: 'Paneer Special',
    emoji: '🧀',
    description: 'Rich & creamy paneer preparations',
    items: [
      { id: 'p1', name: 'Paneer Masala',        price: 200, veg: true },
      { id: 'p2', name: 'Paneer Butter Masala', price: 220, veg: true },
      { id: 'p3', name: 'Paneer Chatpata',      price: 280, veg: true },
      { id: 'p4', name: 'Paneer Kadhai',        price: 280, veg: true },
      { id: 'p5', name: 'Paneer Handi',         price: 270, veg: true },
      { id: 'p6', name: 'Shahi Paneer',         price: 280, veg: true },
      { id: 'p7', name: 'Kaju Paneer',          price: 280, veg: true },
      { id: 'p8', name: 'Chilli Paneer',        price: 300, veg: true },
      { id: 'p9', name: 'Paneer Bhujia',        price: 280, veg: true },
    ]
  },
  {
    id: 'mushroom',
    name: 'Mushroom Special',
    emoji: '🍄',
    description: 'Flavourful mushroom dishes',
    items: [
      { id: 'm1', name: 'Mushroom Masala',   price: 220, veg: true },
      { id: 'm2', name: 'Mushroom Chatpata', price: 280, veg: true },
      { id: 'm3', name: 'Mushroom Kadhai',   price: 320, veg: true },
      { id: 'm4', name: 'Mushroom Handi',    price: 300, veg: true },
      { id: 'm5', name: 'Chilli Mushroom',   price: 300, veg: true },
    ]
  },
  {
    id: 'roti',
    name: 'Breads & Dosa',
    emoji: '🫓',
    description: 'Fresh breads from the tandoor',
    items: [
      { id: 'r1', name: 'Tava Roti',             price: 10,  veg: true },
      { id: 'r2', name: 'Tandoori Roti',          price: 15,  veg: true },
      { id: 'r3', name: 'Butter Tandoori Roti',   price: 20,  veg: true },
      { id: 'r4', name: 'Naan',                   price: 40,  veg: true },
      { id: 'r5', name: 'Butter Naan',            price: 50,  veg: true },
      { id: 'r6', name: 'Laccha Paratha',         price: 60,  veg: true },
      { id: 'r7', name: 'Butter Laccha Paratha',  price: 70,  veg: true },
      { id: 'r8', name: 'Plain Dosa',             price: 80,  veg: true },
      { id: 'r9', name: 'Masala Dosa',            price: 100, veg: true },
    ]
  },
  {
    id: 'pakoda',
    name: 'Pakoda',
    emoji: '🍟',
    description: 'Crispy golden fritters',
    items: [
      { id: 'pk1', name: 'Paneer Pakoda',  price: 180, veg: true },
      { id: 'pk2', name: 'Mix Veg Pakoda', price: 160, veg: true },
      { id: 'pk3', name: 'Aalu Pakoda',    price: 140, veg: true },
      { id: 'pk4', name: 'Pyaz Pakoda',    price: 160, veg: true },
    ]
  },
  {
    id: 'sabji',
    name: 'Sabji',
    emoji: '🥘',
    description: 'Home-style vegetable curries',
    items: [
      { id: 's1',  name: 'Aalu Gobhi',   price: 120, veg: true },
      { id: 's2',  name: 'Mix Veg',      price: 180, veg: true },
      { id: 's3',  name: 'Chana Masala', price: 120, veg: true },
      { id: 's4',  name: 'Dal Fry',      price: 100, veg: true },
      { id: 's5',  name: 'Aalu Dam',     price: 100, veg: true },
      { id: 's6',  name: 'Dal Makhani',  price: 140, veg: true },
      { id: 's7',  name: 'Aalu Patal',   price: 120, veg: true },
      { id: 's8',  name: 'Tadka',        price: 120, veg: true },
      { id: 's9',  name: 'Jeera Aalu',   price: 120, veg: true },
      { id: 's10', name: 'Sev Tamatar',  price: 140, veg: true },
    ]
  },
  {
    id: 'thali',
    name: 'Special Thali',
    emoji: '🍱',
    description: 'Complete wholesome meals',
    items: [
      { id: 't1', name: 'Chatterjee Special Thali', price: 100, veg: true },
      { id: 't2', name: 'Chatterjee Premium Thali', price: 130, veg: true },
      { id: 't3', name: 'Rajrappa Thali',           price: 170, veg: true },
      { id: 't4', name: 'Rajrappa Special Thali',   price: 180, veg: true },
      { id: 't5', name: 'Maaza Thali',              price: 200, veg: true },
      { id: 't6', name: 'Maaza Special Thali',      price: 250, veg: true },
      { id: 't7', name: 'Special Jumbo Thali',      price: 280, veg: true },
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks',
    emoji: '☕',
    description: 'Refreshing beverages',
    items: [
      { id: 'd1', name: 'Tea',           price: 10, veg: true },
      { id: 'd2', name: 'Coffee',        price: 20, veg: true },
      { id: 'd3', name: 'Cold Drink',    price: 30, veg: true },
      { id: 'd4', name: 'Mineral Water', price: 20, veg: true },
    ]
  },
]

export const WHATSAPP_NUMBER     = '919631897127'
export const DELIVERY_RADIUS_KM  = 4
export const DELIVERY_CHARGE     = 20
export const FREE_DELIVERY_ABOVE = 200