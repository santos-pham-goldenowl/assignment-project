const AddItem = (properties) => {
  return {
    type: "Add",
    payload: properties,
  };
};
const RemoveItem = (id) => {
  return {
    type: "Remove",
    payload: id,
  };
};

const LowToHigh = (value) => {
  return {
    type: "Price: Low to high",
    payload: value,
  };
};

export { AddItem, RemoveItem, LowToHigh };
