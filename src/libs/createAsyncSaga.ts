import { put, call } from "typed-redux-saga";
import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";
import {
  errorAction,
  startAction,
  stopAction,
  successAction,
} from "../feature/ui_loading";

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== null;
}

export default function createAsyncSaga<P1, P2, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [string, [P1, undefined]],
    [string, [P2, undefined]],
    [string, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      yield* put(startAction({ name: action.type }));
      const result = isPayloadAction<P1>(action)
        ? yield* call(promiseCreator, action.payload)
        : yield* call(promiseCreator as any);
      yield put(asyncActionCreator.success(result as any));
      yield* put(
        successAction({ type: asyncActionCreator.success.toString() })
      );
    } catch (error: any) {
      if (error.response) {
        console.log(
          "요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
        );
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(asyncActionCreator.failure.toString());
        yield* put(
          errorAction({
            type: asyncActionCreator.failure.toString(),
            errorCode: error.response.status,
            msg: "",
          })
        );
        // yield* put(
        //   errorAction({
        //     msg: `서버와 통신중 오류(code: ${error.response.status})가 발생했습니다. 관리자에게 문의해주세요.`,
        //   })
        // );
      } else if (error.request) {
        console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
        yield* put(
          errorAction({ msg: "네트워크 에러", type: "", errorCode: 0 })
        );
      } else {
        console.log(
          "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
        );
        console.log(error, action);
        console.log("Error", error.message);
        yield* put(errorAction({ msg: error.message, type: "", errorCode: 0 }));
      }
      console.log("에러 config", error.config);
      // yield put(asyncActionCreator.failure(e));
    } finally {
      yield* put(stopAction({ name: action.type }));
    }
  };
}
