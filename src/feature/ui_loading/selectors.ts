import { RootState } from "../index";

export const selectSuccessMsg = (state: RootState) => state.loading.success;
export const selectErrorMsg = (state: RootState) => state.loading.error;

export const selectLoading = (state: RootState) => state.loading.loading;
