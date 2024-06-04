import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);

let store = createStore(persistedReducer, composeWithDevTools(middleware));
let persistor = persistStore(store);
export { store, persistor };
