chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    sendResponse({ message: "Data fetched or action performed" });
  }
});

const fetchDataFromPage = () => {
  console.log("Fetching data from page content...");
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_MATCH_RESULTS") {
    fetchDataFromPage();
    sendResponse({ status: "completed" });
  }
});
