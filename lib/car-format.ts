export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price);

export const formatMileage = (mileage: number) =>
  new Intl.NumberFormat('en-GB').format(mileage);
