// Yahoo Replace Image URL

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let searchValues = prompt("Image number").split(";");
let [searchValue] = searchValues
let productNumber = document.querySelector("#now_page_key").value;

String.prototype.replaceSrc = function () {
  return this.replace(
    new RegExp("http.+i\/n.+_" + searchValue, "g"),
    `https://shopping.c.yimg.jp/lib/milulu-shop/${productNumber}-sp${searchValue}.jpg`
  )
}

searchValues.forEach((_) => {
  document.querySelectorAll("[type=text]").forEach((input) => {
    inputValueChanger.call(
      input,
      input.value.replaceSrc()
    );
    inputValueChanger.onfocus = inputValueChanger.call(
      input,
      input.value.replaceSrc()
    );
  });
  document.querySelectorAll("textarea").forEach((textarea) => {
    textareaValueChanger.call(
      textarea,
      textarea.value.replaceSrc()
    );
    textareaValueChanger.onfocus = textareaValueChanger.call(
      textarea,
      textarea.value.replaceSrc()
    );
  });
});

document.querySelectorAll("input, textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});