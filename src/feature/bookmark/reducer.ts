import { createReducer } from "typesafe-actions";
import { produce } from "immer";
import { BookmarkAction, BookmarkState } from "./types";
import {
  deleteBookmarkAsync,
  getKeywordBookmarkAsync,
  getKeywordsAsync,
  getPageBookmarkAsync,
  modifyBookmarkAsync,
  saveBookmarkAsync,
  setBodyData,
  setBookmarkType,
  setDescription,
  setKeyword,
  setTitle,
  setUpsertBookmark,
  setUrl,
  setViewBookmark,
} from "./actions";

const initialState: BookmarkState = {
  bookamarks: [],
  latestKeywords: [],
  viewBookmark: true,
  bookmarkType:
    (localStorage.getItem("bookmarkType") as "keyword" | "page") || "keyword",
  openModal: false,
  url: "",
  bodyData: "",
  item: { id: "", name: "", url: "", keywords: [], createdAt: "" },
  keyword: localStorage.getItem("keyword") || "",
  pageTitle: "",
  pageDescription: "",
};

const bookmark = createReducer<BookmarkState, BookmarkAction>(initialState)
  .handleAction(getKeywordsAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.latestKeywords = payload.reverse();
    });
  })
  .handleAction(getKeywordBookmarkAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.bookamarks = payload.bookmarks;
      draft.keyword = payload.keyword;
    });
  })
  .handleAction(getPageBookmarkAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.bookamarks = payload;
    });
  })
  .handleAction(saveBookmarkAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.viewBookmark = true;
      draft.openModal = false;
    });
  })
  .handleAction(modifyBookmarkAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.viewBookmark = true;
      draft.openModal = false;
    });
  })
  .handleAction(deleteBookmarkAsync.success, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.bookamarks = state.bookamarks.filter(
        (bookmark) => bookmark.id !== payload.bookmark_id
      );
    });
  })
  .handleAction(setViewBookmark, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.viewBookmark = payload.type;
    });
  })
  .handleAction(setBookmarkType, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.bookmarkType = payload.type;
      localStorage.setItem("bookmarkType", payload.type);
    });
  })
  .handleAction(setUpsertBookmark, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.openModal = payload.type;
      draft.viewBookmark = !payload.type;

      if (payload.bookmarkType) {
        localStorage.setItem("bookmarkType", payload.bookmarkType);
      }

      if (payload.data) {
        draft.item = payload.data;
      } else {
        draft.item = { id: "", name: "", url: "", keywords: [], createdAt: "" };
      }
    });
  })
  .handleAction(setUrl, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.url = payload.url;
    });
  })
  .handleAction(setBodyData, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.bodyData = payload.bodyData;
    });
  })
  .handleAction(setKeyword, (state, { payload }) => {
    return produce(state, (draft) => {
      localStorage.setItem("keyword", payload.keyword);
    });
  })
  .handleAction(setTitle, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.pageTitle = payload.title;
    });
  })
  .handleAction(setDescription, (state, { payload }) => {
    return produce(state, (draft) => {
      draft.pageDescription = payload.description;
    });
  });

export default bookmark;
