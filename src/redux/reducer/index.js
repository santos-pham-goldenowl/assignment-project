import { combineReducers } from "redux";
import ItemListReducer from "./itemListReducer";
import ShoppingListReducer from "./shoppingListReducer";

export default combineReducers({ ItemListReducer, ShoppingListReducer });
