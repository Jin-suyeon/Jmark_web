import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { all } from "typed-redux-saga";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import bookmark, { bookmarkSaga } from "./bookmark";
import loading, { actionSaga } from "./ui_loading";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  bookmark,
  loading,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield* all([bookmarkSaga(), actionSaga()]);
}

const sagaMiddleware = createSagaMiddleware({
  context: {
    history: history,
  },
});

export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
