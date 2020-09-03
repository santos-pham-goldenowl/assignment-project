import { combineReducers } from "redux";

import ProductListReducer from "./productListReducer";
import ShoppingListReducer from "./shoppingListReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  ProductListReducer,
  ShoppingListReducer,
  UserReducer,
});

export default rootReducer;
