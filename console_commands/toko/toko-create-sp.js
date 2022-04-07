//* Create SP Page

let [category] = document.querySelector("span section > div > img").src.match(/(?<=cabinet\/)\w+/)
// let [productNumber] = document.querySelector("span section > div > img").src.match(/(?<=tops\/)(\w|-)+/)
let [productNumber] = window.location.href.match(/(?<=limy\/)\w+/)
productNumber = productNumber.toLowerCase()

let spPage = `
<!-- sp -->
<table>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-top.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><th><b>
${
  document.querySelector("span > section:nth-child(2) > article > h2").innerHTML
}
</b>
</th></tr>
<tr><td height="2"></td></tr>
<tr>
<td>
${
  document.querySelector("span > section:nth-child(2) > article > p").innerHTML
}
</td>
</tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-top2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp4.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp5_2.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td>
${
  document.querySelector("span > section.detail > div > p")?.innerHTML
}
</td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp6_2.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td>
${
  document.querySelector("section.detail > div:nth-child(4) > p")?.innerHTML
}
</td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/title-color-var.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp7.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-c1-2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp8.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp9.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-c2-2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp10.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp11.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-c3-2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${productNumber}-sp12.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
</table>
`

copy(spPage)


//* Create TERAX SP Page

let [category] = document.querySelector("span section > div > img").src.match(/(?<=cabinet\/)\w+/)
let [productNumber] = window.location.href.match(/(?<=limy\/)\w+/)
productNumber = productNumber.toLowerCase()

let spPage = `
<!-- sp -->
<table>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-top.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><th>
${document.querySelector("span > section:nth-child(2) > article > h2").innerHTML}
</th></tr>
<tr><td height="2"></td></tr>
<tr><td>
${ document.querySelector("span > section:nth-child(2) > article > p").innerHTML }
</td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp2.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr>
<td></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/title-detail.jpg" width="100%"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp4.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td>
  ${ document.querySelector("span > section.detail p")?.innerHTML }
</td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/title-color-var.jpg" width="100%"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp5.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp6.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp7.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp8.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/terax/${productNumber}-sp9.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
</table>
`

copy(spPage)