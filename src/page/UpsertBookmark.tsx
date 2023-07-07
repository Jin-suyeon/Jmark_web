import { useEffect, useState } from "react";
import Close from "../assets/icon/close.png";
import "./UpsertBookmark.css";
import { useSelector } from "react-redux";
import {
  saveBookmarkAsync,
  selectBodyData,
  selectUrl,
  modifyBookmarkAsync,
  selectItem,
  setUpsertBookmark,
  selectBookmarkType,
  selectTitle,
  selectDescription,
} from "../feature/bookmark";
import { useAppDispatch } from "../feature";
import { selectLoading } from "../feature/ui_loading";
import Spinner from "../component/Spinner";

type Props = {};

const UpsertBookmark: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const url = useSelector(selectUrl);
  const bodyData = useSelector(selectBodyData);
  const title = useSelector(selectTitle);
  const desctiprion = useSelector(selectDescription);
  const item = useSelector(selectItem);
  const bookmarkType = useSelector(selectBookmarkType);
  const loading = useSelector(selectLoading);
  const pageTitle = useSelector(selectTitle);

  const [input, setInput] = useState(pageTitle);

  useEffect(() => {
    if (item.id) {
      setInput(item.name);
    }
  }, [item]);

  const upsertBookmark = async () => {
    if (item.id) {
      dispatch(
        modifyBookmarkAsync.request({
          url: item.url,
          name: input,
          id: item.id,
        })
      );
    } else {
      const body = `${title} ${desctiprion} ${bodyData}`;
      let bodyArr = body.split(" ");

      let deleteDuplicate = [...new Set(bodyArr)].join("");

      dispatch(
        saveBookmarkAsync.request({
          url: url,
          text: deleteDuplicate.substring(0, 900),
          name: input,
        })
      );
    }
  };

  return (
    <div className="AddBookmark_container">
      <header>
        <h1>북마크 추가</h1>
        <button
          onClick={() =>
            dispatch(
              setUpsertBookmark({ type: false, bookmarkType: bookmarkType })
            )
          }
          className="close_btn"
        >
          <img className="close_icon" src={Close} alt="close" />
        </button>
      </header>

      <div className="input_bookmark_wrap">
        <input
          className="input_bookmark"
          type="text"
          placeholder="북마크이름을 입력해주세요"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className={`save_bookmark ${loading && "loading"}`}
          onClick={upsertBookmark}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Bookmark"}
        </button>
      </div>
    </div>
  );
};

export default UpsertBookmark;
