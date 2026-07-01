// Consistent color coding per order type, used throughout the ordering flow.
// Delivery isn't a selectable type here — customers order Dine In or Take Away and
// arrange their own rider if needed (see the note in Checkout).
export const ORDER_TYPES = ['Dine In', 'Take Away']

export const ORDER_TYPE_STYLES = {
  'Dine In': {
    solid: 'bg-gold text-forest-dark',
    soft: 'bg-gold-light text-forest-dark',
    dot: 'bg-gold',
  },
  'Take Away': {
    solid: 'bg-terracotta text-white',
    soft: 'bg-terracotta-light text-terracotta-dark',
    dot: 'bg-terracotta',
  },
}

export function orderTypeStyle(type) {
  return ORDER_TYPE_STYLES[type] || ORDER_TYPE_STYLES['Dine In']
}
