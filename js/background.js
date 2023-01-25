
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete') {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["js/base.js"],
		})
	}
})

const methods = {

	// ストレージから値を取得する
	get_memo: async (key) => {
		const result = await chrome.storage.local.get([key])
		return key in result ? result[key] : ''
	},

	// ストレージに値を保存する
	set_memo: async ({ key, value }) => {
		return chrome.storage.local.set({
			[key]: value,
		})
	},
}

// methodsで定義された非同期関数をbaseから実行できるようにする
chrome.runtime.onMessage.addListener(
	async function(request, sender, sendResponse) {
		if (false === request.method in methods) return
		chrome.tabs.sendMessage(sender.tab.id, {
			method: `${request.method}:result`,
			value: await methods[request.method](request.value),
		})
	}
)
