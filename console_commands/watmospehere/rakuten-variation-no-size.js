//! Rakuten VARIATION no size
let data
( async () => {
data = await (await fetch("http://localhost:8888/watmos")).json();

data.colors = data.colors.map((color) => Array.isArray(color) ? color[0] : color);

let sizeInputs = document.querySelectorAll(
  "#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-14 input"
);
let sizeCodeInputs = document.querySelectorAll(
  "#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) .rms-col-8 input"
);

let colorInputs = document.querySelectorAll(
  "#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-14 input"
);
let colorCodeInputs = document.querySelectorAll(
  "#root > div > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div .rms-col-8 input"
);

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

let tabIndex = 1

sizeInputs[0].tabIndex = tabIndex
tabIndex++
sizeCodeInputs[0].tabIndex = tabIndex
tabIndex++
inputValueChanger.call(sizeInputs[0], "-");
inputValueChanger.call(sizeCodeInputs[0], "X01");

data.colors.forEach((color, i) => {
  colorInputs[i].tabIndex = tabIndex
  tabIndex++
  colorCodeInputs[i].tabIndex = tabIndex
  tabIndex++
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], "Y0" + (i + 1));
});


document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});
})();