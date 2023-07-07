import { createAsyncAction, createAction } from "typesafe-actions";
import { AxiosError } from "axios";
import {
  Bookmark,
  BookmarkHandler,
  DeleteBookmarkParam,
  GetKeywordBookmarkParam,
  GetKeywordBookmarkResult,
  GetPageBookmarkParam,
  GetPageBookmarkResult,
  Keyword,
  ModifyBookmarkParam,
  SaveBookmarkParam,
} from "./api";

export const GET_KEYWORDS = "bookmark/GET_KEYWORDS";
export const GET_KEYWORDS_SUCCESS = "bookmark/GET_KEYWORDS_SUCCESS";
export const GET_KEYWORDS_ERROR = "bookmark/GET_KEYWORDS_ERROR";
export const getKeywordsAsync = createAsyncAction(
  GET_KEYWORDS,
  GET_KEYWORDS_SUCCESS,
  GET_KEYWORDS_ERROR
)<any, Keyword[], AxiosError>();

export const GET_KEYWORD_BOOKMARK = "bookmark/GET_KEYWORD_BOOKMARK";
export const GET_KEYWORD_BOOKMARK_SUCCESS =
  "bookmark/GET_KEYWORD_BOOKMARK_SUCCESS";
export const GET_KEYWORD_BOOKMARK_ERROR = "bookmark/GET_KEYWORD_BOOKMARK_ERROR";
export const getKeywordBookmarkAsync = createAsyncAction(
  GET_KEYWORD_BOOKMARK,
  GET_KEYWORD_BOOKMARK_SUCCESS,
  GET_KEYWORD_BOOKMARK_ERROR
)<GetKeywordBookmarkParam, GetKeywordBookmarkResult, AxiosError>();

export const GET_PAGE_BOOKMARK = "bookmark/GET_PAGE_BOOKMARK";
export const GET_PAGE_BOOKMARK_SUCCESS = "bookmark/GET_PAGE_BOOKMARK_SUCCESS";
export const GET_PAGE_BOOKMARK_ERROR = "bookmark/GET_PAGE_BOOKMARK_ERROR";
export const getPageBookmarkAsync = createAsyncAction(
  GET_PAGE_BOOKMARK,
  GET_PAGE_BOOKMARK_SUCCESS,
  GET_PAGE_BOOKMARK_ERROR
)<GetPageBookmarkParam, Bookmark[], AxiosError>();

export const SAVE_BOOKMARK = "bookmark/SAVE_BOOKMARK";
export const SAVE_BOOKMARK_SUCCESS = "bookmark/SAVE_BOOKMARK_SUCCESS";
export const SAVE_BOOKMARK_ERROR = "bookmark/SAVE_BOOKMARK_ERROR";
export const saveBookmarkAsync = createAsyncAction(
  SAVE_BOOKMARK,
  SAVE_BOOKMARK_SUCCESS,
  SAVE_BOOKMARK_ERROR
)<SaveBookmarkParam, BookmarkHandler, AxiosError>();

export const MODIFY_BOOKMARK = "bookmark/MODIFY_BOOKMARK";
export const MODIFY_BOOKMARK_SUCCESS = "bookmark/MODIFY_BOOKMARK_SUCCESS";
export const MODIFY_BOOKMARK_ERROR = "bookmark/MODIFY_BOOKMARK_ERROR";
export const modifyBookmarkAsync = createAsyncAction(
  MODIFY_BOOKMARK,
  MODIFY_BOOKMARK_SUCCESS,
  MODIFY_BOOKMARK_ERROR
)<ModifyBookmarkParam, BookmarkHandler, AxiosError>();

export const DELETE_BOOKMARK = "bookmark/DELETE_BOOKMARK";
export const DELETE_BOOKMARK_SUCCESS = "bookmark/DELETE_BOOKMARK_SUCCESS";
export const DELETE_BOOKMARK_ERROR = "bookmark/DELETE_BOOKMARK_ERROR";
export const deleteBookmarkAsync = createAsyncAction(
  DELETE_BOOKMARK,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_ERROR
)<DeleteBookmarkParam, DeleteBookmarkParam, AxiosError>();

export const setViewBookmark = createAction("bookmark/SET_VIEW_BOOKMARK")<{
  type: boolean;
}>();

export const setBookmarkType = createAction("bookmark/SET_BOOKMARK_TYPE")<{
  type: "keyword" | "page";
}>();

export const setUpsertBookmark = createAction("bookmark/SET_UPSERT_BOOKMARK")<{
  type: boolean;
  data?: Bookmark;
  bookmarkType?: "keyword" | "page";
}>();

export const setUrl = createAction("bookmark/SET_URL")<{
  url: string;
}>();

export const setBodyData = createAction("bookmark/SET_BODY_DATA")<{
  bodyData: string;
}>();

export const setTitle = createAction("bookmark/SET_TITLE")<{
  title: string;
}>();

export const setDescription = createAction("bookmark/SET_DESCRIPTION")<{
  description: string;
}>();

export const setKeyword = createAction("bookmark/SET_KEYWORD")<{
  keyword: string;
}>();
