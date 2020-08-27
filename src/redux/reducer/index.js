import { combineReducers } from "redux";

import ProductListReducer from "./productListReducer";
import ShoppingListReducer from "./shoppingListReducer";

const rootReducer = combineReducers({
  ProductListReducer,
  ShoppingListReducer,
});

export default rootReducer;
