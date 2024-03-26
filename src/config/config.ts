export let cusArr: {
  name: string;
  mobile: string;
  email: string;
  pinCode: string;
  address: string;
}[] = [];

export const getPriceAfterDiscount = (price: number, dis: number): string => {
  var p = price - price * (dis / 100);
  return p.toFixed(2);
};

export const getTotalPrice = (
  cart: {
    quantity: number;
    product: { price: number; discountPercentage: number };
  }[]
): string => {
  var val = 0.0;
  for (let e of cart) {
    val +=
      e.quantity *
      parseFloat(
        getPriceAfterDiscount(e.product.price, e.product.discountPercentage)
      );
  }
  return val.toFixed(2);
};

export const getFirstLine = (text: string): string => {
  if (!text) return '';
  return text.length > 50 ? text.substring(0, 50) + '...' : text;
};

export const updateTotalPrice = (product: { price: number }[]): number => {
  let total = product.reduce((acc, item) => acc + item.price, 0);
  return total;
};
