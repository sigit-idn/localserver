//! Edit Rakuten

let response = await fetch(`http://localhost:8888/milulu`);
let data = await response.json();

let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
let selectValueChanger = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;

textareaValueChanger.call(productNameInput, data.rakutenProductName)
textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy)
textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy)
inputValueChanger.call(priceInput, data.price)

  document.querySelectorAll('[type=text], textarea').forEach((input) =>{
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
  input.dispatchEvent(new Event("focus", { bubbles: true }))
});


//! Rakuten variations

let response = await fetch("http://localhost:8888/milulu");
let data = await response.json();

let sizeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-14 input");
let sizeCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-8 input");

let colorInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-14 input");
let colorCodeInputs = document.querySelectorAll("#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-8 input");

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

data.sizes.forEach((size, i) => {
  inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], size.length < 3 ? '0' + size.replace('号', '') : size.replace('号', ''));
});

data.colors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], data.colorCode[color]);
});

document.querySelectorAll('input').forEach(input => {
  input.dispatchEvent(new Event('input', {bubbles: true}))
  input.dispatchEvent(new Event('change', {bubbles: true}))
  input.dispatchEvent(new Event('focus', {bubbles: true}))
})

//! EDIT SHOPLIST

let response = await fetch("http://localhost:8888/milulu");
let {shoplistCatchCopy,shoplistPrice,shoplistProductName,rakutenCatchCopy} = await response.json();

document.querySelector("[name=catch_copy_mobile]").value = shoplistCatchCopy.length > 130 ? rakutenCatchCopy : shoplistCatchCopy;
document.querySelector("[name=product_name]").value = shoplistProductName;
document.querySelector("[name=product_sales_price]").value = shoplistPrice;
document.querySelectorAll("[name=tax_flg]")[1].checked = true;
document.querySelectorAll("[name='product_sex_type[]']")[1].checked = true;
document.querySelectorAll("[name=stock_type]")[2].checked = true;

//! Shoplist Variations

let response = await fetch("http://localhost:8888/milulu");
let { sizes, colors, productNumber, colorCode } = await response.json();

[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("product_axis_width_name"))
  .forEach((size, i) => (size.value = sizes[i] || ""));

[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("product_width_child_no"))
  .forEach((size, i) => {
    size.value = sizes[i]?.replaceAll("号", "") || "";
    size.value = size.value.length == 1 ? "0" + size.value : size.value;
  });

// let freeSize = [...document.querySelectorAll('input')].filter({name} => name.includes('product_width_child_no'))
// .filter(({value}) => value === "フリー")[0] || ''
// freeSize?.value = 'fl';

[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("product_axis_height_name"))
  .forEach((color, i) => (color.value = colors[i] || ""));

[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("product_height_child_no"))
  .forEach((color, i) => (color.value = colorCode[colors[i]] || ""));

[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("color_image_url"))
  .forEach(
    (color, i) =>
      (color.value =
        i < colors.length
          ? `http://img.shop-list.com/res/up/shoplist/shp/milulu/${productNumber}/${productNumber}-c${i + 1}.jpg`
          : "")
  );

[...document.querySelectorAll("select")]
  .filter(({name}) => name.includes("product_color_id"))
  .forEach(
    (select, i) =>
      (select.value = [...select.querySelectorAll("option")].filter((option) =>
        option.label.includes(colors[i] || colors[i].slice(3, 6))
      )[0]?.value)
  ) || "";

//! Shoplist JANCODE

let janObject = {};
let response = await fetch("http://localhost:8888/milulu")
let { shoplistJanCode } = await response.json();
shoplistJanCode = shoplistJanCode.map((jan) => jan.trim());

shoplistJanCode.forEach((jan) => (janObject[jan.split(" ")[0]] = jan.split(" ")[1]));
[...document.querySelectorAll("input")]
  .filter(({name}) => name.includes("jan_code"))
  .forEach(
    (janInput, i) =>
      (janInput.value = String(
        janObject[janInput.parentElement.previousElementSibling.innerText]
      ).replaceAll(undefined, ""))
  );

//! Shoplist JANCODE reverse

let { shoplistJanCode } = await fetch("http://localhost:8888/milulu")
.then((res) => res.json())
.then((data) => data);
let janObject = {};
shoplistJanCode.forEach((jan) => {
  const janArray = jan.split(' ');
  if (janArray.length > 2) {
    janObject[jan.split(' ')[2]] = jan.split(' ')[1]
  } else {
    janObject[jan.split(' ')[1]] = jan.split(' ')[0]
    
  }
});

[...document.querySelectorAll("input")]
  .filter((input) => input.name.includes("jan_code"))
  .forEach(
    (janInput, i) =>
    (janInput.value = String(
      janObject[janInput.parentElement.parentElement.children[2].innerText]
      ).replaceAll(undefined, ""))
      );
      
//! EDIT Yahoo
  let response = await fetch("http://localhost:8888/milulu");
  let data = await response.json();

  let inputs = {
    yahooProductNameInput : document.querySelector("[name=__submit__name]"), 
    priceInput : document.querySelector("[name=__submit__price]"),
    yahooBrandPriceInput : document.querySelector("[name=__submit__original_price]")
  }
  let memberPriceInput = document.querySelector("[name=__submit__member_price]");
  
  let yahooCatchCopyInput = document.querySelector("[name=__submit__headline]");
  
  document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

  let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
  
  for (input in inputs) {
    inputValueChanger.call(inputs[input], data[input.replace('Input', '')])
  }

  textareaValueChanger.call(yahooCatchCopyInput, data.yahooCatchCopy)

  inputValueChanger.call(memberPriceInput, data.price - 1);

document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("change", {bubbles: true}));
  });

//! Yahoo komoku sentaku

document
  .querySelectorAll(
    ".optionSelection__column:first-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => inputValueChanger.call(input, data.colors[i - 1]));
document
  .querySelectorAll(
    ".optionSelection__column:last-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => inputValueChanger.call(input, data.sizes[i - 1]));

  document
  .querySelectorAll("[type=text], textarea")
  .forEach((input) => {
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("click", {bubbles: true}));
  });

