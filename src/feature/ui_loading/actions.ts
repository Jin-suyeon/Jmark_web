import { createAction } from "typesafe-actions";
import { Loading } from "./types";

export const startAction = createAction("ui/START_ACTION")<Loading>();
export const stopAction = createAction("ui/STOP_ACTION")<Loading>();
export const successAction = createAction("ui/SUCCESS_ACTION")<{
  type: string;
}>();
export const errorAction = createAction("ui/ERROR_ACTION")<{
  type: string;
  errorCode: number;
  msg: string;
}>();
