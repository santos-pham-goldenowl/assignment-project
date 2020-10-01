const initialState = {
  shoppingList: [],
  isPopUp: false,
};
function ShoppingListReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "UpdateState":
      newState.shoppingList = action.list;
      return newState;
    case "Add":
      const { id, imageUrl, name, color, price } = action.payload;
      // - if newState object doesn't contain an added id key is init a new key by id
      const addedItem = newState.shoppingList.find((item) => {
        return item.id === id;
      });

      // - else initiate a new item and push it into a added items array
      if (!addedItem) {
        const itemProperties = {
          id,
          imageUrl,
          name,
          color,
          price,
          count: 1,
        };

        newState.shoppingList.push(itemProperties);
      } else {
        addedItem.count++;
      }
      return newState;
    case "Remove":
      const idRemovedItem = action.payload;
      const newSelectedItemList = newState.shoppingList.filter((item) => {
        return item.id !== idRemovedItem;
      });

      newState.shoppingList = newSelectedItemList;
      return newState;
    case "Increase":
      const idIncreaseProduct = action.idProduct;
      const increasedItem = newState.shoppingList.find(
        (product) => product.id === +idIncreaseProduct
      );
      increasedItem.count++;
      return newState;
    case "Decrease":
      const idDecreaseProduct = action.idProduct;
      const decreasedItem = newState.shoppingList.find(
        (product) => product.id === +idDecreaseProduct
      );
      decreasedItem.count--;
      return newState;
    case "PopUp":
      newState.isPopUp = !newState.isPopUp;
      return newState;
    default:
      return state;
  }
}

export default ShoppingListReducer;
