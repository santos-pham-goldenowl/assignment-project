const initialState = {
  shoppingList: [],
  isPopUp: false,
};
function ShoppingListReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "Add":
      const { id, url, name, color, price } = action.payload;
      // - if newState without a added id key is init a new key by id
      const addedItem = newState.shoppingList.find((item) => {
        return item.id === id;
      });

      // - else initiate a new item and push it into a added items array
      if (!addedItem) {
        const itemProperties = {
          id,
          url,
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
    case "PopUp":
      newState.isPopUp = !newState.isPopUp;
      return newState;
    default:
      return state;
  }
}

export default ShoppingListReducer;
