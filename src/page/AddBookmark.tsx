import { useEffect, useState } from "react";
import Close from "../assets/icon/close.png";
import "./AddBookmark.css";
import axios from "axios";

type Props = {
  setAddBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  bodyData: string;
};

const AddBookmark: React.FC<Props> = ({ setAddBookmark, bodyData }) => {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getBackgroundUrl();
  }, []);

  const getBackgroundUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "getUrl" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getSaveUrl" },
          (response) => {
            setUrl(response);
          }
        );
      });
    });
  };

  const saveBookmark = async () => {
    if (input.length > 0) {
      axios
        .post("", {
          url: url,
        })
        .then((res) => res.data.result && setAddBookmark(false))
        .catch((err) => console.log(err));
    }
  };

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
        <button className="save_bookmark" onClick={saveBookmark}>
          Save Bookmark
        </button>
      </div>
    </div>
  );
};

export default AddBookmark;
