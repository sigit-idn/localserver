//* Create kids size table
copy = copy
let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S*/gu);
// .match(/\d{3}/g)

sizeHeaders.unshift('サイズ(cm)');

let sizeTitles = sizeInput.match(/\d{3}/g) ?? JSON.parse(localStorage.getItem("sizeTitles"))

localStorage.setItem("sizeTitles", JSON.stringify(sizeTitles))
let sizeValues = sizeInput.match(/(\d|\.)+/g).filter(value => !sizeTitles.some((title) => title === value))

let sizeCols = sizeInput.split(/\n/).map(col => col.match(/(?<=[一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤].+)(\d|\.)+/g)).filter(Boolean)

let sizeTable = 
`<thead>
  <tr>${sizeHeaders.map(header => "<th>" + header + "</th>").join('')}</tr>
</thead>
<tbody>
${sizeTitles.map((title, i) => 
  `<tr><th>${title}</th>${sizeCols.map((col) => 
       col.map((value, j) => j===i ? "<td>" + value + "</td>" : "").join('')
    ).join('')}`
    ).join("\n")}
</tbody>
`

copy(sizeTable);


//! SHOPLIST Kids Submit Product

let response = await fetch("http://localhost:8888/milulu");
let {
  shoplistCatchCopy,
  shoplistDescription,
  shoplistJanCode,
  shoplistPrice,
  productNumber,
  rakutenCatchCopy,
  shoplistCategory,
  shoplistProductName,
} = await response.json();

document.querySelector("[name=catch_copy_mobile]").value =
  shoplistCatchCopy.length > 130
    ? rakutenCatchCopy.replace(/あす楽/g, "")
    : shoplistCatchCopy;
document.querySelector("[name=product_name]").value = shoplistProductName;
document.querySelector("[name=product_code]").value = productNumber;
document.querySelector("[name=shop_product_code]").value = productNumber;
document.querySelector("[name=genre_id]").value =
  String(shoplistCategory).match(/\d+/);
document.querySelector("[name=product_material_details]").value = prompt(
  "Material"
).replace(/\s{2,}|(?<=%)\s/g, "<br>\n");

document.querySelector("[name=product_sales_price]").value = shoplistPrice;
document.querySelectorAll("[name=tax_flg]")[1].checked = true;
document.querySelectorAll("[name='product_sex_type[]']")[/^d/.test(productNumber) ? 2 : 1].checked = true;
document.querySelectorAll("[name=stock_type]")[2].checked = true;
document.querySelector("[name=stock_name_width]").value = "サイズ";
document.querySelector("[name=stock_name_height]").value = "カラー";
document.querySelector("[name=product_subject_mobile]").value =
  shoplistDescription
    .replace(/\n{2,}/g, "\n")
    .replace(/\n/g, "<br>\n") + "<br><br>\n"
    // .replace(/【/g, "\n<br><br>n【")
    // .replace(/】/g, "】<br>\n") + "\n\n";

  let sizeInput = prompt("Size") ?? "";

  let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S*/gu);
// .match(/\d{3}/g)

let sizeTitles = sizeInput.match(/\d{3}/g) ?? JSON.parse(localStorage.getItem("sizeTitles"))

localStorage.setItem("sizeTitles", JSON.stringify(sizeTitles))
let sizeValues = sizeInput.match(/(\d|\.)+/g)?.filter(value => !sizeTitles.some((title) => title === value))

let sizeCols = sizeInput.split(/\n/).map(col => col.match(/(?<=[一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤].+)(\d|\.)+/g))?.filter(Boolean)


  document.querySelector("[name=product_subject_mobile]").value += "ジャケット<br>\n" + 
  sizeTitles.map((title,i) => title + `<br>${sizeHeaders.map((header,j) => header + " " + sizeCols?.[j]?.[i]).join(" / ")}`).join('<br>\n') 

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


// Shoplist Additional Size

let sizeInput = prompt("Size") ?? "";

let sizeHeaders = sizeInput
.replace(/"/g, "")
.replace(/\n（/g, "（")
.match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S*/gu);
// .match(/\d{3}/g)

let sizeTitles = sizeInput.match(/\d{3}/g) ?? JSON.parse(localStorage.getItem("sizeTitles"))

localStorage.setItem("sizeTitles", JSON.stringify(sizeTitles))
let sizeValues = sizeInput.match(/(\d|\.)+/g)?.filter(value => !sizeTitles.some((title) => title === value))

let sizeCols = sizeInput.split(/\n/).map(col => col.match(/(?<=[一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤].+)(\d|\.)+/g))?.filter(Boolean)


document.querySelector("[name=product_subject_mobile]").value += "<br><br>\n\nワンピース<br>\n" +
sizeTitles.map((title,i) => title + `<br>${sizeHeaders.map((header,j) => header + " " + sizeCols?.[j]?.[i]).join(" / ")}`).join('<br>\n') 
