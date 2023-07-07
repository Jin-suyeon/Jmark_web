import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type Loading = {
  name: string;
  id?: string;
};

export type LoadingAction = ActionType<typeof actions>;

export type LoadingState = {
  actions: Loading[];
  success: {
    msg: string;
  };
  error: {
    msg: string;
  };
  loading: boolean;
};
