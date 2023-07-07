let extractedText = "";
let url = "";
let title = "";
let description = "";

//! 해당 페이지의 text 추출하기

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveText") {
    extractedText = request.data;
  }
});

function getExtractedText() {
  return `${title} ${extractedText}`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getExtractedText") {
    sendResponse(getExtractedText());
  }
});

//! 해당 페이지의 url 가져오기

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

//! 해당 페이지의 title 가져오기

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveTitle") {
    title = request.data;
  }
});

function getTitleData() {
  return title;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSaveTitle") {
    sendResponse(getTitleData());
  }
});

//! 해당 페이지의 description 가져오기

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveDescription") {
    description = request.data;
  }
});

function getDescriptionData() {
  return description;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSaveDescription") {
    sendResponse(getDescriptionData());
  }
});
