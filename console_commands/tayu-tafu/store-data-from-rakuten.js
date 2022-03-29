//* STORE data from Rakuten

let setHtml = `<style media="screen and (min-width: 768px)">
.topleft {
top: 1em;
left: 1em;
}  
</style>

<!-- ▼▼タイトル▼▼ -->
<div id="item-title" style="margin-top:10px;margin-bottom:20px;">

${document.querySelector(".pageCatch dd")?.innerHTML}

</div>
<!-- ▲▲タイトル▲▲ -->
<!-- ▼▼コメント▼▼ -->
<div id="snapAnchor"></div>
<div class="toggle" id="toggleContent" onclick="toggleContent()">
<dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-comment32.png"></dl>
<dt>コメント<p style="float:right;"><img id="content-arrow-up" src="https://tayutafu.itembox.design/item/icon-arrow-up16.png""><img id="content-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png"></p></dt>
</div>
<div id="item-content">
<!-- ▼▼内容▼▼ -->
${document.querySelector(".pageMain")?.outerHTML}
 
${document.querySelector("#pageVari")?.parentElement?.outerHTML}

 <br><br>
 <p class="colorVari">▼カラーバリエーション</p>
 ${document.querySelector("#colors")?.outerHTML ?? document.querySelector('iframe[src*="colors"]')?.outerHTML}


<br>

<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backContent()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
</div>
<!-- ▲▲コメント▲▲ -->



<!-- ▼▼スナップ▼▼ -->
<div id="sizeAnchor"></div>
<div class="toggle" onclick="toggleSnap()">
<dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-snap32.png"></dl>
<dt>スナップ<p style="float:right;"><img id="snap-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="snap-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0; "></p></dt></div>
<div id="item-snap" display="none">
<!-- ▼▼内容▼▼ -->

<br><br>

${document.querySelector(".look") 
  ? [...document.querySelectorAll(".look")].map(({ outerHTML }) => outerHTML + "<br><br>") 
  : document.querySelector('iframe[src*="shot"]')?.outerHTML
    .replace(/(height=")(\d+)((px)*")/g,
      (_, p1, p2, p3) => `${p1}${parseInt(p2) + 1100}${p3}`)
}


<br>



<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backSnap()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
</div>
<!-- ▲▲スナップ▲▲ -->


<!-- ▼▼サイズ▼▼ -->
<div id="reviewAnchor"></div>
<div class="toggle" onclick="toggleSize()">
<dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-size32.png"></dl>
<dt>サイズ<p style="float:right;"><img id="size-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="size-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0;"></p></dt>
</div>
<style> #spec iframe{ height: calc(${parseInt(document.querySelector("#spec iframe")?.height)}px - 13.66px + 1vw); }</style>
 <div id="item-size">
 <!-- ▼▼内容▼▼ -->
 ${document.querySelector("#spec")?.outerHTML}

<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backSize()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
</div>
<!-- ▲▲サイズ▲▲ -->

${document.querySelector("#sizeReview") ?
`<!-- ▼▼レビュー▼▼ -->
<div class="toggle" onclick="toggleReview()">
<dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-review32.png"></dl>
<dt>レビュー<p style="float:right;"><img id="review-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="review-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0; "></p></dt>
</div>
<div id="item-review">
<!-- ▼▼内容▼▼ -->

${document.querySelector("#sizeReview")?.outerHTML}

<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backReview()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
</div>
<!-- ▲▲レビュー▲▲ -->`
: ""}
`

let notSetHtml = `<!-- ▼▼タイトル▼▼ -->
 <div id="item-title" style="margin-top:10px;margin-bottom:20px;">
 ${document.querySelector(".pageCatch dd")?.innerHTML}
 </div>
 <!-- ▲▲タイトル▲▲ -->
 <!-- ▼▼コメント▼▼ -->
 <div id="snapAnchor"></div>
 <div class="toggle" id="toggleContent" onclick="toggleContent()">
 <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-comment32.png"></dl>
 <dt>コメント<p style="float:right;"><img id="content-arrow-up" src="https://tayutafu.itembox.design/item/icon-arrow-up16.png""><img id="content-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png"></p></dt>
 </div>
 <div id="item-content">
 <!-- ▼▼内容▼▼ -->
 ${document.querySelector(".pageMain")?.outerHTML}
 
 ${document.querySelector("#pageVari")?.outerHTML}
 
 <br>
 
 <!-- ▲▲内容▲▲ -->
 <div class="item-back" onclick="backContent()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
 </div>
 <!-- ▲▲コメント▲▲ -->
 
 
 
 <!-- ▼▼スナップ▼▼ -->
 <div id="sizeAnchor"></div>
 <div class="toggle" onclick="toggleSnap()">
 <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-snap32.png"></dl>
 <dt>スナップ<p style="float:right;"><img id="snap-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="snap-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0; "></p></dt></div>
 <div id="item-snap" display="none">
 <!-- ▼▼内容▼▼ -->
 ${document.querySelector("#pageSnap")?.outerHTML}
 <br><br>
 
 ${document.querySelector("#pageShot")?.outerHTML}
 
 <br><br>
 <p class="colorVari">▼カラーバリエーション</p>
 ${document.querySelector("#colors")?.outerHTML}
 
 <br>
 
 ${[...document.querySelectorAll(".look")].map(
  ({ outerHTML }) => outerHTML + "<br><br>"
)}
 
 <!-- ▲▲内容▲▲ -->
 <div class="item-back" onclick="backSnap()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
 </div>
 <!-- ▲▲スナップ▲▲ -->
 
 
 <!-- ▼▼サイズ▼▼ -->
 <div id="reviewAnchor"></div>
 <div class="toggle" onclick="toggleSize()">
 <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-size32.png"></dl>
 <dt>サイズ<p style="float:right;"><img id="size-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="size-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0;"></p></dt>
 </div>
 <style> #spec iframe{ height: calc(${parseInt(document.querySelector("#spec iframe")?.height)}px - 13.66px + 1vw); }</style>
 <div id="item-size">
 <!-- ▼▼内容▼▼ -->
 ${document.querySelector("#spec")?.outerHTML}
 
 <!-- ▲▲内容▲▲ -->
 <div class="item-back" onclick="backSize()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
 </div>
 <!-- ▲▲サイズ▲▲ -->
 
 
 <!-- ▼▼レビュー▼▼ -->
 <div class="toggle" onclick="toggleReview()">
 <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-review32.png"></dl>
 <dt>レビュー<p style="float:right;"><img id="review-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="review-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0; "></p></dt>
 </div>
 <div id="item-review">
 <!-- ▼▼内容▼▼ -->
 
 ${document.querySelector("#sizeReview")?.outerHTML}
 
 <!-- ▲▲内容▲▲ -->
 <div class="item-back" onclick="backReview()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
 </div>
 <!-- ▲▲レビュー▲▲ -->
 `.replaceAll(undefined, "");

let data           = {};
    data.selection = [];
    data.catchCopy = 
  document
    .querySelector(".catch_copy > b")?.innerText.replaceAll("あす楽", "") ??
  document.querySelector(".catch_copy")?.innerText.replaceAll("あす楽", "");
data.itemName    = document.querySelector(".item_name")?.innerText.replaceAll("あす楽", "");
data.itemNumber  = document.querySelector(".item_number")?.innerText;
data.price       = parseInt(document.querySelector("[itemprop=price]").getAttribute("content"));
data.priceNoTax  = Math.ceil(data.price - data.price / 11);
data.size        = [...document.querySelectorAll("tr:first-child > td > span.inventory_choice_name")].map(({ innerText }) => innerText);
data.color       = [...document.querySelectorAll("tr:not(:first-child) > td > span.inventory_choice_name")].map(({ innerText }) => innerText);
data.description = document.querySelector("span.item_desc").innerText;
document.querySelector("span.choice") ? document.querySelectorAll("span.choice")?.forEach((option, i) =>
  (data.selection[i] = { [option.innerText]: [...document.querySelectorAll("select[name=choice]")[i]?.children].map(({ innerText }) => innerText) }))
  :  "";
data.futureshopHtml = /セット/.test(data.itemName) ? setHtml : notSetHtml;
data.isMailShipping = /メール便/.test(document.querySelector(".dsf-cheapest-shipping-method")?.innerText)
data.deliveryDays   = document.querySelector('[data-delivery-date]')?.dataset?.deliveryDate
let post = await fetch(`http://localhost:8888/tayutafu`, {
  method        : "POST",
  mode          : "no-cors",
  "Content-Type": "application/json",
  body          : JSON.stringify(data),
})

console.log(post);
document.querySelector('.floating-cart-options-table').scrollIntoView({ block: "center", behavior: "smooth" })