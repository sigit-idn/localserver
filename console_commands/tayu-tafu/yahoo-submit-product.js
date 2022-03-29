//* Yahoo SUBMIT Product
// let data = await(await fetch("http://localhost:8888/tayutafu")).json();
let ajax = {
  get: (url) => new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  }),

  getJSON: function (url) {
    return new Promise(async (resolve, reject) => {
      const data = await this.get(url);
      resolve(JSON.parse(data));
    })
  }
};

let data = await ajax.getJSON("http://localhost:8888/tayutafu");

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;

let itemNumberInput = document.querySelector("[name=__submit__product_code]");
let itemNameInput = document.querySelector("[name=__submit__name]");
let priceInput = document.querySelector("[name=__submit__price]")

let manageNumberInput = document.querySelector("[name=__submit__code]");

let yahooCatchCopyInput = document.querySelector("[name=__submit__headline]");
let descriptionInput = document.querySelector("[name=__submit__explanation]");
let spPageInput = document.querySelector("[name=\"__submit__sp_additional\"]");

[
  priceInput,
  manageNumberInput,
  [
    ...document.querySelectorAll(`
  #react-tabs-1 > div > div:nth-child(13) > div:nth-child(2),
  #react-tabs-1 > div > div:nth-child(13) > div:nth-child(4),
  #react-tabs-1 > div > div:nth-child(14) > div.uiGridB > div.uiGridB__gridB2 > div > div:nth-child(2) > div.uiGridB__gridB5 > div.formParts,
  #react-tabs-2
  `),
  ],
]
  .flat()
  .forEach((input) => (input.style.backgroundColor = "#ff0"));

document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

inputValueChanger.call(itemNameInput, data.itemName.replace(/(【|】)\s*/g, "").substring(0, 75))
inputValueChanger.call(itemNumberInput, data.itemNumber);

textareaValueChanger.call(descriptionInput, data.description.replaceAll(undefined, ""));
textareaValueChanger.call(yahooCatchCopyInput, data.catchCopy.replace(/(【|】)\s*/g, "").substring(0, 30));

inputValueChanger.call(manageNumberInput, data.itemNumber);

inputValueChanger.call(priceInput, data.price);

let searchValue = document.querySelector("#now_page_key").value;
let replaceValue = data.itemNumber.toLowerCase();

let { data: setData } = await ajax.getJSON("http://localhost:8888/yukata-set");
let productType = Object.keys(setData).find(key => setData[key] === data.itemNumber).toLocaleLowerCase().replace(/\d/g, '');

document.querySelectorAll('[type=text]').forEach(input => {
  inputValueChanger.call(input, input.value.replaceAll(searchValue, replaceValue).replace(/(v-)(cj|itg|fg)/, "$1" + productType))
  input.onfocus = () => inputValueChanger.call(input, input.value.replaceAll(searchValue, replaceValue).replace(/(v-)(cj|itg|fg)/, "$1" + productType))
})
document.querySelectorAll('textarea').forEach(textarea => {
  textareaValueChanger.call(textarea, textarea.value.replaceAll(searchValue, replaceValue).replace(/(v-)(cj|itg|fg)/, "$1" + productType))
  textarea.onfocus = () => textareaValueChanger.call(textarea, textarea.value.replaceAll(searchValue, replaceValue).replace(/(v-)(cj|itg|fg)/, "$1" + productType))
})

priceInput.onfocus = () => priceInput.value = data.price;

descriptionInput.oninput = ({ target }) => {
  descriptionInput.style.backgroundColor = target.value.length > 500 ? "#ff0" : ""
  descriptionInput.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.formParts__validation').innerText = target.value.length;
}

spPageInputValue = spPageInput.value
  .replace(/(tr.+<b>)[^<]+/g, "$1" + data.description.match(/.+/)[0])
  .replace(/(<td>)[^<\n]([^<]|<br>)+/, "$1" + data.description.match(/\n[^\[]+/)[0])


document
  .querySelectorAll("[type=text], textarea")
  .forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
