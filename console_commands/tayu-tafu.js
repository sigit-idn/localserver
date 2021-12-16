//*Set Rakuten Variations

let data = await fetch("https://script.google.com/macros/s/AKfycbwhQNXQSsQFmXQyz1W_qj70ni_VRM4saTic2yEvVzQLHAXkgVKcWkUa2l6_glVJn5YNYg/exec")
  .then((res) => res.json())
  .then((data) => data);

let sizeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-14 input");
let sizeCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-8 input");

let colorInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-14 input");
let colorCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-8 input");

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

let sizes = data.sizes[0].filter(size => size)

sizes.forEach((size, i) => {
  inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], 'X' + (1000 + i));
});

data.colors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color[0]);
  inputValueChanger.call(colorCodeInputs[i], 'Y' + (1000 + i));
});

document.querySelectorAll('input').forEach(input => {
  input.dispatchEvent(new Event('input', {bubbles: true}))
  input.dispatchEvent(new Event('change', {bubbles: true}))
  input.dispatchEvent(new Event('focus', {bubbles: true}))
})

//* Pass data from RAKUTEN

let kintoHtml = `
<!-- ▼▼タイトル▼▼ -->
<div id="item-title" style="margin-top:10px;margin-bottom:20px;">
${document.querySelector(".pageCatch dd")?.innerHTML}
</div>
    <!-- ▲▲タイトル▲▲ -->
    <!-- ▼▼コメント▼▼ -->
    <div id="snapAnchor"></div>
    <div class="toggle" id="toggleContent" onclick="toggleContent()">
    <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-comment32.png"></dl>
    <dt>コメント<p style="float:right;"><img id="content-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png"><img id="content-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png"></p></dt>
    </div>
    <div id="item-content">
    <!-- ▼▼内容▼▼ -->
${document.querySelector(".pageMain")?.outerHTML}

${document.querySelector(".pageFloat")?.outerHTML}
    
<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backContent()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
</div>
<!-- ▲▲コメント▲▲ -->

    <!-- ▼▼サイズ▼▼ -->
    <div id="reviewAnchor"></div>
    <div class="toggle" onclick="toggleSize()">
    <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-size32.png"></dl>
    <dt>サイズ<p style="float:right;"><img id="size-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png" style="top:0;display:none;"><img id="size-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png" style="top:0;"></p></dt>
    </div>
    <div id="item-size">
    <!-- ▼▼内容▼▼ -->
    
    <div id="spec" class="clearfix">
    <div class="specTitle">商品の詳細</div>
    <div class="specText">
    <dl>
    <dt>サイズ,容量</dt><dd>${
      document
        .querySelector("span.item_desc")
        ?.innerText.split("サイズ,容量：")[1]
        ?.split("素材,")[0]
    }</dd>
    <dt>素材,生産</dt><dd>${
      document
        .querySelector("span.item_desc")
        .innerText?.split("素材,生産：")[1]
        ?.split("\n")[0]
    }</dd>
    ${
      document.querySelector("span.item_desc").innerText.includes("セット内容")
        ? "<dt>セット内容</dt><dd>" +
          document.querySelector("span.item_desc").innerText?.split("セット内容：")[1]?.split("\n")[0] +
          "</dd>"
        : ""
    }
    </dl>
    </div>
    </div>
    <!-- ▲▲内容▲▲ -->
    <div class="item-back" onclick="backSize()">閉じる<p><img class="icon-back" src="https://tayutafu.itembox.design/item/icon-back32.png"></p></div>
    <!-- ▲▲サイズ▲▲ --></div>
    `.replaceAll(undefined, "");

let notKintoHtml = `<!-- ▼▼タイトル▼▼ -->
 <div id="item-title" style="margin-top:10px;margin-bottom:20px;">
 ${document.querySelector(".pageCatch dd").innerHTML}
 </div>
 <!-- ▲▲タイトル▲▲ -->
 <!-- ▼▼コメント▼▼ -->
 <div id="snapAnchor"></div>
 <div class="toggle" id="toggleContent" onclick="toggleContent()">
 <dl><img class="item-icon" src="https://tayutafu.itembox.design/item/icon-comment32.png"></dl>
 <dt>コメント<p style="float:right;"><img id="content-arrow-up"src="https://tayutafu.itembox.design/item/icon-arrow-up16.png""><img id="content-arrow-down" src="https://tayutafu.itembox.design/item/icon-arrow-down16.png"></p></dt>
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
   ({outerHTML}) => outerHTML + "<br><br>"
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

let data = {};
data.selection = [];
data.catchCopy =
  document
    .querySelector(".catch_copy > b")?.innerText.replaceAll("あす楽", "") ??
  document.querySelector(".catch_copy").innerText.replaceAll("あす楽", "");
data.itemName = document.querySelector(".item_name").innerText.replaceAll("あす楽", "");
data.itemNumber = document.querySelector(".item_number").innerText;
data.price = parseInt(document.querySelector("[itemprop=price]").getAttribute("content"));
data.priceNoTax = Math.ceil(data.price - data.price / 11);
data.size = [...document.querySelectorAll("tr:first-child > td > span.inventory_choice_name")].map(({innerText}) => innerText);
data.color = [...document.querySelectorAll("tr:not(:first-child) > td > span.inventory_choice_name")].map(({innerText}) => innerText);
data.description = document.querySelector("span.item_desc").innerText;
document.querySelector("span.choice") ? document.querySelectorAll("span.choice")?.forEach((option, i) =>
          (data.selection[i] = {[option.innerText]: [...document.querySelectorAll("select[name=choice]")[i]?.children].map(({innerText}) => innerText)}))
  : "";
data.futureshopHtml = data.itemName.includes("KINTO")
  ? kintoHtml
  : notKintoHtml;
fetch(`http://localhost:8888/tayutafu`, {
  method: "POST",
  mode: "no-cors",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then((res) => console.log("Success", res))
  .catch((err) => console.log("Error", err));

//*Download slide images

document
  .querySelectorAll(
    "#pagebody > div:nth-child(11) > div:nth-child(2) > table:nth-child(3) td[valign=top]:first-child img"
  )
  .forEach(async (img) => {
    const imgUrl = img.src.split("?")[0];
    const filenameArray = imgUrl.split("/");
    const downloadUrl = await fetch(imgUrl, { mode: "no-cors" })
      .then((res) => res.blob())
      .then((blob) => window.URL.createObjectURL(blob));

    img.parentElement.outerHTML =
      `<a href="${downloadUrl}" download="${
        filenameArray[filenameArray.length - 1]
      }">` +
      img.outerHTML +
      "</a>";
  });

document
  .querySelectorAll(
    "#pagebody > div:nth-child(11) > div:nth-child(2) > table:nth-child(3) td[valign=top]:first-child a"
  )
  .forEach((a) => a.click());

//*Selection from data to Yahoo

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

document.querySelectorAll(".optionSelection__column:last-child [name=optionSelectionItem]")
.forEach((input, i) => {
	input.addEventListener('focus', () =>
  inputValueChanger.call(input, "+" + data.selection[3][Object.keys(data.selection[3])[0]][i])
	)
  input.dispatchEvent(new Event('input', {bubbles : true}));
  input.dispatchEvent(new Event('change', {bubbles : true}));
  input.dispatchEvent(new Event('click', {bubbles : true}));
  input.dispatchEvent(new Event('focus', {bubbles : true}));
});



document.querySelectorAll("input[name=]")
  .forEach((input, i) => {
    input.value = data.selection[0]["【兵児帯】"][i];
  });

//* Yahoo Submit Product
  let data = await fetch("http://localhost:8888/tayutafu")
  .then((res) => res.json())
.then((data) => data);

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;

let itemNumberInput = document.querySelector("[name=__submit__product_code]");
let itemNameInput = document.querySelector("[name=__submit__name]"); 
let priceInput = document.querySelector("[name=__submit__price]")

let manageNumberInput = document.querySelector("[name=__submit__code]");

let yahooCatchCopyInput = document.querySelector("[name=__submit__headline]");
let descriptionInput = document.querySelector("[name=__submit__explanation]")


document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

inputValueChanger.call(itemNameInput, data.itemName.replace(/(【|】)\s*/g, "").substring(0, 75))
inputValueChanger.call(itemNumberInput, data.itemNumber);

textareaValueChanger.call(descriptionInput, data.description.replaceAll(undefined, ""));
textareaValueChanger.call(yahooCatchCopyInput, data.catchCopy.replace(/(【|】)\s*/g, "").substring(0, 30));

inputValueChanger.call(manageNumberInput, data.itemNumber);

priceInput.value = data.price;

let searchValue = document.querySelector("#now_page_key").value;
let replaceValue = data.itemNumber.toLowerCase();
document.querySelectorAll('[type=text]').forEach(input => inputValueChanger.call(input, input.value.replaceAll(searchValue, replaceValue)))
document.querySelectorAll('textarea').forEach(textarea => textareaValueChanger.call(textarea, textarea.value.replaceAll(searchValue, replaceValue)))

// Count characters
document.querySelector("#react-tabs-1 > div > div:nth-child(16) > div:nth-child(4) > div.uiGridA__gridA2 > div > div > div.formParts__list > ul > li:nth-child(1) > span > span > textarea").oninput = ({target}) => 
console.log(target.value.length);

document
.querySelectorAll("[type=text], textarea")
.forEach((input) => {
input.dispatchEvent(new Event("input", {bubbles: true}));
input.dispatchEvent(new Event("change", {bubbles: true}));
});

//* Yahoo komoku sentaku

document
  .querySelectorAll(
    ".optionSelection__column:first-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    inputValueChanger.call(input, data.color[i - 1]);
    input.onfocus = () => inputValueChanger.call(input, data.color[i - 1]);
  });
document
  .querySelectorAll(
    ".optionSelection__column:last-child [name=optionSelectionItem]:not(:first-child)"
  )
  .forEach((input, i) => {
    input.addEventListener("focus", () =>
      inputValueChanger.call(input, data.size[i - 1])
    );
  });

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

//* Tayutafu Yahoo variation table

let xValue = 0;
let yValue = 0;

document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    yValue = Math.floor(i / data.size.length);
    inputValueChanger.call(
      input,
      data.itemNumber + "X" + (1000 + xValue) + "Y" + (1000 + yValue)
    );
    let newValue = input.value;
    input.onfocus = () => {
      inputValueChanger.call(input, newValue);
    };
    xValue = xValue >= data.size.length - 1 ? 0 : xValue + 1;
  });

document
  .querySelectorAll(".stockList .stockList__tableWrap tr:nth-child(1) textarea")
  .forEach((textArea, i) => {
    textArea.tabIndex = i + 1;
    textareaValueChanger.call(
      textArea,
      `https://shopping.c.yimg.jp/lib/tayu-tafu/${data.itemNumber}-${i + 1}.jpg`
    );
    // textareaValueChanger.call(textArea, `https://shopping.c.yimg.jp/lib/tayu-tafu/${data.itemNumber}-c100${i}.jpg`)
    const newValue = textArea.value;
    textArea.onfocus = () => textareaValueChanger.call(textArea, newValue);
  });

document.querySelectorAll('input, textarea').forEach(input => {
input.dispatchEvent(new Event('input', {bubbles: true}))
input.dispatchEvent(new Event('change', {bubbles: true}))
})


//* Load data into futureshop
document.querySelector(".dataTable_01").scrollIntoView({ behavior: "smooth" });

let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelector("#goodsCatchCopy").value = data.catchCopy + "<br>";
document
  .querySelectorAll("#goodsName, input#goodsTitleExternal")
  .forEach((input) => (input.value = data.itemName.split("【")[0]));
document.querySelector("#goodsDescriptionExternal").value = data.description;
document.querySelector("#goodsNo").value = data.itemNumber;
document.querySelector("#goodsUrl").value = data.itemNumber;
document.querySelector("#unitPrice").value = data.priceNoTax;

document.querySelector("#submit_0").click();

//* Futureshop selection dropdown
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);
document.querySelectorAll("input[id*=selectionItemName]")
  .forEach(
    (dorpdownItem, i) =>
      (dorpdownItem.value = data.selection[i]
        ? Object.keys(data.selection[i])
        : null)
  );
document.querySelectorAll("input[id*=selectionName]")
  .forEach(
    (dorpdownItem, i) =>
      (dorpdownItem.value = data.selection[i]
        ? data.selection[i][Object.keys(data.selection[i])].join("~")
        : null)
  );

//* futureshop variations
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelectorAll("input[id*=verticalItemName]")
  .forEach(
    (colorInput, i) => (colorInput.value = data.color[i] ? data.color[i] : "")
  );
document.querySelectorAll("input[id*=verticalAdminNo]")
  .forEach(
    (colorInput, i) =>
      (colorInput.value = data.color[i] ? "Y" + (1000 + i) : "")
  );
document.querySelectorAll("input[id*=horizontalItemName]")
  .forEach(
    (sizeInput, i) => (sizeInput.value = data.size[i] ? data.size[i] : "")
  );
document.querySelectorAll("input[id*=horizontalAdminNo]")
  .forEach(
    (sizeInput, i) => (sizeInput.value = data.size[i] ? "X" + (1000 + i) : "")
  );
document.querySelectorAll("input[name*=verticalDelete]")
  .forEach((colorDelete, i) => (colorDelete.checked = !data.color[i] && true));
document.querySelectorAll("input[name*=horizontalDelete]")
  .forEach((sizeDelete, i) => (sizeDelete.checked = !data.size[i] && true));
document.querySelector("#itemNameVertical").value = data.color[0]
  ? "カラー"
  : "";
document.querySelector("#itemNameHorizontal").value = data.size[0]
  ? "サイズ"
  : "";
document.querySelector("#submit_0").click();

//* FUTURESHOP set zaikosuu to 0
[...document.querySelectorAll("input")]
  .filter((input) => input.name.includes("janCode"))
  .forEach(
    (janInput) =>
      (janInput.value =
        janInput.parentElement.previousElementSibling.innerText)
  );
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });

[...document.querySelectorAll("input")]
  .filter((input) => input.id.includes("addStockCount"))
  .forEach(
    (newStock, i) =>
      (newStock.value = -document.querySelectorAll("table td:nth-child(6)")[i]
        .innerText)
  );

// * Tayutafu futureshop set selection gift box

let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

[...document.querySelectorAll("td:nth-child(4) input")].filter(input => input.id.includes('optionSelection')).forEach((ip, i) => 
ip.value = ( i > 0 ? '+' : '' ) + data.selection[0][Object.keys(data.selection[0])[0]][i].split('(')[0]);
[...document.querySelectorAll("input")].filter(input => input.id.includes('optionSelectionRank')).forEach((ip, i) => ip.value = i + 1);
[...document.querySelectorAll("input")].filter(input => input.id.includes('optionSelectionPrice')).forEach((ip, i) => ip.value = i > 0 ? data.selection[0][Object.keys(data.selection[0])[0]][i].replaceAll(/\D+/g, '') / 11 * 10 : ip.value);


//* futureshop Google
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelector("#title").value = data.itemName.split("【")[0];
document.querySelector("#mpn").value = data.itemNumber.replace("-", "");

document.querySelectorAll("#form tr:nth-child(12) tr:nth-child(3) table input").forEach((input, i, inputs) => {
  const initialNumber = parseInt(inputs[0].value.match(/(?<=-)\d\d(?=-)/))
  input.value = inputs[0].value.replace(inputs[0].value.match(/(?<=-)\d\d(?=-)/), initialNumber + i)
}
)

document.querySelector("#submit_0").click();

//* futureshop insert Alt
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

  document
    .querySelectorAll("#form > div > table:nth-child(6) input[maxlength='500']")
    .forEach((input) => (input.value = data.itemName.split("【")[0]));
  let selectedIndex = 50, selectedValue
  document.querySelectorAll("select[name*=VerticalSelect]").forEach((select, i) => {
    if (select.value) {
      selectedIndex = i
      selectedValue = select.value
    }
  
    if (i > selectedIndex) {
      const number = selectedValue.match(/\d+$/)
      const newValue = selectedValue.replace(number, parseInt(number) + i - selectedIndex)
      select.value = newValue
      if(select.querySelector(`[value=${newValue}]`)) {
        select.querySelector(`[value=${newValue}]`).selected = true
      }
    }
  })
  
  document.querySelectorAll("[type=checkbox][name*=VerticalThumbnail]")
  .forEach((check) => check.click());
!document.querySelector(
  "#form > div > table:nth-child(6) > tbody > tr:nth-child(2) > th > label > input[type=radio]"
).checked &&
  !document
    .querySelector(
      "#form > div > table:nth-child(6) > tbody > tr:nth-child(2) > th > label > input[type=radio]"
    )
    .click();
document.querySelector("#submit_0").click();

//* futureshop Comment
document.querySelector(".local_menu").scrollIntoView({ behavior: "smooth" });
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelector("#outline").value = data.itemName.split("【")[0];
document.querySelector("#descriptionLong").value = data.futureshopHtml;

document.querySelector("#submit_0").click();

//* Load data into Aupay
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document.querySelector("#productCd_ctl").value = data.itemNumber;
document.querySelector("#productName_ctl").value = data.itemName;
document.querySelector("#sellPrice").value = data.priceNoTax;
document.querySelector("#alterstock > dl:nth-child(1) > dd").style.backgroundColor = "#ff0"
let countChars = () => {
  const target = document.querySelector("#_main_frm > div:nth-child(20) > dl:nth-child(1) > dd > div.wm-input-comment")
  const {length} = document.querySelector("#productExplnCmn_ctl").value
  target.style.backgroundColor = length > 512 ? "#ff0" : "transparent"
  target.innerHTML = 
  `全角512文字（半角1,024文字）以内<br />
  ※使用できるHTMLタグ： &lt;br&gt;　&lt;center&gt;　&lt;font&gt;　&lt;hr&gt;　&lt;a&gt;
  <h5 style="color: #000">${length}</h5>`}
document.querySelector("#productExplnCmn_ctl").addEventListener('input', countChars)
document.querySelector("#productExplnCmn_ctl").value =
  data.description.replaceAll("\n", "<br>\n");
document.querySelectorAll("input[name*=productBuyOptTitle]")
  .forEach(
    (dorpdownItem, i) =>
      (dorpdownItem.value = data.selection[i]
        ? Object.keys(data.selection[i])
        : null)
  );
document.querySelectorAll("textarea[name*=productBuyOptChoices]")
  .forEach(
    (dorpdownItem, i) =>
      (dorpdownItem.value = data.selection[i]
        ? data.selection[i][Object.keys(data.selection[i])].join("\n")
        : null)
  );

  let oldProductNumber = document.querySelector('#productExplnSp_ctl').value.match(/\d{3}-\d{4}/) ?? prompt("Old Product Number")

  document.querySelectorAll('[type=text], textarea').forEach(input => input.value = input.value.replaceAll(oldProductNumber, data.itemNumber));

document.querySelectorAll('input[name*=productImgUrl]')
.forEach((imageUrl, i) => imageUrl.value = imageUrl.value.replaceAll(oldProductNumber, data.itemNumber));

countChars()

//* aupay komoku sentakushi
let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

document
  .querySelectorAll("input[name*=choicesColLabel]")
  .forEach((sizeInput, i) => (sizeInput.value = data.size[i] || ""));
document
  .querySelectorAll("input[name*=choicesRowLabel]")
  .forEach((sizeInput, i) => (sizeInput.value = data.color[i] || ""));

let colArray = [
  ...document.querySelectorAll(
    `#choiceRowTable .styleConfig:nth-child(1) input`
  ),
].map((input) => input.value);
let rowArray = [
  ...document.querySelectorAll(`#choiceColTable tr:first-child input`),
].map((input) => input.value);
document
  .querySelectorAll(`#stockMatrix tr`)
  .forEach((tr, i) =>
    tr
      .querySelectorAll("input")
      .forEach(
        (input, j) => (input.value = colArray[i] ? (rowArray[j] ? 0 : "") : "")
      )
  );
document
  .querySelectorAll(`#choiceRowTable .styleConfig:nth-child(2) input`)
  .forEach((input, i) => (input.value = colArray[i] ? "Y" + (1000 + i) : ""));
document
  .querySelectorAll(`#choiceColTable tr:nth-child(2) input`)
  .forEach((input, i) => (input.value = rowArray[i] ? "X" + (1000 + i) : ""));

//* Reset Aupay Shipping Select 

document.querySelectorAll('select[id*=sellDateInfo]').forEach(date => date.value = '')

// *Reset aupay komoku sentakushi

document
  .querySelectorAll("#choiceStockTable input[type=text]")
  .forEach((input) => (input.value = ""));

//?PARK insert <BR> duplicate title SHOPIFY
let newTitle = document.querySelector(`[placeholder="半袖Tシャツ"]`);
let brandValue = document.querySelector("[placeholder='例: Nike']").value;
newTitle.value = newTitle.value
  .split(brandValue)
  .join("<br>" + brandValue + "<br>");

//*Aupay selections 
selections.forEach((selection, i) => {
  document.querySelectorAll(`div:nth-child(53) > dl:nth-child(1) input[maxlength="100"]`)[i].value = "+" + selection.split('(')[0];
  document.querySelectorAll(`div:nth-child(53) > dl:nth-child(1) input[maxlength="13"]`)[i].value = Math.floor(selection.split('+')[1]?.split('円')[0] * 10 / 11);
})

//* Add Rental Cancel Banner 

let request = await fetch("http://localhost:8888/watmos");
let data = await request.json();

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
// let searchValues = [
//   /<p class="order">(.|\n)*/,
//   `</div>
//   <!--/liverental-->`
// ];
// let replaceValues = [
// "<!--" + /<p class="order">(.|\n)*/ + "-->" + data.pcDescription,
// data.descriptionBanner + `
// </div>
// <!--/liverental-->`
// ]



let pcDescriptionInput = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col-20 > div > div > div > textarea");
let pcPageInput = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(3) > div.rms-form-col.rms-col-20 > div > div > div > textarea");
let spPageInput = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(2) > div.rms-form-col.rms-col-20 > div > div > div > textarea");

let spReplace = spPageInput.value.match(/<table width="100%" cellspacing="0" cellpadding="30" bgcolor="#FAFAFA">\n<tr><td>\n<table width="100%" cellspacing="0" cellpadding="5">\n<tr><td><font size="3" color="red">キャンセルについて<\/font><\/td><\/tr>(.|\n)+/)

let descriptionReplace = pcDescriptionInput.value.match(/<p class="order">(.|\n)*/)

textareaValueChanger.call(pcDescriptionInput, pcDescriptionInput.value.replace(descriptionReplace[0], "<!--" + descriptionReplace[0] + "-->" + data.pcDescription).replace("</div>\n<!--/liverental-->", data.descriptionBanner + "</div>\n<!--/liverental-->"))

textareaValueChanger.call(pcPageInput, pcPageInput.value + data.pageBanner);
if (spReplace) {
  textareaValueChanger.call(spPageInput, spPageInput.value.replace(spReplace[0], data.spPage));
} else {
  textareaValueChanger.call(spPageInput, spPageInput.value + data.spPage);
}

document.querySelectorAll('input, textarea').forEach(input =>{
		input.dispatchEvent(new Event('input', {bubbles: true}))
		input.dispatchEvent(new Event('change', {bubbles: true}))
		input.dispatchEvent(new Event('focus', {bubbles: true}))
		})


//* featureshop erase yellow price option

document.querySelectorAll('tr').forEach(tr => {
	if (tr.innerHTML.includes("イエロー")) {
		tr.firstElementChild.firstElementChild.checked = true;
	}
})
document.querySelector("#submit_3").click()

//* featureshop insert wrap variation iframe 

let iframe = `<iframe src="https://www.rakuten.ne.jp/gold/tayu-tafu/iframe/colors/220-0037-c.html" scrolling="no" allowtransparency="true" frameborder="0" width="100%" height="570"></iframe>\n`

document.querySelector("#descriptionLong").value = document.querySelector("#descriptionLong").value.replace(
	`<img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/704/airkaol_sentaku.jpg`,
	iframe + `<img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/704/airkaol_sentaku.jpg`
 ).replace('<img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/220/220-0037/220-0037-sp-c3.jpg" width="100%"><br><br>', '')

 if (!document.querySelector("#descriptionLong").value.includes(iframe)) {
	document.querySelector("#descriptionLong").value = document.querySelector("#descriptionLong").value.replace(`<!-- ▲▲内容▲▲ -->\n<div class="item-back" onclick="backReview()">閉じる<p>`, iframe + `<!-- ▲▲内容▲▲ -->\n<div class="item-back" onclick="backReview()">閉じる<p>`)
 }

 document.querySelector("#submit_0").click();

//* Futureshop Erase yellow dropdown option

document.querySelectorAll('[type=text]').forEach(input => input.value = input.value.replace('イエロー~', ''))

// *Filter products

`704-0016
704-0008
704-0014
704-0054
704-0035
704-0031
704-0027
704-0021
704-0013
704-0060
704-0057
704-0053
704-0052
704-0037
704-0038
202-0155
202-0138
202-0396
202-0351
202-0339
202-0297
202-0186
202-0180
202-0179
202-0510
202-0511
202-0341`.split('\n')
.forEach(number => 
	document.querySelectorAll('td').forEach(td => 
			td.style.backgroundColor = td.innerText.includes(number) && "yellow"
	))

	document.querySelectorAll('a').forEach(a => a.addEventListener('click', () => a.style.backgroundColor = "yellow"))

	// * Wowma Erase Yellow Wrap

	document.querySelector("#dispImg").click();
	document.querySelectorAll('textarea').forEach(textarea => textarea.value = textarea.value.replaceAll(
		'https://image.wowma.jp/54002551/tayu-tafu/cabinet/220/220-0037-sp-c.jpg',
		'https://image.wowma.jp/54002551/tayu-tafu/cabinet/220/220-0037-sp-c4.jpg',
	))
	document.querySelectorAll('input').forEach(input => {
		input.value = input.value.replaceAll(
		'https://image.wowma.jp/54002551/tayu-tafu/cabinet/220/220-0037-sp-c.jpg',
		'https://image.wowma.jp/54002551/tayu-tafu/cabinet/220/220-0037-sp-c4.jpg',
	)
		if (input.value.includes('イエロー') && input.value.includes('ちぎり花')) {
			input.value = ''
			input.nextElementSibling.nextElementSibling.nextElementSibling.value = ""
		}}
	)

	document.querySelector("#btnSave_bottom").dispatchEvent(new Event('click', {bubbles: true}))

	// * Open new tabs

	`704-0014
	704-0054
	704-0035
	704-0031
	704-0027
	704-0021
	704-0013
	704-0060
	704-0057
	704-0053
	704-0052
	704-0037
	704-0038
	202-0155
	202-0138
	202-0396
	202-0351
	202-0339
	202-0297
	202-0186
	202-0180
	202-0179
	202-0510
	202-0511
	202-0341`.split('\n')
	.forEach(number => 
		window.open(`https://editor10.store.yahoo.co.jp/RT/tayu-tafu/PageEdit/Index?page_key=${number}&parent_page_key=a5a8a5a2a1&page_mode=Edit&undefined`,
		"_blank"))

// * Yahoo Erase Yellow Wrap

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set

let element = document.querySelector('[value="+イエロー　ちぎり花"]');
let priceElement = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.querySelector('input').value = ''

element.scrollIntoView({behavior:"smooth"});
inputValueChanger.call(element, "")
inputValueChanger.call(priceElement, "");

//* Amazon Change Category

[...document.querySelectorAll(".browseNodeText")].find(({innerHTML}) => innerHTML.includes('ファッション')).click();
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({innerHTML}) => innerHTML.includes('レディース')).click();
}, 700);
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({innerHTML}) => innerHTML.includes('和装')).click();
}, 1400);
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({innerHTML}) => innerHTML.includes('はんてん')).click();
}, 2100);
setTimeout(() => {
  document.querySelector("#browseCategoriesLevel-4 > span > button > span").click();
}, 2800);

//* Futureshop Multiple Files Upload 

document.querySelector("#goodsImage1Upload").files.forEach()
document.querySelector("#goodsImage2Upload").files[0] = document.querySelector("#goodsImage1Upload").files[0]

//* Amazon Reset Zaiko

document.querySelectorAll('[value="8010"]').forEach(input => {
  input.value = 0
  input.onfocus = () => input.value = 0
  input.dispatchEvent(new Event("input", {bubbles : true}))
})