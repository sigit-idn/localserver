//! Yahoo Submit Product
let response = await fetch("http://localhost:8888/milulu");
let data = await response.json();

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

let descriptionText =
  descriptionInput.value.split("【")[0] +
  "【カラー】" +
  data.colors.join("／") +
  "\n【サイズ】" +
  data.sizes.join(" ");

descriptionText =
  descriptionText.split("\n\n")[0] +
  "\n\n" +
  data.headline +
  "\n" +
  data.subtitle +
  "\n\n" +
  descriptionText.split("\n\n")[2];

document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

for (input in inputs) {
  inputValueChanger.call(inputs[input], data[input.replace("Input", "")]);
  inputs[input].onfocus = () =>
    (inputs[input].value = data[input.replace("Input", "")]);
}
inputs.productNumberInput.onfocus = () =>
  (inputs.productNumberInput.value = data.productNumber);
inputs.priceInput.onfocus = () => (inputs.priceInput.value = data.price);

let waiting = false;

let cond = {
  val: "",
  get value() {
    return this.val;
  },

  set value(val) {
    this.val = val;
  },
};

function waitUntil(condition, callback, fallback) {
  waiting = true;
  if (condition) {
    waiting = false;
    return callback();
  }

  console.log({ condition });

  if (fallback) fallback();

  setTimeout(() => waitUntil(condition), 200);
}

waitUntil(cond.value == true, () => alert(ok));

document
  .querySelector(
    "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
  )
  .click();
if (
  checkCondition(
    document.querySelector("#YstrMdSubWindow3").clientWidth > 200,
    () => {
      document.querySelector("#LibTree > ul > li > span > span")?.click();
      document
        .querySelector(
          "#LibTree > ul > li > ul > li.dynatree-lastsib > span > a"
        )
        ?.click();
    }
  )
) {
  checkCondition(document.querySelector("input#Upload1"), () =>
    console.log(document.querySelector("input#Upload1"))
  );
}

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
          .find((row) => row.innerHTML.includes(`sp${number}.jpg`))
          ?.querySelector("input[id^=Upload]")
          ?.click();
      }, i * 800);
    }
  });

setTimeout(() => {
  document
    .querySelector(
      "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
    )
    .click();
  document.querySelector("input#Upload1")?.click();
}, 800 * 20);

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
