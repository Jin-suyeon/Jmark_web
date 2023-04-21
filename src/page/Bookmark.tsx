import "./Bookmark.css";
import PLUS from "../assets/icon/plus.png";
import { useEffect, useState } from "react";
import BookmarkList from "../component/BookmarkList";

type Props = {
  setAddBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  bodyData: string;
};

const Bookmark: React.FC<Props> = ({ setAddBookmark, bodyData }) => {
  const [bookmarkChange, setBookmarkChange] = useState(false);
  const [search, setSearch] = useState("");

  const keywords = [
    "react",
    "javascript",
    "typescript",
    "nodejs",
    "html",
    "css",
    "python",
    "java",
  ];

  const keywordBookmark = [
    {
      keywords: [
        "react",
        "javascriptjavascripjavascriptjavascripjavascriptjavascrip",
        "typescript",
        "nodejs",
        "html",
      ],
      name: "react를 배우는 사람에게 필요한 정보들123123123123123123123123123123",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "react를 배우는 사람에게 필요한 정보들",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "react를 배우는 사람에게 필요한 정보들",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "react를 배우는 사람에게 필요한 정보들",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "react를 배우는 사람에게 필요한 정보들",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "react를 배우는 사람에게 필요한 정보들",
    },
  ];

  const pageBookmark = [
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
    {
      keywords: ["react", "javascript", "typescript", "nodejs", "html"],
      name: "page에 연관된 정보들이 들어있는 북마크",
    },
  ];

  useEffect(() => {
    if (bookmarkChange) {
      getPageBookmark();
    } else {
      getKeywordBookmark();
    }
  }, [bookmarkChange]);

  const getKeywordBookmark = async () => {
    //! 키워드 관련 북마크 가져오기
    console.log("키워드 관련 북마크 가져오기");
  };

  const getPageBookmark = async () => {
    //! 페이지 관련 북마크 가져오기
    console.log("페이지 관련 북마크 가져오기");
  };

  return (
    <div className="Bookmark_container">
      <header>
        <h1>J-MARK</h1>
        <button onClick={() => setAddBookmark(true)}>
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
          value={search}
        />
      </div>

      <div className="recent_keyword_wrap">
        <h5>최근 검색 키워드</h5>
        <div className="recent_keyword_list">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="keyword"
              onClick={() => setSearch(keyword)}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="bookmark_btn_wrap">
        <h5>북마크 리스트</h5>
        <div className="btn_wrap">
          <button
            onClick={() => setBookmarkChange(false)}
            className={`bookmark_btn ${!bookmarkChange ? "btn_active" : ""}`}
          >
            키워드 검색 북마크
          </button>
          <button
            onClick={() => setBookmarkChange(true)}
            className={`bookmark_btn ${bookmarkChange ? "btn_active" : ""}`}
          >
            페이지 연관 북마크
          </button>
        </div>
      </div>

      <div>
        <BookmarkList
          bookmarkData={bookmarkChange ? pageBookmark : keywordBookmark}
        />
      </div>
    </div>
  );
};

export default Bookmark;
