// Amazon select MODULES
let data = await (await fetch(`http://localhost:8888/milulu`)).json();

document
  .querySelector("#app-main > div > div > div > div > div > div > div > div")
  .click();

document.querySelector('[data-component-id="launchpad-company-logo"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(2) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(3) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-4"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(4) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-4"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(5) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-9"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(6) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-6"]').click();

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

inputValueChanger.call(
  document.querySelector("#awsui-input-0"),
  data.productNumber
);

inputValueChanger.call(
  document.querySelector(
    "#app-main > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(1) > div > span > div > input[type=text]"
  ),
  "▼ ディティール"
);

inputValueChanger.call(
  document.querySelector(
    "#app-main > div > div > div > div > div:nth-child(5) > div:nth-child(2) > div > div:nth-child(1) > div > span > div > input[type=text]"
  ),
  "▼ テキスタイル"
);

document
  .querySelectorAll("input[type=text], textare")
  .forEach((input) =>
    input.dispatchEvent(new Event("input", { bubbles: true }))
  );