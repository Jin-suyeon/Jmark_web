import axios from "axios";

export interface Bookmark {
  id: string;
  name: string;
  url: string;
  keywords: string[];
  createdAt: string;
}

export interface Keyword {
  id: string;
  keyword: string;
  createdAt: string;
}

export interface GetKeywordBookmarkParam {
  keywords: string[];
}

export interface GetKeywordBookmarkResult {
  bookmarks: Bookmark[];
  keyword: string;
}

export interface GetPageBookmarkParam {
  url: string;
  text: string;
}

export interface GetPageBookmarkResult {
  bookmarks: Bookmark[];
}

export interface SaveBookmarkParam {
  url: string;
  text: string;
  name: string;
}

export interface ModifyBookmarkParam {
  url: string;
  name: string;
  id: string;
}

export interface DeleteBookmarkParam {
  bookmark_id: string;
}

export interface BookmarkHandler {
  bookmark: {
    id: string;
    name: string;
    url: string;
    keywords: string[];
    createdAt: string;
  };
  type: "keyword" | "page";
}

export const getKeywords = async () => {
  const res = await axios.get(
    "https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/getKeywords"
  );

  return res.data;
};

export const getKeywordBookmark = async (param: GetKeywordBookmarkParam) => {
  const res = await axios.post(
    "https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/getbykeywords",
    param
  );

  return { bookmarks: res.data, keyword: param.keywords.join("") };
};

export const getPageBookmark = async (param: GetPageBookmarkParam) => {
  const res = await axios.post(
    "https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/recommend",
    param
  );

  return res.data;
};

export const saveBookmark = async (param: SaveBookmarkParam) => {
  const res = await axios.post(
    "https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/register",
    param
  );

  return res.data;
};

export const modifyBookmark = async (param: ModifyBookmarkParam) => {
  const res = await axios.post(
    "https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/register",
    param
  );

  return res.data;
};

export const deleteBookmark = async (param: DeleteBookmarkParam) => {
  await axios.delete(
    `https://app-api-l24nw7xyyxpgy.azurewebsites.net/bookmark/delete/${param.bookmark_id}`
  );

  return param;
};
