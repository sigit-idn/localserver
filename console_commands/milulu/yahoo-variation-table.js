//! Yahoo variation TABLE

document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    const yahooSizeCode =
      input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText

      console.log({yahooSizeCode});
    let SizeCode =
      yahooSizeCode === "フリー"
        ? "fl"
        : yahooSizeCode.match(/\d{2}(?=\D|$)/)?.[0].length === 1
          ? "0" + yahooSizeCode
          : yahooSizeCode;
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
    textArea.tabIndex = i + 1;
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