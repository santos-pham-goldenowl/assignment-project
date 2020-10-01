import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer/index";

// const persistConfig = {
//   key: "root",
//   storage: storage,
//     stateReconciler: autoMergeLevel2,
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, applyMiddleware(thunk));

// export const persistor = persistStore(store);
export default store;
