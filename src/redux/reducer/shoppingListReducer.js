const initialState = [];
function ShoppingListReducer(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case "Add":
      const { id, src, name, price } = action.payload;
      //if newState without a added id key is init a new key by id
      const addedItem = newState.find((item) => {
        return item.id === id;
      });
      if (!addedItem) {
        const itemProperties = {
          id: id,
          src: src,
          name: name,
          price: price,
          count: 1,
        };
        newState.push(itemProperties);
        console.log("newState: ", newState);
      } else {
        addedItem.count++;
      }
      return newState;
    case "Remove":
      const idRemovedItem = action.payload;
      const newSelectedItemList = newState.filter((item) => {
        return item.id !== idRemovedItem;
      });
      return newSelectedItemList;
    default:
      return state;
  }
}

export default ShoppingListReducer;
