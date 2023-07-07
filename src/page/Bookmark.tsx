import "./Bookmark.css";
import PLUS from "../assets/icon/plus.png";
import { useEffect, useState } from "react";
import BookmarkList from "../component/BookmarkList";
import axios from "axios";
import { useAppDispatch } from "../feature";
import { useSelector } from "react-redux";
import {
  getKeywordBookmarkAsync,
  getKeywordsAsync,
  getPageBookmarkAsync,
  selectBodyData,
  selectBookmarkType,
  selectBookmarks,
  selectKeyword,
  selectLatestKeywords,
  selectUrl,
  setBookmarkType,
  setUpsertBookmark,
} from "../feature/bookmark";
import { selectLoading } from "../feature/ui_loading";

type Props = {};

const Bookmark: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const latestKeywords = useSelector(selectLatestKeywords);
  const url = useSelector(selectUrl);
  const bodyData = useSelector(selectBodyData);
  const bookmarkType = useSelector(selectBookmarkType);
  const keyword = useSelector(selectKeyword);
  const loading = useSelector(selectLoading);

  const [search, setSearch] = useState(keyword);

  useEffect(() => {
    getLastestKeywords();
  }, []);

  useEffect(() => {
    if (bookmarkType === "page") {
      getPageBookmark();
    } else if (bookmarkType === "keyword") {
      getKeywordBookmark();
    }
  }, [bookmarkType]);

  const getLastestKeywords = () => {
    dispatch(getKeywordsAsync.request({}));
  };

  const getKeywordBookmark = (text?: string) => {
    if (text) {
      setSearch(text);

      dispatch(getKeywordBookmarkAsync.request({ keywords: [text] }));
    } else {
      let arr: string[] = [];

      if (search.length === 0) {
        arr = [];
      } else {
        if (search.includes(",")) {
          arr = search.replace(/\s/g, "").split(",");
        } else {
          arr = [search];
        }
      }

      dispatch(getKeywordBookmarkAsync.request({ keywords: arr }));
    }
  };

  const getPageBookmark = () => {
    setSearch("");
    dispatch(getPageBookmarkAsync.request({ url: url, text: bodyData }));
  };

  return (
    <div className="Bookmark_container">
      <header>
        <h1>J-MARK</h1>
        <button onClick={() => dispatch(setUpsertBookmark({ type: true }))}>
          <span className="btn_title">BOOKMARK</span>
          <span>
            <img className="add_img" src={PLUS} alt="add" />
          </span>
        </button>
      </header>

      <div className="input_wrap">
        <input
          className="keyword_search"
          type="text"
          placeholder="키워드를 입력해주세요"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getKeywordBookmark()}
          value={search}
        />
      </div>

      <div className="recent_keyword_wrap">
        <h5>최근 검색 키워드</h5>
        <div className="recent_keyword_list">
          {latestKeywords.slice(0, 6).map((keyword) => (
            <span
              key={keyword.id}
              className="keyword"
              onClick={() => getKeywordBookmark(keyword.keyword)}
            >
              {keyword.keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="bookmark_btn_wrap">
        <h5>북마크 리스트</h5>
        <div className="btn_wrap">
          <button
            onClick={() => dispatch(setBookmarkType({ type: "keyword" }))}
            className={`bookmark_btn ${
              bookmarkType === "keyword" ? "btn_active" : ""
            }`}
            disabled={loading}
          >
            키워드 검색 북마크
          </button>
          <button
            onClick={() => dispatch(setBookmarkType({ type: "page" }))}
            className={`bookmark_btn ${
              bookmarkType === "page" ? "btn_active" : ""
            }`}
            disabled={loading}
          >
            페이지 연관 북마크
          </button>
        </div>
      </div>

      <div className={loading ? "bookmarkList_wrap" : ""}>
        <BookmarkList />
      </div>
    </div>
  );
};

export default Bookmark;
