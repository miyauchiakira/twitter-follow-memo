

var style_wrapper = `
margin: 1rem;
`

var style_header = `
display: block;
margin-bottom: 6px;
`

var style_label = `
display: inline-block;

font-size: 0.8rem;
font-weight: bold;
`

var style_update = `
display: inline-block;
padding: 0.2em 1em;

background: rgb(29, 161, 242);
border: none;
color: white;
border-radius: 100px;
`

var style_content = `
width: 100%;
min-height: 6em;
padding: 1em;
resize: vertical;

outline: none;
box-sizing: border-box;
background: rgba(230, 236, 240, 0.6);
border: none;
`

// backgroundと非同期通信する用の便利関数
function sendMessage(method, value) {
	return new Promise((resolve) => {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message.method === `${method}:result`) {
				resolve(message.value)
			}
		})

		chrome.runtime.sendMessage({ method, value })
	})
}

setTimeout(async function () {
	console.group("twitter-follow-memo")

	// ユーザーのスクリーン名を取得
	const matches = location.href.match(/^https:\/\/twitter\.com\/(.+)$/)
	if(matches === null) return
	const screen_name = matches[1]
	console.log({ screen_name })

	// 既にメモ欄があったら削除
	if (document.querySelector("#twitter-user-memo")) {
		document.querySelector("#twitter-user-memo").remove()
	}

	// 挿入する位置
	const insert_location = document.querySelector(`a[href="/${screen_name}/header_photo"]`).nextSibling

	// 包括DOM
	const dom_wrapper = document.createElement("div")
	dom_wrapper.setAttribute("id", "twitter-user-memo")
	dom_wrapper.setAttribute("style", style_wrapper)
	insert_location.appendChild(dom_wrapper)

	// 「メモ：変更」を囲むヘッダー
	const dom_header = document.createElement("div")
	dom_header.setAttribute("class", "header")
	dom_header.setAttribute("style", style_header)
	dom_wrapper.appendChild(dom_header)

	// 「メモ：」ラベル
	const dom_label = document.createElement("span")
	dom_label.setAttribute("class", "label")
	dom_label.setAttribute("style", style_label)
	dom_label.innerHTML = "メモ："
	dom_header.appendChild(dom_label)

	// 「更新」ボタン
	const dom_update = document.createElement("input")
	dom_update.setAttribute("type", "button")
	dom_update.setAttribute("class", "update")
	dom_update.setAttribute("style", style_update)
	dom_update.setAttribute("value", "更新")
	dom_header.appendChild(dom_update)

	// メモ用テキストエリア
	const dom_content = document.createElement("textarea")
	dom_content.setAttribute("class", "reason")
	dom_content.setAttribute("style", style_content)
	dom_wrapper.appendChild(dom_content)

	// 「更新」をクリックされた
	dom_update.onclick = async function () {
		const memo = dom_content.value
		await sendMessage("set_memo", { key: screen_name, value: memo })
		alert("メモを更新しました")
	}

	// メモがlocalStorageに保存されていたら読み込む
	dom_content.value = await sendMessage("get_memo", screen_name)

	console.groupEnd()
}, 1000)
