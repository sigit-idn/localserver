
//?PARK Fix shopify sku

document
  .querySelectorAll(".spreadsheet__cell--field_name-sku input")
  .forEach((input, i) => {
    newValue = input.value.split("-");
    newValue[1] = document.querySelector("#product_handle").value.split("-")[1];
    input.value = newValue.join("-");
  });

//?PARK Change shopify vendor to SECRET

document
  .querySelectorAll(`[name="product[vendor]"]`)
  .forEach((vendor) => (vendor.value = "SECRET"));

//?PARK Switch shopify title place

document.querySelectorAll(`#product_title`).forEach((title) => {
  newTitle = title.value.split("<br>");
  if (!newTitle[0].includes("NUNUFORME")) {
    [newTitle[0], newTitle[1]] = [newTitle[1], newTitle[0]];
    title.value = newTitle.join("<br>");
    title.dispatchEvent(new Event("change"));
  }
});



//?PARK copy SIZE from MAKESHOP

let sizeArray = [
  ...document.querySelectorAll(".option_detail td:nth-child(2)"),
].map((td) => !sizeArray.includes(td.innerText) && td.innerText);
sizeArray = [...new Set(sizeArray)];
copy(sizeArray.join(","));

//?PARK copy COLOR from MAKESHOP

let colorArray = [
  ...document.querySelectorAll(".option_detail td:nth-child(3)"),
].map((td) => !colorArray.includes(td.innerText) && td.innerText);
colorArray = [...new Set(colorArray)];
copy(colorArray.join(","));

//?PARK Copy DATA table from MAKESHOP

let data = {};
data.sku = [
  ...document.querySelectorAll(".option_detail td:nth-child(6) input"),
].map((input) => input.value);
data.price = [
  ...document.querySelectorAll(".option_detail td:nth-child(4) input"),
].map((input) => input.value);
copy(data);

//?PARK Insert DATA into SHOPIFY
document
  .querySelectorAll(".spreadsheet__cell--field_name-sku input")
  .forEach(
    (input, i) =>
      (input.value =
        document.querySelector("#product_handle").value + data.sku[i])
  ) &
  document
    .querySelectorAll(".spreadsheet__cell--field_name-price input")
    .forEach((input, i) => (input.value = data.price[i]));


// Erase seal

let selections = document.querySelectorAll("[name=optionSelectionItem]");
let options = document.querySelectorAll("[name=optionCharge0]");

selections[1].value = "+ギフトボックス";
for (let i = 2; i < selections.length; i++) {
  setTimeout(() => selections[i]?.click(), 50);
  setTimeout(() => selections[i]?.focus(), 80);
  setTimeout(
    () => selections[i]?.setAttribute("value", selections[i + 1]?.value),
    100
  );
  setTimeout(() => selections[i]?.click(), 130);
  setTimeout(() => selections[i]?.focus(), 150);
  options[i]?.setAttribute("value", options[i + 1]?.value);
}



// *Aupay Add wash banner

document.querySelector("#productExplnSp_ctl").value += `
<img src="https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_sentaku.jpg" width="100%"><br><br>
<img src="https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_hoshikata.jpg" width="100%"><br><br>
`;
document.querySelector("#productExplnPc_ctl").value += `
<img src="https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_sentaku.jpg" width="100%"><br><br>
<img src="https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_hoshikata.jpg" width="100%"><br><br>
`;

[...document.querySelectorAll("input")]
  .filter((input) => input.id.includes("productImgUrl"))
  .filter((imageURL) => !imageURL.value)
  .forEach((washImage, i, washImageURL) => {
    washImageURL[0].value =
      "https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_sentaku.jpg";
    washImageURL[1].value =
      "https://image.wowma.jp/54002551/tayu-tafu/cabinet/more/airkaol_hoshikata.jpg";
  });


  //* TayuTafu Futureshop Add wash banner airkaoru

document.querySelector("#descriptionLong").value = document
.querySelector("#descriptionLong")
.value.replace(
  `<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backReview()">閉じる<p>`,
  `
<img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/704/airkaol_sentaku.jpg" width="100%"><br><br>
<img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/704/airkaol_hoshikata.jpg" width="100%"><br>

<!-- ▲▲内容▲▲ -->
<div class="item-back" onclick="backReview()">閉じる<p>
`
);