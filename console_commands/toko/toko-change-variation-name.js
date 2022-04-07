document.querySelectorAll("tr").forEach((tr, i) => {
  [
    "TKM211002",
    "TKM211005",
    "TKM211007",
    "TTX211001",
    "TTX211002",
    "TTX211003",
    "TTX211004",
    "TTX211006",
  ].forEach((number, j) => {
    if (tr.innerHTML.includes(number.toLowerCase())) {
      console.log(tr);
      tr.style.backgroundColor = "#ff0";
    }
  });
});

document
  .querySelector(
    "#root > div.rms-layout > main > div.rms-content > div.rms-content-fixed--1V6OD > div.rms-content-fixed--1V6OD > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div > button"
  )
  .click();

setTimeout(() => {
  let inputValueChanger = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  let textareaValueChanger = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  ).set;

  let kuro = [...document.querySelectorAll("tr")].find((tr) =>
    /クロ|黒/.test(tr.textContent)
  );
  kuro.scrollIntoView({ behavior: "smooth" });
  let zaiko = [...kuro.querySelectorAll("strong")].map(
    (strong) => strong.textContent
  );
  kuro.querySelector(".rms-dd-btn").click();
  document.querySelector("#dd_row_2").click();

  inputValueChanger.call(document.querySelector("#textHeader"), "ブラック");
  inputValueChanger.call(document.querySelector("#textSubHeader"), "01");
  document.querySelector("#textHeader").onfocus = (event) =>
    (event.target.value = "ブラック");
  document.querySelector("#textSubHeader").onfocus = (event) =>
    (event.target.value = "01");

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    // input.dispatchEvent(new Event("focus", { bubbles: true }))
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  document.querySelector("#textHeader").focus();
  document.querySelector("#textSubHeader").focus();
  setTimeout(() => {
    document
      .querySelector(
        "#root > div.rms-layout > main > div.rms-content > div.rms-modal.modal.fade.rms-modal--34tfX.show.show--1x9ik > div > div > div.modal-footer > div > button.rms-btn.btn-red.btn-lg.btn-width-lg"
      )
      .click();

    setTimeout(() => {
      kuro
        .querySelectorAll('input[name^="inventory"]')
        .forEach((inventory, i) => {
          inputValueChanger.call(inventory, zaiko[i]);
          inventory.onfocus = (event) => (inventory.value = zaiko[i]);

          document
            .querySelectorAll("[type=text], textarea")
            .forEach((input) => {
              // input.dispatchEvent(new Event("focus", { bubbles: true }))
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
            });
          setTimeout(() => inventory.focus(), 300);
        });
      setTimeout(() => {
        console.log(zaiko);
        kuro.querySelector(".rms-dd-btn").click();
        document.querySelector("#dd_row_3").click();

        document
          .querySelector(
            "#root > div.rms-layout > main > div.rms-content > div.rms-modal.modal.fade.rms-modal--34tfX.show.show--1x9ik > div > div > div.modal-footer > div > button.rms-btn.btn-red.btn-lg.btn-width-lg"
          )
          .click();
      }, 500);
    }, 500);
  }, 500);
}, 800);
