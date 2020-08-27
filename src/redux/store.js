import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer/index";

const persistConfig = {
  key: "root",
  storage: storage,
  //   stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);

export const persistor = persistStore(store);
export default store;
