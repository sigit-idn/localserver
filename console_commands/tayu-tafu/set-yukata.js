// Yukata Set Rakuten

let {
  data,
  productNames,
  detailImages,
  yukataTexts,
  beltTexts,
  mainThemes,
  subThemes,
  pricesWithTax,
  descriptionSizes
} = await (await fetch('http://localhost:8888/yukata-set')).json();

let prices = Object.keys(pricesWithTax).reduce((acc, key) => {
  acc[key] = Math.floor(pricesWithTax[key] / 1.1)
  return acc
}, {})

let modelIndex = 0;

let models = prompt("モデル身長を入力してください", "156").replace(/\d+/g, 
  (match) => ["A", "B", "C"][modelIndex++] + '身長/' + match + 'cm ')

descriptionSizes = JSON.parse(JSON.stringify(descriptionSizes).replace(/<<models>>/g, models))

let pageTitles = prompt("タイトルを入力してください", "")

let pageTexts = prompt("テキストを入力してください", "")

let [ oomoji, chumoji, komoji, paragraphTitle ] = pageTitles?.match(/\S+/g) ?? ["", "", "", ""]
let paragraph = pageTexts?.replace(/。(\s|\t|[ 　	])*(\n)/g, '。<br>$2')


NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.find = Array.prototype.find
NodeList.prototype.filter = Array.prototype.filter

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;

let getTextFieldByTitle = (title) =>
document.querySelectorAll('.rms-form-row').find(row => new RegExp(title).test(row.innerText)).querySelector('textarea, input[type=text]')

let manageNumberInput = document.querySelector("[name=itemManageNumber]");
let productNumberInput = document.querySelector("[name=itemNumber]");
let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");
let categoryInputs = document
.querySelectorAll(".rms-form-row")
.find((row) => /表示先カテゴリ/.test(row.innerHTML))
.querySelectorAll("input");

let descriptionInput = getTextFieldByTitle("PC用商品説明文")
let mobilePageInput = getTextFieldByTitle('スマートフォン用商品説明文')
let pcPageInput = getTextFieldByTitle('PC用販売説明文')

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = document.querySelectorAll("input[name^=url_]");
let altInputs = document.querySelectorAll("input[name^=alt_]");

let productNumber = /edit/.test(window.location.href) ? productNumberInput.value :prompt("商品番号を入力してください");
inputValueChanger.call(productNumberInput, productNumber);
if(manageNumberInput) inputValueChanger.call(manageNumberInput, productNumber);
let productType = Object.keys(data).find(key => data[key] === productNumber).toLocaleLowerCase().replace(/\d/g, '');
let beltText = beltTexts[productType];

let productName = productNames[productType].replace(/<<main_theme>>/g, mainThemes[productNumber] + '浴衣').replace(/<<sub_theme>>/g, subThemes[mainThemes[productNumber]]?.join(' '));
textareaValueChanger.call(productNameInput, productName);

textareaValueChanger.call(catchCopyInput, "<b>" + productName.split('【')[0].slice(0, 87).replace(/\s\S+$/, '') + "</b>");
textareaValueChanger.call(mobileCatchCopyInput, productName.split('【')[0].slice(0, 30).replace(/\s\S+$/, ''));

inputValueChanger.call(priceInput, prices[productType]);
priceInput.style.backgroundColor = '#ff0';

descriptionInputValue = descriptionInput.value
.replace(/\[浴衣\][^\[]+/, descriptionSizes[productType].yukata)
.replace(/\[(.*帯|はちす)\][^\[]+/, descriptionSizes[productType].obi)
.replace(/\n\s+/g, '\n')

if (pageTitles) descriptionInputValue = descriptionInputValue.replace(/^[^^]+(\[浴衣\])/g, paragraphTitle + '<br>\n' + paragraph + '<br><br>\n$1')

if (!/記が多少異/.test(descriptionInput.value)) descriptionInputValue = descriptionInputValue.replace(/(部／EV[^^]+ィース)/, '$1<br><br>\n\n' + descriptionSizes[productType].diff).replace(/undefined/g, '')
textareaValueChanger.call(descriptionInput, descriptionInputValue);

if (/p/.test(paragraph)) alert("記が多少異ないか確認してください")

let pcPageInputValue = pcPageInput.value
.replace(/(<span>)[１２３４](<\/span>)/g, '$1$2')
.replace(/(kiji-)(itg|fg|cj)(\.jpg)/, `$1${productType}$3`)
.replace(/((topleft|topright|bottomright|bottomleft)"><b>)([^<]*)(<\/b>.+)/i, `$1${yukataTexts[productType].title}$4`)
.replace(/((topleft|topright|bottomright|bottomleft)"><b>[^<]*<\/b>)([^<]*)(<\/p>)/i, `$1${yukataTexts[productType].text}$4`)
.replace(/(hachisu|heko|tsukuri)(\.jpg)/, detailImages[productType].obi + '$2')
.replace(/(hachisu|heko|tsukuri)(.+)(<dt>).*(<\/dt>)/, `$1$2$3${beltTexts[productType].title}$4`)
.replace(/(hachisu|heko|tsukuri)(.+)(<dd>).*(<\/dd>)/, `$1$2$3${beltTexts[productType].text}$4`)
.replace(/(geta.+)(<dt>).*(<\/dt>)/, `$1$2定番の「桐下駄」$3`)
.replace(/(geta.+)(<dd>).*(<\/dd>)/, `$1$2桐の台はやや光沢のある仕上げ、鼻緒の付け根は柔らかい素材で、肌触りも良く履き心地快適です。$3`)
.replace(/(nd-ima.+\/cabinet\/202)\/[0-9-]{8}\/[0-9-]{8}/g, '$1plus2/' + productNumber)
.replace(/(child\((\d{1,2}).+\n.+c)\d+(\.jpg)/g, (_, ...f) => f[0] + (1000 + Number(f[1]) - 2) + f[2])
.replace(/(cabinet\/)202\/202-0321\/202-0321(-1.jpg)/, '$1202plus2/' + productNumber + '$2')

if (pageTitles) pcPageInputValue = pcPageInputValue.replace(/(oomoji">).*?(<\/p>)/, `$1${oomoji}$2`)
.replace(/(chumoji">).*?(<\/p>)/, `$1${chumoji}$2`)
.replace(/(komoji">).*?(<\/p>)/, `$1${komoji}$2`)
.replace(/(geMai[^^]+oomoji">).*?(<\/p>)/, `$1${paragraphTitle}$2`)
.replace(/(geMai[^^]+komoji">)[^p]+(<\/p>)/, `$1${paragraph}$2`)

if (!/set\.jpg/.test(pcPageInputValue)) pcPageInputValue = pcPageInputValue.replace(/(\d{3}-\d{4})(-theme.jpg.+<\/div>)/,
'$1$2\n<div style="margin-bottom: 50px;"><img width="100%" src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/$1-set.jpg"></div>')

textareaValueChanger.call(pcPageInput, pcPageInputValue);

mobilePageInputValue = mobilePageInput.value
.replace(/(cabinet\/)202\/202-0321\/202-0321(-1.jpg)/, '$1202plus2/' + productNumber + '$2')

if (pageTitles) mobilePageInputValue = mobilePageInputValue
.replace(/(<font size="3".+<b>)[^<]*(<\/b><\/font>)/, '$1' + oomoji + '$2')
.replace(/(noshade>)[^<]*(<\/td>)/, "$1" + paragraphTitle + "$2")
.replace(/(<font size="2" color="#333">)[^font]+(<\/font>)/, "$1" + paragraph + "$2")


textareaValueChanger.call(mobilePageInput, mobilePageInputValue);

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

if (/copy/.test(window.location.href)) {
  let searchValues = [window.location.href.split('/').pop()]
  let replaceValues = [productNumber];
  searchValues.forEach((searchValue, i) => {
    document.querySelectorAll("[type=text]").forEach((input) => {
      inputValueChanger.call(
        input,
        input.value.replaceAll(searchValue, replaceValues[i])
      );
      input.addEventListener("focus", () =>
        inputValueChanger.call(
          input,
          input.value.replaceAll(searchValue, replaceValues[i])
        )
      );
    });
    document.querySelectorAll("textarea").forEach((textarea) => {
      textareaValueChanger.call(
        textarea,
        textarea.value.replaceAll(searchValue, replaceValues[i])
      );
      textarea.addEventListener("focus", () =>
        textareaValueChanger.call(
          textarea,
          textarea.value.replaceAll(searchValue, replaceValues[i])
        )
      );
    });
  });

  document.querySelectorAll("input, textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });
}