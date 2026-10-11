export function largeFamilyPrice(price: number, percent: number) {
  return Math.round((price * (100 - percent)) / 100);
}

export function formatRub(value: number) {
  return `${new Intl.NumberFormat("ru-RU").format(value)}\u00a0₽`;
}
