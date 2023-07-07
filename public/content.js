//! 해당 페이지의 text 추출하기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    const text = [...document.querySelectorAll("*")]
      .map((el) => el.innerText)
      .join("\n")
      .replace("\n", " ")
      .substring(0, 900);

    // let textNodes = document.querySelectorAll(
    //   "body, body *:not(script):not(style)"
    // );
    // let text = "";
    // for (let i = 0; i < textNodes.length; i++) {
    //   text += textNodes[i].textContent + "\n";
    // }
    chrome.runtime.sendMessage({ action: "saveText", data: text });
  }
});

//! 해당 페이지의 url 가져오기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUrl") {
    const url = window.location.href;

    chrome.runtime.sendMessage({ action: "saveUrl", data: url });
  }
});

//! 해당 페이지 타이틀 가져오기
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getPageTitle") {
    let pageTitle = document.title;

    chrome.runtime.sendMessage({ action: "saveTitle", data: pageTitle });
  }
});

//! 해당 페이지 description 가져오기
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getDescription") {
    let metaDescription = document.querySelector('meta[name="description"]');
    let pageDescription = metaDescription
      ? metaDescription.getAttribute("content")
      : null;

    chrome.runtime.sendMessage({
      action: "saveDescription",
      data: pageDescription,
    });
  }
});
