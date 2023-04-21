import "./App.css";
import Bookmark from "./page/Bookmark";
import AddBookmark from "./page/AddBookmark";
import { useEffect, useState } from "react";

function App() {
  const [addBookmark, setAddBookmark] = useState(false);
  const [bodyData, setBodyData] = useState<any>("");

  useEffect(() => {
    getBackgroundBodyData();
  }, []);

  const getBackgroundBodyData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "extractText" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getExtractedText" },
          (response) => {
            console.log("body :", response);
            setBodyData(response);
          }
        );
      });
    });
  };

  return (
    <div className="App">
      {addBookmark ? (
        <AddBookmark setAddBookmark={setAddBookmark} bodyData={bodyData} />
      ) : (
        <Bookmark setAddBookmark={setAddBookmark} bodyData={bodyData} />
      )}
    </div>
  );
}

export default App;
