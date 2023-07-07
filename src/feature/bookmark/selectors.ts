import { RootState } from "../index";

export const selectLatestKeywords = (state: RootState) =>
  state.bookmark.latestKeywords;

export const selectBookmarks = (state: RootState) => state.bookmark.bookamarks;

export const selectViewBookmark = (state: RootState) =>
  state.bookmark.viewBookmark;

export const selectOpenModal = (state: RootState) => state.bookmark.openModal;

export const selectUrl = (state: RootState) => state.bookmark.url;

export const selectBodyData = (state: RootState) => state.bookmark.bodyData;

export const selectItem = (state: RootState) => state.bookmark.item;

export const selectBookmarkType = (state: RootState) =>
  state.bookmark.bookmarkType;

export const selectKeyword = (state: RootState) => state.bookmark.keyword;

export const selectTitle = (state: RootState) => state.bookmark.pageTitle;

export const selectDescription = (state: RootState) =>
  state.bookmark.pageDescription;
