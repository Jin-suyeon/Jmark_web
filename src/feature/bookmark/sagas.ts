import { all, put, takeLeading } from "typed-redux-saga";
import createAsyncSaga from "../../libs/createAsyncSaga";
import {
  DELETE_BOOKMARK,
  GET_KEYWORDS,
  GET_KEYWORD_BOOKMARK,
  GET_KEYWORD_BOOKMARK_SUCCESS,
  GET_PAGE_BOOKMARK,
  MODIFY_BOOKMARK,
  SAVE_BOOKMARK,
  deleteBookmarkAsync,
  getKeywordBookmarkAsync,
  getKeywordsAsync,
  getPageBookmarkAsync,
  modifyBookmarkAsync,
  saveBookmarkAsync,
} from "./actions";
import {
  deleteBookmark,
  getKeywordBookmark,
  getKeywords,
  getPageBookmark,
  modifyBookmark,
  saveBookmark,
} from "./api";

const getKeywordsSaga = createAsyncSaga(getKeywordsAsync, getKeywords);

const getKeywordBookmarkSaga = createAsyncSaga(
  getKeywordBookmarkAsync,
  getKeywordBookmark
);
const getPageBookmarkSaga = createAsyncSaga(
  getPageBookmarkAsync,
  getPageBookmark
);

const saveBookmarkSaga = createAsyncSaga(saveBookmarkAsync, saveBookmark);
const modifyBookmarkSaga = createAsyncSaga(modifyBookmarkAsync, modifyBookmark);
const deleteBookmarkSaga = createAsyncSaga(deleteBookmarkAsync, deleteBookmark);

export function* bookmarkSaga() {
  yield* all([
    yield* takeLeading(GET_KEYWORDS, getKeywordsSaga),
    yield* takeLeading(GET_KEYWORD_BOOKMARK, getKeywordBookmarkSaga),
    yield* takeLeading(GET_PAGE_BOOKMARK, getPageBookmarkSaga),
    yield* takeLeading(SAVE_BOOKMARK, saveBookmarkSaga),
    yield* takeLeading(MODIFY_BOOKMARK, modifyBookmarkSaga),
    yield* takeLeading(DELETE_BOOKMARK, deleteBookmarkSaga),
    yield* takeLeading(GET_KEYWORD_BOOKMARK_SUCCESS, getKeywordsSaga),
  ]);
}
