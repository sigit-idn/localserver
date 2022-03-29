//!Search and REPLACE

document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(8) > div:nth-child(3) > div.rms-columns > div > div > button")
?.click()

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let searchValues = prompt("Search").split(";");
let replaceValues = prompt("Replace").split(";");
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
