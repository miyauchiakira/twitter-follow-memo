
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
		chrome.tabs.executeScript(tab.id, { file: "js/base.js" })
	}
})

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch (request.method) {
				
			case 'getItem':
				sendResponse({data: JSON.parse(localStorage.getItem(request.key))})
				break
				
			case 'setItem':
				sendResponse({data: localStorage.setItem(request.key, request.value)})
				break
				
			case 'removeItem':
				sendResponse({data: localStorage.removeItem[request.key]})
				break
		}
	}
)
