// Set LOCALSTORAGE Rental Page
(() => {
let systemCondition = `<font color="red">4.システムの都合上、予約カレンダーが「×」の場合でもご注文ができてしまうため、楽天からの自動確認メールの後、予約の可否についてご連絡させていただきます。
また、カレンダーが「◯」でも、他のお客様と注文が重なり、ご利用日にお送りすることができない場合についても、楽天からの自動確認メールの後、予約の可否をご連絡させていただきます。</font>`

let spBanners = `<a href="https://www.rakuten.ne.jp/gold/watmosphere/rental-test/<%productNumber%>_cal2.html" target="blank"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/banner/rental_cal.jpg" width="100%"></a><br><br>
`
let pcBanners = `<p style="margin: 20px 0 30px 0px;"><a href="https://www.rakuten.ne.jp/gold/watmosphere/rental-test/<%productNumber%>_cal2.html" target="blank"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/banner/rental_cal.jpg" width="100%"></a></p>
`
let slideImage = "https://image.rakuten.co.jp/watmosphere/cabinet/banner/rental_caution.jpg"

localStorage.setItem("rental", JSON.stringify({systemCondition, spBanners, pcBanners, slideImage}))
})();