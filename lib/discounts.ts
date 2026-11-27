export const calculateDiscountAmount = (price: number, discount: number) =>
  price * (discount / 100);

export const calculateSalePrice = (price: number, discount: number) =>
  price - calculateDiscountAmount(price, discount);
