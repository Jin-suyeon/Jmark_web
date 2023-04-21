//! 해당 페이지의 text 추출하기
let extractedText = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveText") {
    extractedText = request.data;
  }
});

function getExtractedText() {
  return extractedText;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getExtractedText") {
    sendResponse(getExtractedText());
  }
});

//! 해당 페이지의 url 가져오기
let url = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveUrl") {
    url = request.data;
  }
});

function getUrlData() {
  return url;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSaveUrl") {
    sendResponse(getUrlData());
  }
});
