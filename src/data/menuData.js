// Taal Bayview Bistro Event Center — full menu, grouped by category.
// Badges: bestseller | new | chef | kid | town
// Variants are used for items with more than one price (e.g. whole/half, small/large).
//
// IMPORTANT — item IDs must stay stable across menu edits.
// Stock availability, uploaded item photos, and historical order line items are all
// keyed by item id. IDs below are generated once per category, in array order, using
// a short fixed prefix (e.g. APP-01, APP-02…). To avoid silently re-numbering items
// that already have saved stock/image data attached:
//   - Add new items to the END of a category's items array, not the middle.
//   - Don't reorder or delete existing items just to "tidy up" — only remove an item
//     here if it's genuinely off the menu for good.
// Renaming an item's `name` or changing its `price` never affects its id, so normal
// menu edits (price updates, wording fixes) are always safe.

export const RAW_CATEGORIES = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Jalapeño Cheese Sticks', price: 175, badges: [] },
      { name: 'Salted Egg Chicken Skin', price: 310, badges: ['new'] },
      { name: 'Pork Sisig', price: 585, badges: ['bestseller'] },
      { name: 'Kalderetang Kambing', price: 595, badges: ['bestseller'] },
      { name: 'Chicharong Bulaklak', price: 420, badges: ['bestseller'] },
      { name: 'Kilawing Tanigue', price: 575, badges: [] },
      { name: 'Sizzling Pusit', price: 565, badges: [] },
      { name: 'Fried Calamari', price: 420, badges: ['bestseller'] },
      { name: 'French Fries', price: 175, badges: [] },
    ],
  },
  {
    id: 'noodles',
    name: 'Noodles',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Seafood Canton', price: 400, badges: ['bestseller'] },
      { name: 'Crispy Noodles', price: 400, badges: ['bestseller', 'chef'] },
      { name: 'Bihon Guisado', price: 385, badges: [] },
      { name: 'Mikibihon', price: 385, badges: [] },
      { name: 'Pancit Canton', price: 385, badges: [] },
    ],
  },
  {
    id: 'bilao',
    name: 'Bilao',
    serving: 'good for 15 to 18 persons',
    items: [
      { name: 'Spaghetti', price: 1700, badges: [] },
      { name: 'Palabok', price: 1900, badges: [] },
      { name: 'Sotanghon', price: 1800, badges: [] },
      { name: 'Pancit (Mikibihon / Bihon Guisado / Canton)', price: 1850, badges: [] },
      { name: 'Seafood Canton', price: 2100, badges: ['bestseller'] },
    ],
  },
  {
    id: 'chicken',
    name: 'Chicken',
    serving: '',
    items: [
      {
        name: 'Bistro Chicken',
        badges: ['bestseller', 'kid', 'chef'],
        variants: [
          { label: 'Whole (good for 6)', price: 675 },
          { label: 'Half (good for 3)', price: 370 },
        ],
      },
      { name: 'Crispy Chicken (6-7 pcs)', price: 395, badges: ['kid'] },
      { name: 'Adobo sa Dilaw', price: 480, serving: 'good for 3-4', badges: ['chef'] },
      { name: 'Adobo sa Toyo', price: 480, serving: 'good for 3-4', badges: [] },
      { name: 'Bistro Chicken Wings', price: 655, serving: 'good for 5-6', badges: [] },
    ],
  },
  {
    id: 'beef',
    name: 'Beef',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Bulalo', price: 680, badges: ['bestseller'] },
      { name: 'Bistek Tagalog', price: 580, badges: [] },
      { name: 'Beef Kare-kare', price: 720, badges: ['bestseller'] },
      { name: 'Beef Ampalaya', price: 460, badges: [] },
      { name: 'Beef Tenderloin', price: 580, badges: [] },
      { name: 'Beef Salpicao', price: 485, badges: ['new'] },
    ],
  },
  {
    id: 'kambing',
    name: 'Kambing',
    serving: 'good for 3 to 4 persons',
    items: [{ name: 'Kaldereta', price: 595, badges: ['bestseller', 'chef'] }],
  },
  {
    id: 'soup',
    name: 'Soup',
    serving: 'good for 5 to 7 persons',
    items: [
      { name: 'Crab and Corn', price: 380, badges: [] },
      { name: 'Mushroom', price: 380, badges: [] },
      { name: 'Hototay', price: 415, badges: [] },
    ],
  },
  {
    id: 'seafood',
    name: 'Seafood',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Bistro Platter', price: 880, badges: ['bestseller', 'chef'] },
      { name: 'Sinigang na Salmon Belly', price: 595, badges: ['bestseller'] },
      { name: 'Crispy Fried Salmon Belly', price: 595, badges: [] },
      { name: 'Sinigang na Maliputo', price: 650, badges: ['chef'] },
      { name: 'Seafood Kare-Kare', price: 875, badges: ['bestseller'] },
      { name: 'Seafood Express', price: 875, badges: [] },
      { name: 'Sinigang na Hipon', price: 595, badges: [] },
      { name: 'Sizzling Gambas', price: 595, badges: [] },
      { name: 'Garlic Buttered Shrimp', price: 625, badges: ['chef'] },
      { name: 'Tanigue Steak', price: 575, badges: [] },
      { name: 'Sinigang na Tanigue', price: 575, badges: [] },
      { name: 'Sweet & Sour Tanigue', price: 575, badges: [] },
      { name: 'Fried Tawilis', price: 415, badges: ['town'] },
      { name: 'Fried Calamari', price: 420, badges: [] },
      { name: 'Sinigang na Bangus Belly', price: 575, badges: [] },
      { name: 'Daing na Bangus Belly', price: 575, badges: [] },
    ],
  },
  {
    id: 'pork',
    name: 'Pork',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Crispy Pata', price: 880, badges: ['bestseller'] },
      { name: 'Pata Tim', price: 950, badges: ['chef'] },
      { name: 'Crispy Pork Kare-Kare', price: 665, badges: ['bestseller'] },
      { name: 'Lechon Kawali', price: 435, badges: [] },
      { name: 'Sinigang na Baboy', price: 510, badges: ['kid'] },
      { name: 'Inihaw na Liempo', price: 420, badges: [] },
      { name: 'Tapang Taal', price: 395, badges: ['town'] },
      { name: 'Lumpiang Shanghai', price: 450, badges: ['bestseller', 'kid'] },
      { name: 'Pork Binagoongan', price: 495, badges: [] },
      { name: 'Pork Sisig (Regular / Spicy)', price: 585, badges: ['bestseller'] },
    ],
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    serving: 'good for 3 to 4 persons',
    items: [
      { name: 'Ginataang Gulay w/ Shrimp', price: 375, badges: [] },
      { name: 'Ampalaya w/ Egg', price: 330, badges: [] },
      { name: 'Ensaladang Taal', price: 330, badges: ['town'] },
      { name: 'Chopsuey', price: 385, badges: ['bestseller'] },
      { name: 'Pakbet', price: 350, badges: ['chef'] },
      { name: 'Adobong Kangkong', price: 225, badges: [] },
      { name: 'Tofu Sisig', price: 385, badges: ['new'] },
      { name: 'Laing', price: 385, badges: ['new'] },
    ],
  },
  {
    id: 'rice',
    name: 'Rice',
    serving: 'good for 5 to 6 persons',
    items: [
      { name: 'Yang Chow Fried Rice', price: 480, badges: [] },
      { name: 'Bagoong Rice', price: 420, badges: [] },
      {
        name: 'Garlic Rice',
        badges: [],
        variants: [
          { label: 'Small', price: 60 },
          { label: 'Large', price: 290 },
        ],
      },
      {
        name: 'Plain Rice',
        badges: [],
        variants: [
          { label: 'Small', price: 50 },
          { label: 'Large', price: 250 },
        ],
      },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich & Burger',
    serving: '',
    items: [
      { name: 'Clubhouse w/ Fries', price: 275, badges: ['kid'] },
      { name: 'Bistro Burger w/ Fries', price: 275, badges: [] },
    ],
  },
  {
    id: 'dessert',
    name: 'Dessert',
    serving: 'good for one (sharing items noted)',
    items: [
      { name: 'Halo-halo', price: 175, badges: ['bestseller'] },
      { name: 'Mais con Yelo', price: 165, badges: [] },
      { name: 'Saging con Yelo', price: 165, badges: [] },
      { name: 'Leche Flan (for sharing)', price: 260, badges: [] },
      { name: 'Fruit Salad (for sharing)', price: 260, badges: [] },
    ],
  },
  {
    id: 'shakes',
    name: 'Fruit Shakes',
    serving: '',
    items: [
      { name: 'Ripe Mango Shake', price: 150, badges: [] },
      { name: 'Watermelon Shake', price: 150, badges: [] },
      { name: 'Melon Shake', price: 150, badges: [] },
      { name: 'Strawberry Shake', price: 150, badges: [] },
      { name: 'Banana Shake', price: 150, badges: [] },
    ],
  },
  {
    id: 'bibingka',
    name: 'Bibingka',
    serving: '5-inch mold, house recipe',
    items: [
      { name: 'Bibingka (Piece)', price: 70, badges: [] },
      { name: 'Bibingka (Half Dozen)', price: 390, badges: [] },
    ],
  },
  {
    id: 'coffee',
    name: 'Coffee',
    serving: 'Hot 12oz | Iced 16oz +10 pesos',
    items: [
      { name: 'Americano', price: 115, badges: [] },
      { name: 'Latte', price: 130, badges: [] },
      { name: 'Vanilla Latte', price: 140, badges: [] },
      { name: 'Spanish Latte', price: 140, badges: [] },
      { name: 'Mocha', price: 150, badges: [] },
      { name: 'White Chocolate Mocha', price: 160, badges: [] },
      { name: 'Caramel Macchiato', price: 160, badges: [] },
    ],
  },
  {
    id: 'noncoffee',
    name: 'Non-Coffee',
    serving: '16oz',
    items: [
      { name: 'Strawberry Frappe', price: 180, badges: [] },
      { name: 'Biscoff Frappe', price: 180, badges: [] },
      { name: 'Chocolate Frappe', price: 180, badges: [] },
      { name: 'Java Chip Frappe', price: 180, badges: [] },
      { name: 'Cookies & Cream Frappe', price: 180, badges: [] },
      { name: 'Tsokolate (8oz)', price: 130, badges: [] },
    ],
  },
  {
    id: 'refreshments',
    name: 'Refreshments',
    serving: '',
    items: [
      { name: 'Iced Tea (for sharing)', price: 280, badges: [] },
      { name: 'Cucumber Lemonade (for sharing)', price: 280, badges: [] },
      { name: '1.5L Softdrinks', price: 190, badges: [] },
      { name: 'Iced Tea (good for one)', price: 95, badges: [] },
      { name: 'Cucumber Lemonade (good for one)', price: 95, badges: [] },
      { name: 'Black Gulaman', price: 120, badges: [] },
      { name: 'Bottled Water', price: 45, badges: [] },
      { name: 'Canned Juice / Softdrinks', price: 105, badges: [] },
    ],
  },
  {
    id: 'setmenu',
    name: 'Set Menu',
    serving: 'good for 5 to 6 persons · discounted, not combinable with other promos',
    items: [
      {
        name: 'Set A — Crispy Pata, Whole Bistro Chicken, Sinigang na Salmon Belly, Lumpiang Shanghai, Rice, 1.5L Softdrinks',
        price: 2880,
        badges: ['bestseller'],
      },
      {
        name: 'Set B — Bistro Chicken, Sinigang na Baboy, Half Bistro Chicken, Pancit Canton, Rice, 1.5L Softdrinks',
        price: 2415,
        badges: [],
      },
      {
        name: 'Set C — Whole Bistro Chicken, Bistro Platter, Beef Kare-kare, Rice, 1.5L Softdrinks',
        price: 2545,
        badges: [],
      },
      {
        name: 'Set D — Whole Bistro Chicken, Seafood Kare-kare, Crispy Pata, Rice, 1.5L Softdrinks',
        price: 2690,
        badges: [],
      },
    ],
  },
  {
    id: 'seafoodset',
    name: 'Seafood Set Menu',
    serving: 'good for 5 to 6 persons · discounted, not combinable with other promos',
    items: [
      {
        name: 'Set 1 — Seafood Express, Sinigang na Salmon Belly, Shrimp (or Spicy Garlic Buttered Shrimp), Rice, 1.5L Softdrinks',
        price: 2370,
        badges: [],
      },
      {
        name: 'Set 2 — Seafood Kare-kare, Sizzling Pusit, Seafood Platter, Rice, 1.5L Softdrinks',
        price: 2575,
        badges: [],
      },
      {
        name: 'Set 3 — Sizzling Gambas, Bangus (Sinigang or Daing), Garlic Buttered Shrimp, Seafood Canton, Rice, 1.5L Softdrinks',
        price: 2535,
        badges: [],
      },
    ],
  },
]

export const CATEGORY_ICONS = {
  appetizers: '🍤',
  noodles: '🍜',
  bilao: '🍱',
  chicken: '🍗',
  beef: '🥩',
  kambing: '🐐',
  soup: '🍲',
  seafood: '🦐',
  pork: '🥓',
  vegetables: '🥬',
  rice: '🍚',
  sandwich: '🥪',
  dessert: '🍮',
  shakes: '🥤',
  bibingka: '🍰',
  coffee: '☕',
  noncoffee: '🧋',
  refreshments: '🧃',
  setmenu: '🍽️',
  seafoodset: '🦞',
}

// Fixed short prefix per category, used to build stable item ids (e.g. "APP-01").
const ID_PREFIX = {
  appetizers: 'APP',
  noodles: 'NOO',
  bilao: 'BIL',
  chicken: 'CHK',
  beef: 'BEF',
  kambing: 'KMB',
  soup: 'SUP',
  seafood: 'SEA',
  pork: 'PRK',
  vegetables: 'VEG',
  rice: 'RIC',
  sandwich: 'SDW',
  dessert: 'DES',
  shakes: 'SHK',
  bibingka: 'BIB',
  coffee: 'COF',
  noncoffee: 'NCF',
  refreshments: 'REF',
  setmenu: 'SET',
  seafoodset: 'SFS',
}

export const CATEGORIES = RAW_CATEGORIES.map((cat) => {
  const prefix = ID_PREFIX[cat.id] || cat.id.slice(0, 3).toUpperCase()
  return {
    ...cat,
    items: cat.items.map((item, idx) => ({
      ...item,
      id: `${prefix}-${String(idx + 1).padStart(2, '0')}`,
    })),
  }
})

export const BADGE_META = {
  bestseller: { label: 'Best Seller', icon: '⭐' },
  new: { label: 'New', icon: '🆕' },
  chef: { label: "Chef's Choice", icon: '🥄' },
  kid: { label: "Kid's Fave", icon: '🧒' },
  town: { label: "Town's Fave", icon: '📍' },
}

// Flat list helper
export const ALL_ITEMS = CATEGORIES.flatMap((c) =>
  c.items.map((it) => ({ ...it, categoryId: c.id, categoryName: c.name })),
)

export const ITEM_CATEGORY_MAP = Object.fromEntries(
  ALL_ITEMS.map((it) => [it.id, it.categoryName]),
)
