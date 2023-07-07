import { createReducer } from "typesafe-actions";
import { LoadingAction, LoadingState } from "./types";
import { errorAction, startAction, stopAction, successAction } from "./actions";
import { concat } from "../../libs";
import produce from "immer";

function getSuccessMsg(successAction: string) {
  switch (successAction) {
    default:
      return "";
  }
}

function getErrorMsg(errorAction: string) {
  switch (errorAction) {
    default:
      return "";
  }
}

const initialState: LoadingState = {
  actions: [],
  success: {
    msg: "",
  },
  error: {
    msg: "",
  },
  loading: false,
};

const loading = createReducer<LoadingState, LoadingAction>(initialState)
  .handleAction(startAction, (state, action) => {
    return {
      ...state,
      actions: concat(state.actions, action.payload),
      loading: true,
    };
  })
  .handleAction(stopAction, (state, action) => {
    return {
      ...state,
      actions: state.actions.filter((a) => a.name !== action.payload.name),
      loading: false,
    };
  })
  .handleAction(successAction, (state, action) => {
    return produce(state, (draft) => {
      const msg = getSuccessMsg(action.payload.type);
      if (msg.length) {
        draft.success = {
          msg,
        };
      }
    });
  })
  .handleAction(errorAction, (state, action) => {
    return produce(state, (draft) => {
      const msg = getErrorMsg(action.payload.type);

      if (msg.length > 0) {
        draft.error = {
          msg,
        };
      } else if (action.payload.msg) {
        draft.error = {
          msg: action.payload.msg,
        };
      } else {
        if (action.payload.type.length !== 0) {
          draft.error = {
            msg: `서버와 통신중 오류(code: ${action.payload.errorCode})가 발생했습니다. 관리자에게 문의해주세요.`,
          };
        } else {
          draft.error = {
            msg: action.payload.msg,
          };
        }
      }
    });
  });

export default loading;
