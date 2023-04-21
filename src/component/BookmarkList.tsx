import "./BookmarkList.css";
import Star from "../assets/icon/star.png";
import { useEffect } from "react";

type Props = {
  bookmarkData: {
    keywords: string[];
    name: string;
  }[];
};

const BookmarkList: React.FC<Props> = ({ bookmarkData }) => {
  useEffect(() => {
    document.getElementById("scroll")!.scrollTo(0, 0);
  }, [bookmarkData]);

  return (
    <div className="BookmarkList_container scroll" id="scroll">
      {bookmarkData.map((bookmark, id) => (
        <div key={id} className="Bookmark_data">
          <div className="Bookmark_title_wrap">
            <img className="star" src={Star} alt="star" />
            <div className="tooltip_wrap">
              <h5 className="Bookmark_title">{bookmark.name}</h5>
              <div className="tooltip">{bookmark.name}</div>
            </div>
          </div>
          <div className="Bookmark_keywords">
            {bookmark.keywords.map((keyword, idx) => (
              <span key={idx} className="keyword">
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
