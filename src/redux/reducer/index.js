import { combineReducers } from "redux";

import ProductListReducer from "./productListReducer";
import ShoppingListReducer from "./shoppingListReducer";
import UserReducer from "./userReducer";
import AdminReducer from "./adminReducer";

const rootReducer = combineReducers({
  ProductListReducer,
  ShoppingListReducer,
  UserReducer,
  AdminReducer,
});

export default rootReducer;
