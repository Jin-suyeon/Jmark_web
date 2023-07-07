import "./BookmarkList.css";
import Star from "../assets/icon/star.png";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../feature";
import {
  Bookmark,
  deleteBookmarkAsync,
  selectBookmarkType,
  selectBookmarks,
  selectViewBookmark,
  setUpsertBookmark,
} from "../feature/bookmark";
import { useSelector } from "react-redux";
import { selectLoading } from "../feature/ui_loading";
import BigSpinner from "./BigSpinner";

type Props = {};

const BookmarkList: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const bookmarkType = useSelector(selectBookmarkType);
  const bookmarks = useSelector(selectBookmarks);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (bookmarks.length > 0) document.getElementById("scroll")!.scrollTo(0, 0);
  }, [bookmarkType]);

  const deleteBookmark = (id: string) => {
    if (bookmarkType === "keyword" || bookmarkType === "page")
      dispatch(deleteBookmarkAsync.request({ bookmark_id: id }));
  };

  if (loading) {
    return <BigSpinner />;
  } else if (bookmarks.length === 0) {
    return (
      <div className="BookmarkList_container">
        <div className="none_bookmark">북마크가 존재하지 않습니다.</div>
      </div>
    );
  }

  return (
    <div className="BookmarkList_container scroll" id="scroll">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="Bookmark_data">
          <div className="Bookmark_title_wrap">
            <img className="star" src={Star} alt="star" />
            <div className="tooltip_wrap">
              <a href={bookmark.url} target="_blank" className="Bookmark_title">
                {bookmark.name}
              </a>
              <div className="tooltip">{bookmark.name}</div>
              <div className="btn_wrap">
                <button
                  onClick={() => {
                    dispatch(
                      setUpsertBookmark({
                        type: true,
                        data: bookmark,
                      })
                    );
                  }}
                >
                  수정
                </button>
                <button onClick={() => deleteBookmark(bookmark.id)}>
                  삭제
                </button>
              </div>
            </div>
          </div>
          <div className="Bookmark_keywords">
            {bookmark.keywords.map((keyword) => (
              <span key={keyword} className="keyword">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
