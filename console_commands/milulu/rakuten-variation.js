// Rakuten VARIATIONS

let {colorCode, sizes, colors} = await(await fetch("http://localhost:8888/milulu")).json();

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

let tabIndex = 1;
sizes.filter((size,i) => sizes.indexOf(size) === i).forEach((size, i) => {
  sizeInputs[i].tabIndex = tabIndex++;
  sizeCodeInputs[i].tabIndex = tabIndex++;
  let sizeCode = size === "フリー" 
    ? "fl" 
    : size.replace(/(\d{1,2})\D+/, (_, p1) => p1.padStart(2, "0"));

  inputValueChanger.call(sizeInputs[i], size);
  sizeInputs[i].onfocus = () => inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], sizeCode);
  sizeCodeInputs[i].onfocus = () =>
    inputValueChanger.call(sizeCodeInputs[i], sizeCode);
});

colors.forEach((color, i) => {
  colorInputs[i].tabIndex = tabIndex++;
  colorCodeInputs[i].tabIndex = tabIndex++;
  inputValueChanger.call(colorInputs[i], color);
  colorInputs[i].onfocus = () => inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(
    colorCodeInputs[i],
    colorCode[color] ?? "0" + (i + 1)
  );
  colorCodeInputs[i].onfocus = () =>
    inputValueChanger.call(
      colorCodeInputs[i],
      colorCode[color] ?? "0" + (i + 1)
    );
});

document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});
