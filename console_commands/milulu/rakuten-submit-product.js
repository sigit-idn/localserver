//! Rakuten SUBMIT Product

let data = await (await fetch(`http://localhost:8888/milulu`)).json();

NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.map = Array.prototype.map;
NodeList.prototype.find = Array.prototype.find;

document
  .querySelector("#root > .rms-layout .rms-content .rms-columns  button")
  .click();

  NodeList.prototype.forEach = Array.prototype.forEach
  NodeList.prototype.find = Array.prototype.find
  NodeList.prototype.filter = Array.prototype.filter
    
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

let mobilePageValue = mobilePageInput.value.split("<!-- specs -->");
mobilePageValue[1] = `
${data.headline}<br>
${data.subtitle}
<br>
<font size="1"><b>カラー展開</b></font><br>
${data.colors.join("／")}<br>
<font size="1"><b>サイズ</b></font><br>
${data.sizes.join("／")}<br>
`;

mobilePageValue = mobilePageValue
  .join("<!-- specs -->")
  ?.replaceAll(window.location.href.split("/")[8], data.productNumber)
  .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category);
mobilePageValue = mobilePageValue.replace(
  /着用サイズ.+/,
  "着用サイズ" + data.modelSize
);

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let selectValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype,
  "value"
).set;

if (manageNumberInput)
  inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(productNumberInput, data.productNumber);
textareaValueChanger.call(productNameInput, data.rakutenProductName);
textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy);
textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy);
inputValueChanger.call(priceInput, data.price);
priceInput.addEventListener("focus", () =>
  inputValueChanger.call(priceInput, data.price)
);
textareaValueChanger.call(mobilePageInput, mobilePageValue);
textareaValueChanger.call(
  pcPageInput,
  pcPageInput.value
    .replaceAll(window.location.href.split("/")[8], data.productNumber)
    .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category)
    .replace(/[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々。〆〤]([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤。<br>\n])+/, data.description)
);

if (data.description) textareaValueChanger.call(
  mobilePageInput,
  mobilePageInput.value
    .replaceAll(window.location.href.split("/")[8], data.productNumber)
    .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category)
    .replace(/[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々。〆〤]([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤。<br>\n])+/, data.description)
);

categoryInputs.forEach((input, i) => {
  inputValueChanger.call(input, data.rakutenCategory?.[i] ?? "");
  input.onfocus = () => (input.value = data.rakutenCategory?.[i]);
});

selectValueChanger.call(asurakuInput, 1);
asurakuInput.value = 1;
imageUrlInputs.forEach((input) => {
  input.addEventListener("focus", () =>
    inputValueChanger.call(
      input,
      input.value
        .replaceAll(window.location.href.match(/\w{10}$/)?.[0], data.productNumber)
        .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category)
    )
  );
});
altInputs.forEach((input) => {
  input.addEventListener("focus", () =>
    inputValueChanger.call(input, data.title)
  );
});

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  // input.dispatchEvent(new Event("focus", { bubbles: true }))
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

document
  .querySelectorAll(
    `#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(2),
  #root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(11) > div.rms-form.form-border.form-full > div:nth-child(1),
  #root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(12),
  #salesPrice
  `
  )
  .forEach((element) => {
    if (!element) return
    element.style.backgroundColor = "#ff0"});
