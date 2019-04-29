# Readme

このプロジェクトはChromeの拡張機能です。

Twitterのフォロー理由メモ欄。時間が経つと「なんでフォローしたんだっけ・・・？」を忘れてしまうので、フォロー理由をメモしよう。

という目的のChrome拡張機能です。

今日(2019/4/29)のお昼頃にChromeの拡張機能はJavaScriptが出来れば割と簡単に作れると知って、Qiitaより [RyBB](https://qiita.com/RyBB)さんの記事『[Chrome拡張の作り方 (超概要)](https://qiita.com/RyBB/items/32b2a7b879f21b3edefc)』を参考にしながら数時間で作ったものです。

TwitterのウェブサイトはHTMLが複雑怪奇でして、万人のユーザーにメモ欄が表示される保証ができません。問題があるとすれば`/js/base.js`ファイル内の`var dom_screen_name = document.querySelector("〜")`と`const insert_location = document.querySelector("〜")`のどちらかでうまくDOMが取得できなかったことが考えられます。

