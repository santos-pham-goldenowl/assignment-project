let formatPrice = (value) => {
  return String(value).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
};

export default formatPrice;
