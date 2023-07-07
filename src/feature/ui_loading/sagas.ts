import { all, put, take, takeEvery } from "typed-redux-saga";

export function* takexSaga(pattern: RegExp) {
  let action;
  while (true) {
    action = yield* take("*");
    if (pattern.test(action.type)) {
      continue;
    }
  }
}

export function* actionSaga() {
  yield* takexSaga(/SUCCESS$/gi);
}
