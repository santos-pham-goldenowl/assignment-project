const initialState = [
  {
    id: 1,
    name: "Asus",
    price: 20000,
  },
  {
    id: 2,
    name: "Asus",
    price: 20000,
  },
  {
    id: 3,
    name: "Asus",
    price: 20000,
  },
  {
    id: 4,
    name: "Asus",
    price: 20000,
  },
  {
    id: 5,
    name: "Asus",
    price: 20000,
  },
  {
    id: 6,
    name: "Asus",
    price: 20000,
  },
  {
    id: 7,
    name: "Asus",
    price: 20000,
  },
];

function ShoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case "Add":
      return null;
    default:
      return state;
  }
}

export default ShoppingListReducer;
