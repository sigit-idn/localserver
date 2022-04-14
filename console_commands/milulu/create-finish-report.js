// Create finish REPORT
copy = copy
let { productNumber } = await(await fetch(`http://localhost:8888/milulu`)).json();
let deadline          = prompt("Deadline").match(/\d+/g)?.join('/')
let shoplistId        = window.location.href.match(/\d{7}$/)[0] ?? prompt("Shoplist ID")

let finishReport = `[To:2958152]羽納典さん
ミルル${deadline}のタスク ${productNumber} 登録しました。
ご確認宜しくお願い致します。

https://item.rakuten.co.jp/milulu/${productNumber}/
https://item.rms.rakuten.co.jp/rms-item/shops/275447/item/edit/${productNumber}

https://service.shop-list.com/shopadmin/product/ProductDetail?product_id=${shoplistId}

https://store.shopping.yahoo.co.jp/milulu-shop/${productNumber}.html
https://editor3.store.yahoo.co.jp/RT/milulu-shop/PageEdit/index?page_key=${productNumber}&page_mode=Edit

https://sellercentral-japan.amazon.com/inventory/ref=xx_invmgr_dnav_xx?tbla_myitable=sort:%7B%22sortOrder%22%3A%22ASCENDING%22%2C%22sortedColumnId%22%3A%22skucondition%22%7D;search:${productNumber};pagination:1;`

copy(finishReport)