//! Tayutafu Set Rakuten VARIATION no size

let data = {
  "colors": prompt("colors").split(/\n/).map((line) => line.trim()),
}

let addButton = document.querySelector("#root > div.rms-layout > main > div.rms-content > div > div > div:nth-child(7) > div > div.rms-grid.pa-lr-0 > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(3) > div:nth-child(1) > button")

for (let i = 0; i < data.colors.length; i++) {
  addButton.click()
}

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

if (sizeInputs[0] && sizeCodeInputs[0]) {
  sizeInputs[0].tabIndex = tabIndex++
  sizeCodeInputs[0].tabIndex = tabIndex++
  inputValueChanger.call(sizeInputs[0], "-");
  inputValueChanger.call(sizeCodeInputs[0], "X1000");
}

data.colors.forEach((color, i) => {
  if (!colorInputs[i] || !colorCodeInputs[i]) return;
  colorInputs[i].tabIndex = tabIndex++
  colorCodeInputs[i].tabIndex = tabIndex++
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], "Y" + (i + 1000));
});


document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});