//! Shoplist SUBMIT Product

let {
  shoplistCatchCopy,
  shoplistDescription,
  shoplistJanCode,
  shoplistPrice,
  productNumber,
  rakutenCatchCopy,
  shoplistCategory,
  shoplistProductName,
} = await (await fetch("http://localhost:8888/milulu")).json();

document.querySelector("[name=catch_copy_mobile]").value =
  shoplistCatchCopy.length > 130
    ? rakutenCatchCopy.replace(/あす楽/g, "")
    : shoplistCatchCopy;
document.querySelector("[name=product_name]").value = shoplistProductName;
document.querySelector("[name=product_code]").value = productNumber;
document.querySelector("[name=shop_product_code]").value = productNumber;
document.querySelector("[name=genre_id]").value = shoplistCategory;
document.querySelector("[name=product_material_details]").value = prompt(
  "Material"
).replace(/\n+/g, "<br>\n").replace(/\s{2,}/g, " ");

document.querySelector("[name=product_sales_price]").value = shoplistPrice;
document.querySelectorAll("[name=tax_flg]")[1].checked = true;
document.querySelectorAll("[name='product_sex_type[]']")[/^d/.test(productNumber) ? 2 : 1].checked = true;
document.querySelectorAll("[name=stock_type]")[2].checked = true;
document.querySelector("[name=stock_name_width]").value = "サイズ";
document.querySelector("[name=stock_name_height]").value = "カラー";
document.querySelector("[name=product_subject_mobile]").value =
  shoplistDescription
    .replace(/\n{2,}/g, "\n")
    .replace(/\n/g, "<br>\n") + "<br><br>\n\n"
    // .replace(/【/g, "\n<br><br>\n【")
    // .replace(/】/g, "】<br>\n") + "\n\n";

if (!/^k/.test(productNumber)) {
  let sizeInput = prompt("Size") ?? "";

  let sizeHeaders = sizeInput
    .replace(/"/g, "")
    .replace(/\n（/g, "（")
    ?.match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]|ｻ|ｽ|ﾊﾞ)\S+/gu) ?? [];
  let sizeValues = sizeInput
    .split(sizeHeaders[sizeHeaders.length - 1])[1]
    ?.match(/(\w|[ａ-ｚ])\S*/giu);

  let sizeRows = [];

  for (let i = 0; i < sizeValues.length - 1; i++) {
    let sizeRow = [];
    if (!(i % sizeHeaders.length)) {
      for (let j = i; j < i + sizeHeaders.length; j++) {
        sizeRow.push(sizeValues[j]);
      }
      sizeRows.push(sizeRow);
    }
  }

  document.querySelector("[name=product_subject_mobile]").value += sizeRows
    .map((row) =>
      row
        .map((col, i) =>
          i != 0 ? sizeHeaders[i] + ` ${col}cm` : col + "号<br>\n"
        )
        .join(" / ")
    )
    .join("<br><br>\n")
    .replace(/\n \/ /g, "\n");
}

document
  .querySelectorAll('td[style="width:80px;"]')
  .forEach((td) => td.appendChild(document.createElement("img")));

let imagesLimit =
  /^(k|d)/.test(productNumber) ? parseInt(prompt("Images Limit")) : 19;

document.querySelectorAll("input[id^=image_url]").forEach((input, i) => {
  input.value =
    i < imagesLimit + 1
      ? `http://img.shop-list.com/res/up/shoplist/shp/milulu/${productNumber}/${productNumber.toLowerCase()}-sp${i}.jpg`
      : "";
  input.addEventListener(
    "input",
    () =>
    (input.parentElement.previousElementSibling.lastElementChild.src =
      input.value)
  );
});
document.querySelector(
  "#image_url1"
).value = `http://img.shop-list.com/res/up/shoplist/shp/milulu/${productNumber}/${productNumber.toLowerCase()}-thumbnail.jpg`;

document
  .querySelectorAll('td[style="width:80px;"]')
  .forEach(
    (td) =>
    (td.lastElementChild.src =
      td.nextElementSibling.querySelector('input[size="40"]').value)
  );

document.querySelector("select[name=multi_type]").value = 2;
