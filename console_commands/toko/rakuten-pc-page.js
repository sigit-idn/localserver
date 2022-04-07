// * Rakuten Submit Product
let data = await (await fetch("http://localhost:8888/toko")).json();

let colorCodes = {
  オフ: "10",
  イエロー: "50",
  ブルー: "22",
  オフ: "10",
  クロ: "01",
  サックス: "20",
  オフ: "10",
  カーキ: "63",
  ベージュ: "41",
  グレーサックス: "20",
  モカ: "44",
  クロ: "01",
  ベージュ: "41",
  キャメル: "42",
  ブルー: "22",
}

let cabinetCategories = {
  BL: "tops",
  OP: "tops",
  SK: "bottoms",
  TX: "terax",
}

let productData = this.prompt ? prompt("productData", data.productData) : data.productData;

let cabinetCategory = cabinetCategories[productData.match(/(BL|OP|SK|TX)\b/)[0]];

let productNumber = productData.match(/[a-z]{3}\d{6,7}/i)?.[0];
let material = productData.match(/\S+[%％]/g)?.join(" ");

let productName = productData.match(/(?<=[%％]\s+)\S{2,}/)?.[0];
let colors = productData.match(/\S+(?=\s+\d{2}\s+[FSML]\b)/g);
let sizes = productData.match(/\b[FSML]\b/g)?.filter((v, i, a) => a.indexOf(v) === i);
let janCodes = productData.match(/\d{13}/g);
let originCountry = productData.match(/\S+製/)?.[0];

let pageDescription = this.prompt ? prompt("pageDescription", data.pageDescriptionTitle + " \n" + data.pageDescriptionBody) : data.pageDescriptionTitle + " \n" + data.pageDescriptionBody;
let pageDescriptionTitle = pageDescription.match(/^\S+/)?.[0];
let pageDescriptionBody = pageDescription.replace(new RegExp(pageDescriptionTitle), "").trim();

let detailDescription = this.prompt ? prompt("detailDescription", data.detailDescription).trim() : data.detailDescription;
let colorDescription = this.prompt ? prompt("colorDescription", data.colorDescriptions.join(" \n")) : data.colorDescriptions.join(" \n");
let birthDescription = this.prompt ? prompt("birthDescription", data.birthDescription).trim() : data.birthDescription;

let colorDescriptions = colorDescription.match(/\S+/g)

let price = Math.max(...productData.match(/\b[\d,]{4,5}\b/g).map(v => parseInt(v.replace(/,/g, ""))));

if (this.fetch) fetch("http://localhost:8888/toko", {
  method: "POST",
  body: JSON.stringify({
    productNumber,
    productName,
    material,
    colors,
    colorCodes,
    sizes,
    janCodes,
    originCountry,
    price,
    pageDescriptionTitle,
    pageDescriptionBody,
    detailDescription,
    colorDescriptions,
    birthDescription,
  })
}).then(console.log);

let pcPageValue = `<style>
  <!--
    ${colors.map((_, i) => `
      /* ${i + 1} */
      #rakutenLimitedId_aroundCart tr tr tr:nth-child(${i + 2}) .inventory_choice_name span:before {
        background-image:url("https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-c${i + 1}-1.jpg");
      }
    `).join("\n")}
  -->
  </style>
  
  <section class="product-top">
  <div>
  <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-top.jpg">
  </div>
  <article>
  <h2>${pageDescriptionTitle}</h2>
  <p>${pageDescriptionBody}</p>
  </article>
  </section>
  

  <section class="product-top">
  <div>
  <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-top2.jpg">
  </div>
  <article>
  <h2></h2>
  <p></p>
  </article>
  </section>
  
  <section class="detail">
  <h1>Fabric</h1>

  <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-kiji.jpg" width="100%">
  <p>${detailDescription}</p>

  <h1>Detail</h1>
  <ul class="images-flex">
  ${["front", "side", "back"].map((v, i) => `
    <li>
    <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-d-${v}.jpg">
    <h2>${v.replace(/^(\w)/, "$1".toUpperCase())}</h2>
    </li>
  `).join("\n")}

  </ul>
  
  ${colorDescriptions.map((v, i) => `
    <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-d${i + 1}.jpg" width="100%">
    <p>${v}</p>
  `).join("\n")}
  
  <div>
  <ul class="images-flex">
  <li>
  <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-before.jpg">
  <span>産前</span>
  </li>
  <li>
  <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-after.jpg">
  <span>産後</span>
  </li>
  </ul>
  <p>${birthDescription}</p>
  </div>
  </section>
  
  <section class="variations"><h1>color variations</h1>
  ${colors.map((v, i) => `
    <div class="variation">
    ${[1, 2].map((j) => `
      <div>
      <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-c${i + 1}-${j}.jpg">
      <span>${v}</span>
      </div>
    `).join("\n")}
    </div>
  `).join("\n")}
  </section>

  <div class="images-flex">
  ${colors.map((v, i) => `
    <div>
    <img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-c${i + 1}.jpg">
    <h2>${v}</h2>
    </div>
  `).join("\n")}
  </div>
  <br><br>
  <section class="specs"><h1>Spec</h1>
<table>
    <tbody><tr>
      <th>
        サイズ / 実寸<br>(cm)
      </th>
      <td>
        <table>
          <thead>
            <tr>
              <th>サイズ</th><th>着丈</th><th>身幅</th><th>裄丈</th>
            </tr>
          </thead>
          <tbody>
          ${sizes.map((v) => `
            <tr><td>${v}</td><td>前 62<br>後 69</td><td>51.5</td><td>74</td></tr>
          `).join("\n")}
        </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <th>
        モデル (身長)
      </th>
      <td>
        166cm
      </td>
    </tr>
    <tr>
      <th>
        素材
      </th>
      <td>
        ${material.split(" ").map((v) => `
          <div>${v}</div>
        `).join("\n")}
      </td>
    </tr>
</tbody></table>

    <ul class="caution">
      <li>※サイズは平置きでの実寸サイズを測っているため、誤差がでる場合がある旨ご了承下さい。</li>
    </ul>
</section><section>
  <h1>Order</h1>
  </section>`


let spImageIndex = 1;
let spPageValue = `
<table>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-top.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><th><b>
${pageDescriptionTitle}
</b>
</th></tr>
<tr><td height="2"></td></tr>
<tr>
<td>
${pageDescriptionBody}
</td>
</tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-sp${spImageIndex++}.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
${colorDescriptions.map((v, i) => `
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-d${i + 1}.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td>${v}</td></tr>
`).join("\n")}
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-sp${spImageIndex++}.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td>${birthDescription}</td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/title-color-var.jpg" width="100%"></td></tr>
${colors.map((_, i) => [1,2].map((v2) => `
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-sp${spImageIndex++}.jpg" width="100%"></td></tr>
<tr><td height="30"></td></tr>
<tr><td><img src="https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-c${i+1}-${v2}.jpg" width="100%"></td></tr>
`)).flat().join("\n")}
<tr><td><img src=" https://image.rakuten.co.jp/limy/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-sp-s.jpg" width="100%"></td></tr>
</table>
`

let pcDescription = `
${pageDescriptionTitle}<br>
${pageDescriptionBody}<br><br>
スペック<br>
サイズ：${sizes.join("/")}<br>
着丈：前 62cm/後 69cm<br>
身幅：51.5<br>
裄丈：74<br><br>
  モデル（身長）：166cm<br><br>
  素材<br>${material.split(' ').map((v) => `
  ${v}<br>
  `).join("\n")}
  <br><br>

  ※サイズは平置きでの実寸サイズを測っているため、誤差がでる場合がある旨ご了承下さい。
  `;

NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.map = Array.prototype.map;
NodeList.prototype.find = Array.prototype.find;

document
  .querySelector("#root > .rms-layout .rms-content .rms-columns  button")
  .click();

let getTextFieldByTitle = (title) =>
  document.querySelectorAll('.rms-form-row').find(row => new RegExp(title).test(row.innerText)).querySelector('textarea, input[type=text]')

let manageNumberInput = document.querySelector("[name=itemManageNumber]");
let productNumberInput = document.querySelector("[name=itemNumber]");
let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");
let categoryInputs = document
  .querySelectorAll(".rms-form-row")
  .find((row) => /表示先カテゴリ/.test(row.innerHTML))
  .querySelectorAll("input");

let descriptionInput = getTextFieldByTitle("PC用商品説明文")
let mobilePageInput = getTextFieldByTitle('スマートフォン用商品説明文')
let pcPageInput = getTextFieldByTitle('PC用販売説明文')

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = document.querySelectorAll("input[name^=url_]");
let altInputs = document.querySelectorAll("input[name^=alt_]");

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let selectValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype,
  "value"
).set;

if (productNumberInput) inputValueChanger.call(productNumberInput, productNumber);
if (manageNumberInput) inputValueChanger.call(manageNumberInput, productNumber);
if (productNameInput) textareaValueChanger.call(productNameInput, productName);
if (catchCopyInput) textareaValueChanger.call(catchCopyInput, productName);
if (mobileCatchCopyInput) textareaValueChanger.call(mobileCatchCopyInput, productName);
if (priceInput) inputValueChanger.call(priceInput, price);

descriptionInput.onfocus = textareaValueChanger.call(descriptionInput, pcDescription);
mobilePageInput.onfocus = textareaValueChanger.call(mobilePageInput, spPageValue);
pcPageInput.onfocus = textareaValueChanger.call(pcPageInput, pcPageValue);

  imageUrlInputs.forEach((input, i) => input.onfocus = () => input.value = input.value.replace(/\/cabinet\/\w+\/\w+-/, `/cabinet/${cabinetCategory}/${productNumber.toLowerCase()}-`));
  altInputs.forEach((input, i) => input.onfocus = () => input.value = productName);

[priceInput, descriptionInput, mobilePageInput, pcPageInput, ...imageUrlInputs, ...altInputs].forEach((input, i) => {
  input.tabIndex = i + 1
  textareaValueChanger.call(descriptionInput, pcDescription);
  textareaValueChanger.call(mobilePageInput, spPageValue);
  textareaValueChanger.call(pcPageInput, pcPageValue);
});

  await new Promise((resolve) => setTimeout(resolve, 1000));

  document.querySelectorAll("[type=text], textarea, select").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });



// data.romajiColors = data.romajiColors ?? [];

// let category = prompt("Category") || "tops";

// let sortedColors = [];

// data.colors.forEach((_, i) => {
//   const colorPrompt = prompt("Color " + (i + 1));
//   if (colorPrompt) {
//     sortedColors.push(data.colors.find((color) => color.match(colorPrompt)));
//   } else {
//     sortedColors.push(
//       data.colors.find((color) => !sortedColors.includes(color))
//     );
//   }
// });

// document.querySelectorAll(".sale_desc img").forEach((img) => {
//   img.src = img.src
//     ?.replace(/\w{1,3}\d{3,6}/, data.productNumber.toLowerCase())
//     .replace(/(?<=cabinet\/)\w+/, category);
// });

// let topTitles = document.querySelectorAll(".product-top > article > h2");
// let topParagraphs = document.querySelectorAll(".product-top > article > p");

// topTitles.forEach((topTitle, i) => {
//   let index = i > 0 ? i + 1 : "";
//   topTitle.innerHTML = data["topTitle" + index] ?? "";
//   topParagraphs[i].innerHTML =
//     data["topParagraph" + index]?.replace(/。/g, "。<br>\n") ?? "";
// });

// document.querySelector("h1.colors-title > span").innerHTML = data.colorCount;

// document.querySelector(".colors-title + .images-flex").innerHTML = "";

// if (parseInt(data.colorCount) <= 3) {
//   data.romajiColors.forEach((romajiColor, i) => {
//     document.querySelector(".colors-title + .images-flex").innerHTML += `
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }.jpg">
// <h2>${romajiColor}</h2>
// </div>
//     `;
//   });

//   document.querySelector(
//     "span.sale_desc > section.detail > div:nth-child(3) > p"
//   ).innerHTML = data.detailParagraph1?.replace(/。/g, "。<br>\n");
//   document.querySelector(
//     "span.sale_desc > section.detail > div:nth-child(4) > p"
//   ).innerHTML = data.detailParagraph2?.replace(/。/g, "。<br>\n");

//   document.querySelector(
//     "section.variations"
//   ).innerHTML = `<h1>color variations</h1>`;

//   data.romajiColors.forEach((color, i) => {
//     document.querySelector("section.variations").innerHTML += `
// <div class="variation">
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-1.jpg">
// <span>
// ${color}
// </span>
// </div>
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-2.jpg">
// </div>

// <div class="images-grid">
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-3.jpg">
// </div>
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-4.jpg">
// </div>
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-5.jpg">
// </div>
// <!-- <p>model:160cm ／ Mサイズ着用</p> -->
// </div>
// </div>
//   `;
//   });
// }

// if (category == "terax") {
//   topTitles.forEach((topTitle, i) => {
//     let index = i > 0 ? i + 1 : "";
//     topTitle.innerHTML = data["topTitle" + index] ?? "";
//     topParagraphs[i].innerHTML =
//       data["topParagraph" + index]?.replace(/。/g, "。<br>\n") ?? "";
//   });

//   data.romajiColors = prompt("カラー表記").match(
//     /[一-龠]\S*|[ぁ-ゔ]+|[ァ-ヴー]+|[a-z]{4,}|[ａ-ｚ]+/giu
//   );
//   data.romajiColors.forEach((romajiColor, i) => {
//     if (i <= 2) {
//       document.querySelector(".colors-title + .images-flex").innerHTML += `
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//         }.jpg">
// <h2>${romajiColor}</h2>
// </div>
//       `;
//     } else if (i == 3) {
//       document.querySelector(".colors-title + .images-flex").outerHTML += `
// <div class="images-flex">
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i}.jpg">
// <h2>${data.romajiColors[i]}</h2>
// </div>
// <div>
// ${data.romajiColors[i + 1]
//           ? `<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//           }.jpg">`
//           : ""
//         }
// <h2>${data.romajiColors[i + 1] ?? ""}</h2>
// </div>
// <div>
// ${data.romajiColors[i + 2]
//           ? `<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 2
//           }.jpg">`
//           : ""
//         }
// <h2>${data.romajiColors[i + 2] ?? ""}</h2>
// </div>
// </div>
//       `;
//     }
//   });

//   document.querySelector(
//     "section.variations"
//   ).innerHTML = `<h1>color variations</h1>`;

//   data.romajiColors.forEach((color, i) => {
//     document.querySelector("section.variations").innerHTML += `
// <div class="variation">
// <div>
// <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1
//       }-1.jpg">
// <span>
// ${color}
// </span>
// </div>
// </div>
// `;
//   });
// }

// document.querySelector("span.sale_desc > section.detail > div:nth-child(3) > p")
//   ? (document.querySelector(
//     "span.sale_desc > section.detail > div:nth-child(3) > p"
//   ).innerHTML = data.detailParagraph1?.replace(/。/g, "。<br>\n"))
//   : null;
// document.querySelector("span.sale_desc > section.detail > div:nth-child(4) > p")
//   ? (document.querySelector(
//     "span.sale_desc > section.detail > div:nth-child(4) > p"
//   ).innerHTML = data.detailParagraph2?.replace(/。/g, "。<br>\n"))
//   : null;

// //       document.querySelector(
// //         "section.variations"
// //         ).innerHTML = `<h1>color variations</h1>`;

// //         data.romajiColors.forEach((color, i) => {
// //           document.querySelector("section.variations").innerHTML += `
// //   <div class="variation">
// //   <div>
// //   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-1.jpg">
// //   <span>
// //   ${color}
// //   </span>
// //   </div>
// //   <div>
// //   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-2.jpg">
// //   </div>

// //   <div class="images-grid">
// //   <div>
// //   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-3.jpg">
// //   </div>
// //   <div>
// //   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-4.jpg">
// //   </div>
// //   <div>
// //   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-5.jpg">
// //   </div>
// //   <!-- <p>model:160cm ／ Mサイズ着用</p> -->
// //   </div>
// //   </div>
// //   `;
// // });

// // }

// let localData = {
//   sizes: data.sizes,
//   productNumber,
//   category,
//   sortedColors,
//   title: data.title,
//   productName: data.productName,
//   rakutenCatchCopy: data.rakutenCatchCopy,
//   rakutenMobileCatchCopy: data.rakutenMobileCatchCopy,
//   priceWithTax: data.priceWithTax,
// };

// document.body.innerHTML += `
// <div style="
// position        : fixed;
// left            : 20px;
// top             : 100px;
// background      : teal;
// width           : 80px;
// height          : 80px;
// display         : flex;
// color           : #fff;
// border-radius   : 50%;
// cursor          : pointer;
// align-items     : center;
// justify-content : center;
// "
// onclick="save()"
// >送信</div>
// `;

// function save() {
//   document
//     .querySelectorAll("[draggable]")
//     .forEach((dragEl) => dragEl.removeAttribute("draggable"));
//   localData.pageHtml = document.querySelector("span.sale_desc").innerHTML;

//   fetch("http://localhost:8888/toko", {
//     method: "POST",
//     mode: "no-cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(localData),
//   });
// }

// let selectedText, selectedElement;

// document.addEventListener("mouseup", (event) => {
//   selectedText = window.getSelection().toString() || undefined;
//   selectedElement = window.getSelection().focusNode.parentElement;
// });

// document.addEventListener("keyup", (event) => {
//   if (event.key == "Enter") {
//     selectedElement.innerHTML = selectedElement.innerHTML.replace(
//       selectedText,
//       selectedText + "<br>\n"
//     );
//   }
//   if (event.key == "Backspace") {
//     event.preventDefault();
//     selectedElement.innerHTML = selectedElement.innerHTML.replace(
//       /<br>\n*\s*/gm + selectedText,
//       selectedText
//     );
//   }

//   navigator.clipboard.writeText(selectedElement.outerHTML);
// });

// document
//   .querySelectorAll("section.variations > div > div > span")
//   .forEach((floatingSpan) => {
//     floatingSpan.draggable = true;
//     let initialX;
//     floatingSpan.addEventListener(
//       "dragstart",
//       ({ clientX }) => (initialX = clientX)
//     );
//     floatingSpan.addEventListener(
//       "dragend",
//       ({ clientX }) =>
//         (floatingSpan.className = clientX > initialX ? "right" : "left")
//     );
//   });