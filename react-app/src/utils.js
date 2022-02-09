export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "usd",
  style: "currency",
  minimumFractionDigits: 2
});

export const dateConverter = (str) => {
  const new_str = new Date(str + "T00:00").toDateString()
  return new_str.slice(4,10) + ", " + new_str.slice(11)
};
