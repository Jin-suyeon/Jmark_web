//! 해당 페이지의 text 추출하기
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    // const text = [...document.querySelectorAll("*")]
    //   .map((el) => el.innerText)
    //   .join("\n");

    let textNodes = document.querySelectorAll(
      "body, body *:not(script):not(style)"
    );
    let text = "";
    for (let i = 0; i < textNodes.length; i++) {
      text += textNodes[i].textContent + "\n";
    }
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
