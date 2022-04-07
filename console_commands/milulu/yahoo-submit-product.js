//! Yahoo SUBMIT Product
let data = await(await fetch("http://localhost:8888/milulu")).json();

let inputs = {
  productNumberInput: document.querySelector("[name=__submit__product_code]"),
  yahooProductNameInput: document.querySelector("[name=__submit__name]"),
  priceInput: document.querySelector("[name=__submit__price]"),
  yahooBrandPriceInput: document.querySelector(
    "[name=__submit__original_price]"
  ),
};

let manageNumberInput = document.querySelector("[name=__submit__code]");
let memberPriceInput = document.querySelector("[name=__submit__member_price]");

let yahooCatchCopyInput = document.querySelector("[name=__submit__headline]");
let descriptionInput = document.querySelector("[name=__submit__explanation]");

[
  inputs.priceInput,
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

let descriptionText =
  descriptionInput.value.split(/\n{2,}/)[0] +
  "\n\n" +
  data.headline +
  "\n" +
  data.subtitle +
  "\n\n" +
  "【カラー】" +
  data.colors.join("／") +
  "\n【サイズ】" +
  data.sizes.join(" ");

document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

let sleep = (ms) => {
  const start = new Date().getTime()
  while (true) if (new Date().getTime() - start >= ms) break
}

for (input in inputs) {
  inputValueChanger.call(inputs[input], data[input.replace("Input", "")]);
  inputs[input].onfocus = () =>
    (inputs[input].value = data[input.replace("Input", "")]);
}
inputs.productNumberInput.onfocus = () =>
  (inputs.productNumberInput.value = data.productNumber);
inputs.priceInput.onfocus = () => (inputs.priceInput.value = data.price);

document
  .querySelector(
    "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
  )
  .click();
document.querySelector("#LibTree > ul > li > span > span")?.click();
document
  .querySelector("#LibTree > ul > li > ul > li.dynatree-lastsib > span > a")
  ?.click();
document.querySelector("input#Upload1")?.click();

document
  .querySelectorAll(
    "div:nth-child(11) > div:nth-child(6) div.imageListB span.imageListB__photoText"
  )
  .forEach((a, i) => {
    if (i < 19) {
      const number =
        a.parentElement.parentElement.parentElement.parentElement.textContent.match(
          /\d{1,2}/
        );
      setTimeout(() => {
        a.click();
        document
          .querySelector(
            "#LibTree > ul > li > ul > li.dynatree-lastsib > span > a"
          )
          .click();
        [...document.querySelectorAll("[id^=RowList]")]
          .find(({ innerHTML }) => new RegExp(`sp${number}.jpg`).test(innerHTML))
          ?.querySelector("input[id^=Upload]")
          ?.click();
      }, i * 900);
    }
  });

setTimeout(() => {
  document
    .querySelector(
      "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
    )
    .click();
  document.querySelector("input#Upload1")?.click();

  const a = document
    .querySelector(
      "div:nth-child(11) > div:nth-child(6) div.imageListB span.imageListB__photoText"
    )
  const number =
    a.parentElement.parentElement.parentElement.parentElement.textContent.match(
      /\d{1,2}/
    );
  setTimeout(() => {
    a.click();
    document
      .querySelector(
        "#LibTree > ul > li > ul > li.dynatree-lastsib > span > a"
      )
      .click();
    [...document.querySelectorAll("[id^=RowList]")]
      .find(({ innerHTML }) => new RegExp(`sp${number}.jpg`).test(innerHTML))
      ?.querySelector("input[id^=Upload]")
      ?.click();
      console.log(`sp${number}.jpg`);
  }, 900);
}, 900 * 20);

textareaValueChanger.call(
  descriptionInput,
  descriptionText.replaceAll(undefined, "")
);
textareaValueChanger.call(yahooCatchCopyInput, data.yahooCatchCopy);

inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(memberPriceInput, data.price - 1);

let searchValue = document.querySelector("#now_page_key").value;
let replaceValue = data.productNumber.toLowerCase();
document
  .querySelectorAll("[type=text]")
  .forEach((input) =>
    inputValueChanger.call(
      input,
      input.value.replaceAll(searchValue, replaceValue)
    )
  );
document
  .querySelectorAll("textarea")
  .forEach((textarea) =>
    textareaValueChanger.call(
      textarea,
      textarea.value.replaceAll(searchValue, replaceValue)
    )
  );

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

localStorage.setItem(
  "category",
  document.querySelector(".categoryPath__breadCrumb").innerText
);