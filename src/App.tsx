import "./App.css";
import Bookmark from "./page/Bookmark";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBodyData,
  selectDescription,
  selectOpenModal,
  selectTitle,
  selectUrl,
  selectViewBookmark,
  setBodyData,
  setDescription,
  setTitle,
  setUrl,
} from "./feature/bookmark";
import { useAppDispatch } from "./feature";
import UpsertBookmark from "./page/UpsertBookmark";

function App() {
  const dispatch = useAppDispatch();

  const openModal = useSelector(selectOpenModal);
  const viewBookmark = useSelector(selectViewBookmark);
  const bodyData = useSelector(selectBodyData);
  const url = useSelector(selectUrl);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);

  useEffect(() => {
    getBackgroundUrl();

    const deleteLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("unload", deleteLocalStorage);

    return () => {
      window.removeEventListener("unload", deleteLocalStorage);
    };
  }, []);

  useEffect(() => {
    getPageTitle();
  }, [url]);

  useEffect(() => {
    getPageDescription();
  }, [title]);

  useEffect(() => {
    getBackgroundBodyData();
  }, [description]);

  const getPageDescription = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "getDescription" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getSaveDescription" },
          (response) => {
            console.log("description :", response);
            dispatch(setDescription({ description: response }));
          }
        );
      });
    });
  };

  const getBackgroundBodyData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "extractText" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getExtractedText" },
          (response) => {
            console.log("body :", response);
            dispatch(setBodyData({ bodyData: response }));
          }
        );
      });
    });
  };

  const getBackgroundUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "getUrl" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getSaveUrl" },
          (response) => {
            console.log("url :", response);
            dispatch(setUrl({ url: response }));
          }
        );
      });
    });
  };

  const getPageTitle = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = (tabs as any)[0].id;
      chrome.tabs.sendMessage(tabId, { action: "getPageTitle" }, () => {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          { action: "getSaveTitle" },
          (response) => {
            console.log("title :", response);
            dispatch(setTitle({ title: response }));
          }
        );
      });
    });
  };

  return (
    <div className="App">
      {openModal && <UpsertBookmark />}
      {viewBookmark && <Bookmark />}
    </div>
  );
}

export default App;
