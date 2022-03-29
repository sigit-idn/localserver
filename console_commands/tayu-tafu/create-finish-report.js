// Create FINISH report
copy = copy
let productName = prompt("Product Name", "")
let productNumber = prompt("Product Number", "")
let futureshopNumber = prompt("Futureshop Number", "")
let futureshopCategory = prompt("Futureshop Category", "others")
let [aupayEditNumber, aupayPageNumber] = window.location.href.match(/\d{9,10}/g)

let report = `[To:4048576]吉田 明衣さん
${productName} ${productNumber} Yahoo・自社・aupay・Amazonのページ作りました。
ご確認お願いいたします。

https://store.shopping.yahoo.co.jp/tayu-tafu/${productNumber}.html
https://editor10.store.yahoo.co.jp/RT/tayu-tafu/PageEdit/Index?page_key=${productNumber}&parent_page_key=c1f0cdfaa1&page_mode=Edit&undefined

https://www.tayu-tafu.com/c/${futureshopCategory}/${productNumber}
https://tayutafu.admin.future-shop.net/FutureShop2/GoodsEdit/${futureshopNumber}

https://wowma.jp/item/${aupayPageNumber}
https://manager.wowma.jp/wmshopclient/productRegst/getproduct/update/${aupayEditNumber}

https://sellercentral.amazon.co.jp/inventory/ref=xx_invmgr_dnav_xx?tbla_myitable=sort:%7B%22sortOrder%22%3A%22DESCENDING%22%2C%22sortedColumnId%22%3A%22date%22%7D;search:${productNumber};pagination:1;

`

copy(report)