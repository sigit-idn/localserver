//*Set Rakuten Variations

let data = await(await fetch("https://script.google.com/macros/s/AKfycbwhQNXQSsQFmXQyz1W_qj70ni_VRM4saTic2yEvVzQLHAXkgVKcWkUa2l6_glVJn5YNYg/exec")).json()

let sizeInputs     = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-14 input");
let sizeCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-8 input");

let colorInputs     = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-14 input");
let colorCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-8 input");

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

let sizes = data.sizes[0].filter(Boolean)

sizes.forEach((size, i) => {
  inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], 'X' + (1000 + i));
});

data.colors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color[0]);
  inputValueChanger.call(colorCodeInputs[i], 'Y' + (1000 + i));
});

document.querySelectorAll('input').forEach(input => {
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focus', { bubbles: true }))
})




//*Download slide images

document
  .querySelectorAll(
    "#pagebody > div:nth-child(11) > div:nth-child(2) > table:nth-child(3) td[valign=top]:first-child img"
  )
  .forEach(async (img) => {
    const imgUrl        = img.src.split("?")[0];
    const filenameArray = imgUrl.split("/");
    const downloadUrl   = await fetch(imgUrl, { mode: "no-cors" })
      .then((res) => res.blob())
      .then((blob) => window.URL.createObjectURL(blob));

    img.parentElement.outerHTML = 
      `<a href="${downloadUrl}" download="${filenameArray[filenameArray.length - 1]
      }">` +
      img.outerHTML +
      "</a>";
  });

document
  .querySelectorAll(
    "#pagebody > div:nth-child(11) > div:nth-child(2) > table:nth-child(3) td[valign=top]:first-child a"
  )
  .forEach((a) => a.click());

// Yahoo Selection Dropdown

document.querySelectorAll(".optionSelection__closeButton").forEach((close, i) => {
  setTimeout(() =>
    console.log(close)
    , 600 * i)
})

let data = await(await fetch("http://localhost:8888/tayutafu")).json();

if (!new RegExp(data.itemNumber).test(window.location.href)) window.location.href = `https://editor10.store.yahoo.co.jp/RT/tayu-tafu/PageEdit/Index?page_key=${data.itemNumber}&parent_page_key=c1aaa4d9a4&page_mode=Edit&undefined`

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

let tabIndex = i

document.querySelector('[name^="optionSelectionTitle"]').scrollIntoView({ behavior: "smooth" })
document.querySelector('[name^="optionSelectionTitle"]').focus()

document
  .querySelectorAll('[name^="optionSelectionTitle"]').forEach((title, i) => {
    title.tabIndex = tabIndex
    tabIndex++
    inputValueChanger.call(title, [Object.keys(data.selection[i])])
    title.onfocus = () => inputValueChanger.call(title, [Object.keys(data.selection[i])])
    title.dispatchEvent(new Event('input', { bubbles: true }))
    title
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .querySelectorAll('[name=optionSelectionItem]').forEach((item, j) => {
        item.tabIndex = tabIndex
        inputValueChanger.call(item, data.selection[i][Object.keys(data.selection[i])][j])
        item.onfocus = () => inputValueChanger.call(item, data.selection[i][Object.keys(data.selection[i])][j] ?? "")
        item.dispatchEvent(new Event('input', { bubbles: true }))
        tabIndex++
      })
  }
  )





// * Tayutafu futureshop set selection GIFTBOX

let data = await fetch(`http://localhost:8888/tayutafu`)
  .then((response) => response.json())
  .then((data) => data);

[...document.querySelectorAll("td:nth-child(4) input")].filter(input => input.id.includes('optionSelection')).forEach((ip, i) =>
  ip.value = (i > 0 ? '+' : '') + data.selection[0][Object.keys(data.selection[0])[0]][i].split('(')[0]);
[...document.querySelectorAll("input")].filter(input => input.id.includes('optionSelectionRank')).forEach((ip, i) => ip.value = i + 1);
[...document.querySelectorAll("input")].filter(input => input.id.includes('optionSelectionPrice')).forEach((ip, i) => ip.value = i > 0 ? data.selection[0][Object.keys(data.selection[0])[0]][i].replaceAll(/\D+/g, '') / 11 * 10 : ip.value);





//* Reset Aupay Shipping Select 

document.querySelectorAll('select[id*=sellDateInfo]').forEach(date => date.value = '')

// *Reset aupay komoku sentakushi

document
  .querySelectorAll("#choiceStockTable input[type=text]")
  .forEach((input) => (input.value = ""));

//?PARK insert <BR> duplicate title SHOPIFY
let newTitle       = document.querySelector(`[placeholder="半袖Tシャツ"]`);
let brandValue     = document.querySelector("[placeholder='例: Nike']").value;
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
let data    = await request.json();

let inputValueChanger    = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
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
let pcPageInput        = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(3) > div.rms-form-col.rms-col-20 > div > div > div > textarea");
let spPageInput        = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(2) > div.rms-form-col.rms-col-20 > div > div > div > textarea");

let spReplace = spPageInput.value.match(/<table width="100%" cellspacing="0" cellpadding="30" bgcolor="#FAFAFA">\n<tr><td>\n<table width="100%" cellspacing="0" cellpadding="5">\n<tr><td><font size="3" color="red">キャンセルについて<\/font><\/td><\/tr>(.|\n)+/)

let descriptionReplace = pcDescriptionInput.value.match(/<p class="order">(.|\n)*/)

textareaValueChanger.call(pcDescriptionInput, pcDescriptionInput.value.replace(descriptionReplace[0], "<!--" + descriptionReplace[0] + "-->" + data.pcDescription).replace("</div>\n<!--/liverental-->", data.descriptionBanner + "</div>\n<!--/liverental-->"))

textareaValueChanger.call(pcPageInput, pcPageInput.value + data.pageBanner);
if (spReplace) {
  textareaValueChanger.call(spPageInput, spPageInput.value.replace(spReplace[0], data.spPage));
} else {
  textareaValueChanger.call(spPageInput, spPageInput.value + data.spPage);
}

document.querySelectorAll('input, textarea').forEach(input => {
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
  input.dispatchEvent(new Event('focus', { bubbles: true }))
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
    input.value                                                          = ''
    input.nextElementSibling.nextElementSibling.nextElementSibling.value = ""
  }
}
)

document.querySelector("#btnSave_bottom").dispatchEvent(new Event('click', { bubbles: true }))

  // * Open new tabs

`202-0177
202-0184
202-0202
202-0308
202-0137
202-0307
202-0466
202-0309
202-0452
202-0454
202-0296
202-0250
202-0480
202-0481
704-0014
704-0016
704-0037
704-0038
704-0057
704-0060
202-0124
202-0147
202-0214
202-0284
202-0432
202-0136
202-0216
202-0217
202-0218
202-0287
704-0052
704-0053
202-0253
704-0049
704-0019
704-0050
202-0182`.split('\n')
  .forEach(number =>
    window.open(`https://editor10.store.yahoo.co.jp/RT/tayu-tafu/PageEdit/Index?page_key=${number}&parent_page_key=a5a8a5a2a1&page_mode=Edit&undefined`,
      "_blank"))

// * Yahoo Erase Yellow Wrap

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set

let element      = document.querySelector('[value="+イエロー　ちぎり花"]');
let priceElement = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.querySelector('input').value = ''

element.scrollIntoView({ behavior: "smooth" });
inputValueChanger.call(element, "")
inputValueChanger.call(priceElement, "");

//* Amazon Change Category

[...document.querySelectorAll(".browseNodeText")].find(({ innerHTML }) => innerHTML.includes('ファッション')).click();
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({ innerHTML }) => innerHTML.includes('レディース')).click();
}, 700);
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({ innerHTML }) => innerHTML.includes('和装')).click();
}, 1400);
setTimeout(() => {
  [...document.querySelectorAll(".browseNodeText")].find(({ innerHTML }) => innerHTML.includes('はんてん')).click();
}, 2100);
setTimeout(() => {
  document.querySelector("#browseCategoriesLevel-4 > span > button > span").click();
}, 2800);

//* Futureshop Multiple Files Upload 

document.querySelector("#goodsImage1Upload").files.forEach()
document.querySelector("#goodsImage2Upload").files[0] = document.querySelector("#goodsImage1Upload").files[0]

//* Amazon Reset Zaiko

document.querySelectorAll('[value="8010"]').forEach(input => {
  input.value   = 0
  input.onfocus = () => input.value = 0
  input.dispatchEvent(new Event("input", { bubbles: true }))
})

// Amazon copy asinCodes

let data = await(await fetch("http://localhost:8888/tayutafu")).json();

data.asinCodes = [...document.querySelectorAll(".mt-text-content.mt-table-detail")]
  .map(span => span.innerText.match(/^[0-9A-Z]{10}$/)?.[0])
  .filter(Boolean)

fetch(`http://localhost:8888/tayutafu`, {
  method        : "POST",
  mode          : "no-cors",
  "Content-Type": "application/json",
  body          : JSON.stringify(data),
})
  .then((res) => console.log({ res }))
  .catch((err) => console.log({ err }));



// Amazon apply asinCodes

let { asinCodes }     = await(await fetch("http://localhost:8888/tayutafu")).json();
let inputValueChanger = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
let asinInput         = document.querySelector("[id^=awsui-autosuggest]")

const findAsin = function (index) {
  inputValueChanger.call(asinInput, asinCodes[index]);
  document.querySelectorAll('input').forEach(input => input.dispatchEvent(new Event("input", { bubbles: true })));
  asinInput.onkeyup = function keyupFunc({ key }) {
    setTimeout(() => {
      document.querySelector("#ApplyContentButton > button").click()
      findAsin(index + (key === "Enter"))
    }, 600)
  }
}

findAsin(0)




// Aupay SHIFT Slide Images
let shiftCount = Number(prompt("Shift"))
let dispImg = document.getElementById('dispImg')
if (!/非/.test(dispImg.innerText)) dispImg.click()

let productImgUrl = document.querySelectorAll('[id^="productImgUrl"]')

if (shiftCount > 0) {
  productImgUrl.forEach((input, i, inputs) => input.value = inputs[i + shiftCount]?.value)
} else {
  for (let i = productImgUrl.length - 1; i >= 0; i--) {
    productImgUrl[i].value = productImgUrl[i + shiftCount]?.value
  }
}

`r21-0004X1000Y1000	【 レンタル 】お仕立て上がり デニム着物 セレクトセット 新ブルー Sサイズ
r21-0004X1000Y1001	【 レンタル 】お仕立て上がり デニム着物 セレクトセット 新インディゴ Sサイズ
`

// Create CALENDAR HTML
copy = copy
let productInfo = prompt("Product")
let productNumber = productInfo.match(/r(\d|-){7}/)?.[0]
window.open("https://soko.rms.rakuten.co.jp/tayu-tafu/" + (prompt("From page?", "") ?? productNumber))

let codes = productInfo.match(/X\d{4}Y\d{4}/g)
let colors = productInfo.match(/(?<=\s+)\S+\s([SML]|\d+cm)/g) ?? productInfo.match(/\S+(?=\s*(\n|$))/g)
let imgSrcs = prompt("Img Src").split(/;/)

document.querySelector(".color").innerHTML = colors.map((color, i) => 
  `<li class="color__item">
  <img src="${imgSrcs[i]}" alt="${color}">
  <button class="color__button" type="button" data-code="${codes[i]}">
    ${color}
  </button>
</li>`
  ).join('\n')

  copy(document.querySelector(".color").innerHTML)

// Copy Image SRC
copy = copy

let pageShot = document.querySelector('#pageShot')

NodeList.prototype.map = Array.prototype.map

pageShot.scrollIntoView({behavior:"smooth"})
copy(pageShot.querySelectorAll("dl img").map(({src}) => src).join(";"))