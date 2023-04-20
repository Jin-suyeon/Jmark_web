import "./BookmarkList.css";
import Star from "../assets/icon/star.png";

type Props = {
  bookmarkData: {
    keywords: string[];
    name: string;
  }[];
};

const BookmarkList: React.FC<Props> = ({ bookmarkData }) => {
  return (
    <div className="BookmarkList_container">
      {bookmarkData.map((bookmark) => (
        <div className="Bookmark_data">
          <div className="Bookmark_title_wrap">
            <img className="star" src={Star} alt="star" />
            <div className="tooltip_wrap">
              <h5 className="Bookmark_title">{bookmark.name}</h5>
              <div className="tooltip">{bookmark.name}</div>
            </div>
          </div>
          <div className="Bookmark_keywords">
            {bookmark.keywords.map((keyword) => (
              <span className="keyword">{keyword}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
