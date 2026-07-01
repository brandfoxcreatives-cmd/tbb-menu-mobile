// Consistent color coding per order type, used on the Order Board ticket panel,
// Kitchen Display tickets, and Order History — so staff can tell order types apart
// at a glance everywhere in the app.
export const ORDER_TYPES = ['Dine In', 'Take Away', 'Delivery']

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
  Delivery: {
    solid: 'bg-clay text-white',
    soft: 'bg-clay-light text-clay-dark',
    dot: 'bg-clay',
  },
}

export function orderTypeStyle(type) {
  return ORDER_TYPE_STYLES[type] || ORDER_TYPE_STYLES['Dine In']
}
