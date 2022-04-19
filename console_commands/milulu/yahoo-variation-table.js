//! Yahoo variation TABLE

let tabIndex = 1;
document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input) => {
    input.tabIndex = tabIndex++;
    const yahooSizeCode =
      input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText

    let SizeCode =
      yahooSizeCode === "フリー"
        ? "fl"
        : yahooSizeCode.replace(/(\d{1,2}).+/, (_, p1) => p1.padStart(2, "0"));

    inputValueChanger.call(
      input,
      data.productNumber +
      SizeCode +
      data.colorCode[
      input.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement
        .nextElementSibling.innerText
      ]
    );

    input.addEventListener("focus", () =>
      inputValueChanger.call(
        input,
        data.productNumber +
        SizeCode +
        data.colorCode[
        input.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement
          .nextElementSibling.innerText
        ]
      )
    );
  });

document
  .querySelectorAll(".stockList .stockList__tableWrap tr:nth-child(1) textarea")
  .forEach((textArea, i) => {
    textArea.tabIndex = tabIndex++;
    textArea.value = `https://shopping.c.yimg.jp/lib/milulu-shop/${data.productNumber
      }-parts${i + 1}.jpg`;
    textArea.addEventListener(
      "focus",
      () =>
      (textArea.value = `https://shopping.c.yimg.jp/lib/milulu-shop/${data.productNumber
        }-parts${i + 1}.jpg`)
    );
  });

// document
//   .querySelectorAll(
//     ".stockList .stockList__tableWrap tr:nth-child(1) .stockList__tableCellInner--photo input[type=radio], input[type=text], textarea"
//   )
//   .forEach((radio, i) => (radio.checked = true));

document.querySelectorAll("input, textarea").forEach((input) => {
  input.dispatchEvent(new Event("focus", { bubbles: true }));
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});