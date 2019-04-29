

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

setTimeout(function() {
	
	// ユーザーのスクリーン名を取得
	var dom_screen_name = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-1pi2tsx.r-sa2ff0.r-13qz1uu.r-417010 > main > div > div.css-1dbjc4n.r-aqfbo4.r-e84r5y.r-16y2uox > div > div.css-1dbjc4n.r-14lw9ot.r-1jgb5lz.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div > div > div > div:nth-child(1) > div > div.css-1dbjc4n.r-15d164r.r-1g94qm0 > div > div.css-1dbjc4n.r-18u37iz.r-1wbh5a2 > div > span")

	// DOMが取得できなかった場合（プロフィールページ以外とか）
	if(!dom_screen_name) {
		console.log("ERROR: Failed to fetching the user's screen name. Probably here is not profile page.")
		return
	}
	
	const screen_name = dom_screen_name.innerHTML
	
	// 既にメモ欄があったら削除
	if(document.querySelector('#twitter-user-memo')) {
		document.querySelector('#twitter-user-memo').remove()
	}
	
	// 挿入する位置
	const insert_location = document.querySelector("#react-root > div > div > div.css-1dbjc4n.r-1pi2tsx.r-sa2ff0.r-13qz1uu.r-417010 > main > div > div.css-1dbjc4n.r-aqfbo4.r-e84r5y.r-16y2uox > div > div.css-1dbjc4n.r-14lw9ot.r-1jgb5lz.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div > div > div > div:nth-child(1) > div > div.css-1dbjc4n.r-15d164r.r-1g94qm0 > div")
	
	// 包括DOM
	const dom_wrapper = document.createElement('div')
	dom_wrapper.setAttribute('id', 'twitter-user-memo')
	dom_wrapper.setAttribute('style', style_wrapper)
	insert_location.appendChild(dom_wrapper)

	// 「メモ：変更」を囲むヘッダー
	const dom_header = document.createElement('div')
	dom_header.setAttribute('class', 'header')
	dom_header.setAttribute('style', style_header)
	dom_wrapper.appendChild(dom_header)

	// 「メモ：」ラベル
	const dom_label = document.createElement('span')
	dom_label.setAttribute('class', 'label')
	dom_label.setAttribute('style', style_label)
	dom_label.innerHTML = "メモ："
	dom_header.appendChild(dom_label)

	// 「更新」ボタン
	const dom_update = document.createElement('input')
	dom_update.setAttribute('type', 'button')
	dom_update.setAttribute('class', 'update')
	dom_update.setAttribute('style', style_update)
	dom_update.setAttribute('value', '更新')
	dom_header.appendChild(dom_update)

	// メモ用テキストエリア
	const dom_content = document.createElement('textarea')
	dom_content.setAttribute('class', 'reason')
	dom_content.setAttribute('style', style_content)
	dom_wrapper.appendChild(dom_content)

	// 「更新」をクリックされた
	dom_update.onclick = function(){
		const memo = dom_content.value
		const value = {memo: memo}
		
		chrome.runtime.sendMessage({method: 'setItem', key: screen_name, value: JSON.stringify(value)})
		
		alert("メモを更新しました")
	}
	
	// メモがlocalStorageに保存されていたら読み込む
	chrome.runtime.sendMessage({method: 'getItem', key: screen_name}, function (response) {
		if (response.data) {
			const memo = response.data.memo
			dom_content.value = memo
		}
	})

}, 1000)
