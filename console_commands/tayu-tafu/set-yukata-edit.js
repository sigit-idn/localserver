// Yukata Set Edit Rakuten

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


NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.find = Array.prototype.find
NodeList.prototype.filter = Array.prototype.filter

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;

let getTextFieldByTitle = (title) =>
document.querySelectorAll('.rms-form-row').find(row => new RegExp(title).test(row.innerText)).querySelector('textarea, input[type=text]')

let pcPageInput = getTextFieldByTitle('PC用販売説明文')
pcPageInput.scrollIntoView({behavior: 'smooth'})
pcPageInput.style.transition = 'height 0.5s ease-in-out'
pcPageInput.rows = 38
pcPageInput.height = "90vh"


let imageUrlInputs = document.querySelectorAll("input[name^=url_]");
let altInputs = document.querySelectorAll("input[name^=alt_]");

let productNumberInput = document.querySelector("[name=itemNumber]");
let productNumber = /edit/.test(window.location.href) ? productNumberInput.value : prompt("商品番号を入力してください");

let productType = Object.keys(data).find(key => data[key] === productNumber).toLocaleLowerCase().replace(/\d/g, '');
let beltText = beltTexts[productType];


let pcPageInputValue = pcPageInput.value
.replace(/(<div>.+tsukuri-notes)/, '</div>$1')
// .replace(/(gin)-bot.+(;"[^h]+theme.jpg)/, `$1: 50px 0$2`)

if (/fg/.test(productType) && !/tsukuri-notes/.test(pcPageInput.value)) {
    pcPageInputValue = pcPageInputValue.replace(/(geta.jpg[^v]+<\/div>)/, '$1\n<div><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus/202-tsukuri-notes.jpg"></div>')

if (!/set\.jpg/.test(pcPageInputValue)) pcPageInputValue = pcPageInputValue.replace(/(\d{3}-\d{4})(-theme.jpg.+<\/div>)/,
'$1$2\n<div style="margin-bottom: 50px;"><img width="100%" src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/$1-set.jpg"></div>')

textareaValueChanger.call(pcPageInput, pcPageInputValue);

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});


  document.querySelectorAll("input, textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });
}