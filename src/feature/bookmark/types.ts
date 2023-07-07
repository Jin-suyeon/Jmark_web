import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { Bookmark, Keyword } from "./api";

export type BookmarkAction = ActionType<typeof actions>;

export type BookmarkState = {
  bookamarks: Bookmark[];
  latestKeywords: Keyword[];
  viewBookmark: boolean;
  bookmarkType: "keyword" | "page";
  openModal: boolean;
  url: string;
  bodyData: string;
  item: Bookmark;
  keyword: string;
  pageTitle: string;
  pageDescription: string;
};
