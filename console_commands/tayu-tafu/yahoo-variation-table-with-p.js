//* Yahoo variation TABLE

let ajax = {
  get: (url) => new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  }),
}

let data = JSON.parse(await ajax.get("http://localhost:8888/tayutafu"))

let inputValueChanger    = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;


let xValue = 0;
let yValue = 0;

let tabIndex = tabIndex ?? 1;
// let abc = ["a", "b", "c"]
let abcIndex = 0; 
// let abcCount = prompt("abcCount").match(/\d+/g).map((n) => parseInt(n))
let tIndex = 1;

document.querySelectorAll("stockList__selectLabel").forEach((label) => label.click())

document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input, i) => {
    input.tabIndex = tabIndex++;
    yValue         = Math.floor(i / data.size.length);
    inputValueChanger.call(
      input,
      data.itemNumber + "X" + (1000 + xValue) + "Y" + (1000 + yValue)
    );
    let newValue      = input.value;
        input.onfocus = () => {
      inputValueChanger.call(input, newValue);
    };
    xValue = xValue >= data.size.length - 1 ? 0 : xValue + 1;
  });

  document.querySelectorAll('[name^="subcode_photo_main"]').forEach((radio, i) => {
    radio.tabIndex = tabIndex++;
    radio.onfocus = () => radio.checked = true
  })

document
  .querySelectorAll(".stockList .stockList__tableWrap tr:nth-child(1) textarea")
  .forEach((textArea, i) => {
    textArea.tabIndex = tabIndex++;
    textareaValueChanger.call(
      textArea,
      `https://shopping.c.yimg.jp/lib/tayu-tafu/${data.itemNumber}-sp-t${tIndex++}.jpg`
    );
    // textareaValueChanger.call(textArea, `https://shopping.c.yimg.jp/lib/tayu-tafu/${data.itemNumber}-c100${i}.jpg`)
    const newValue         = textArea.value;
          textArea.onfocus = () => textareaValueChanger.call(textArea, newValue);
    // if (tIndex > abcCount[abcIndex]) {
    //   tIndex = 1;
    //   abcIndex++
    // }
  });

document.querySelectorAll('input, textarea').forEach(input => {
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
})
