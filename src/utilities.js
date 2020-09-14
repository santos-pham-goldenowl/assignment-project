// const handlePrice = (value) => {
//   // - Convert value that has string type to an array with numbers respectively
//   let newValue = Array.from(value.toString(), Number);
//   let valueTempArr = [];
//   const { length } = newValue;
//   let iterationCount = length / 3;
//   for (let i = 0; i < iterationCount; i++) {
//     //12.023.420.240
//     let tempValue = newValue;
//     let temp;
//     if (tempValue.length === 1) {
//       temp = tempValue.splice(-1);
//     } else if (tempValue.length === 2) {
//       temp = tempValue.splice(-2);
//     }
//     if (tempValue.length > 2) {
//       temp = tempValue.splice(-3);
//     }
//     valueTempArr.unshift(temp);
//   }
//   let newPrice = "";
//   valueTempArr.forEach((item) => {
//     let itemString = item.toString();
//     let removedCharItem = itemString.replace(/,/g, "");
//     newPrice = newPrice + "." + removedCharItem;
//   });
//   return newPrice.replace(".", "");
// };

let handlePrice = (value) => {
  return String(value).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
};

// - calculate sum the price of all selected items
const sumPrice = (props) => {
  const { shoppingList } = props.shoppingItemList;
  const sumPrice = shoppingList.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.count;
  }, 0);
  return handlePrice(sumPrice);
};

export { handlePrice, sumPrice };
