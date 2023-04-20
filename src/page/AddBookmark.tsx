import { useState } from "react";
import Close from "../assets/icon/close.png";
import "./AddBookmark.css";

type Props = {
  setAddBookmark: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBookmark: React.FC<Props> = ({ setAddBookmark }) => {
  const [input, setInput] = useState("");

  return (
    <div className="AddBookmark_container">
      <header>
        <h1>북마크 추가</h1>
        <button onClick={() => setAddBookmark(false)} className="close_btn">
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
        <button className="save_bookmark">Save Bookmark</button>
      </div>
    </div>
  );
};

export default AddBookmark;
