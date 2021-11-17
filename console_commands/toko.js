// * Create pcPage HTML
let productNumber = prompt("商品番号")
let response = await fetch(
  "https://script.google.com/macros/s/AKfycbxlhYFxrXAZ-3bXaivrv-ZTND-UtV2x5VRXPDR_bF3rNOTqOmv21GR9w0p6WaG7BfW5/exec?productNumber=" +
    productNumber,
  {
    mode: "no-cors",
  }
);
let data = await response.text();

data.romajiColors = data.romajiColors ?? [];

let category = prompt("Category") || "tops";

let sortedColors = [];

data.colors.forEach((_, i) => {
  const colorPrompt = prompt("Color " + (i + 1));
  if (colorPrompt) {
    sortedColors.push(data.colors.find((color) => color.match(colorPrompt)));
  } else {
    sortedColors.push(
      data.colors.find((color) => !sortedColors.includes(color))
    );
  }
});

document.querySelectorAll(".sale_desc img").forEach((img) => {
  img.src = img.src
    ?.replace(/\w{1,3}\d{3,6}/, data.productNumber.toLowerCase())
    .replace(/(?<=cabinet\/)\w+/, category);
});

let topTitles = document.querySelectorAll(".product-top > article > h2");
let topParagraphs = document.querySelectorAll(".product-top > article > p");

topTitles.forEach((topTitle, i) => {
  let index = i > 0 ? i + 1 : "";
  topTitle.innerHTML = data["topTitle" + index] ?? "";
  topParagraphs[i].innerHTML =
    data["topParagraph" + index]?.replace(/。/g, "。<br>\n") ?? "";
});

document.querySelector("h1.colors-title > span").innerHTML = data.colorCount;

document.querySelector(".colors-title + .images-flex").innerHTML = "";

if (parseInt(data.colorCount) <= 3) {
  data.romajiColors.forEach((romajiColor, i) => {
    document.querySelector(".colors-title + .images-flex").innerHTML += `
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }.jpg">
<h2>${romajiColor}</h2>
</div>
    `;
  });

  document.querySelector(
    "span.sale_desc > section.detail > div:nth-child(3) > p"
  ).innerHTML = data.detailParagraph1?.replace(/。/g, "。<br>\n");
  document.querySelector(
    "span.sale_desc > section.detail > div:nth-child(4) > p"
  ).innerHTML = data.detailParagraph2?.replace(/。/g, "。<br>\n");

  document.querySelector(
    "section.variations"
  ).innerHTML = `<h1>color variations</h1>`;

  data.romajiColors.forEach((color, i) => {
    document.querySelector("section.variations").innerHTML += `
<div class="variation">
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-1.jpg">
<span>
${color}
</span>
</div>
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-2.jpg">
</div>

<div class="images-grid">
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-3.jpg">
</div>
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-4.jpg">
</div>
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-5.jpg">
</div>
<!-- <p>model:160cm ／ Mサイズ着用</p> -->
</div>
</div>
  `;
  });
}

if (category == "terax") {
  topTitles.forEach((topTitle, i) => {
    let index = i > 0 ? i + 1 : "";
    topTitle.innerHTML = data["topTitle" + index] ?? "";
    topParagraphs[i].innerHTML =
      data["topParagraph" + index]?.replace(/。/g, "。<br>\n") ?? "";
  });

  data.romajiColors = prompt("カラー表記").match(
    /[一-龠]\S*|[ぁ-ゔ]+|[ァ-ヴー]+|[a-z]{4,}|[ａ-ｚ]+/giu
  );
  data.romajiColors.forEach((romajiColor, i) => {
    if (i <= 2) {
      document.querySelector(".colors-title + .images-flex").innerHTML += `
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
        i + 1
      }.jpg">
<h2>${romajiColor}</h2>
</div>
      `;
    } else if (i == 3) {
      document.querySelector(".colors-title + .images-flex").outerHTML += `
<div class="images-flex">
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i}.jpg">
<h2>${data.romajiColors[i]}</h2>
</div>
<div>
${
  data.romajiColors[i + 1]
    ? `<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
        i + 1
      }.jpg">`
    : ""
}
<h2>${data.romajiColors[i + 1] ?? ""}</h2>
</div>
<div>
${
  data.romajiColors[i + 2]
    ? `<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
        i + 2
      }.jpg">`
    : ""
}
<h2>${data.romajiColors[i + 2] ?? ""}</h2>
</div>
</div>
      `;
    }
  });

  document.querySelector(
    "section.variations"
  ).innerHTML = `<h1>color variations</h1>`;

  data.romajiColors.forEach((color, i) => {
    document.querySelector("section.variations").innerHTML += `
<div class="variation">
<div>
<img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${
      i + 1
    }-1.jpg">
<span>
${color}
</span>
</div>
</div>
`;
  });
}

document.querySelector("span.sale_desc > section.detail > div:nth-child(3) > p")
  ? (document.querySelector(
      "span.sale_desc > section.detail > div:nth-child(3) > p"
    ).innerHTML = data.detailParagraph1?.replace(/。/g, "。<br>\n"))
  : null;
document.querySelector("span.sale_desc > section.detail > div:nth-child(4) > p")
  ? (document.querySelector(
      "span.sale_desc > section.detail > div:nth-child(4) > p"
    ).innerHTML = data.detailParagraph2?.replace(/。/g, "。<br>\n"))
  : null;

//       document.querySelector(
//         "section.variations"
//         ).innerHTML = `<h1>color variations</h1>`;

//         data.romajiColors.forEach((color, i) => {
//           document.querySelector("section.variations").innerHTML += `
//   <div class="variation">
//   <div>
//   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-1.jpg">
//   <span>
//   ${color}
//   </span>
//   </div>
//   <div>
//   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-2.jpg">
//   </div>

//   <div class="images-grid">
//   <div>
//   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-3.jpg">
//   </div>
//   <div>
//   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-4.jpg">
//   </div>
//   <div>
//   <img src="https://image.rakuten.co.jp/limy/cabinet/${category}/${data.productNumber.toLowerCase()}-c${i + 1}-5.jpg">
//   </div>
//   <!-- <p>model:160cm ／ Mサイズ着用</p> -->
//   </div>
//   </div>
//   `;
// });

// }

let localData = {
  sizes: data.sizes,
  productNumber,
  category,
  sortedColors,
  title: data.title,
  productName: data.productName,
  rakutenCatchCopy: data.rakutenCatchCopy,
  rakutenMobileCatchCopy: data.rakutenMobileCatchCopy,
  priceWithTax: data.priceWithTax,
};

document.body.innerHTML += `
<div style="
position        : fixed;
left            : 20px;
top             : 100px;
background      : teal;
width           : 80px;
height          : 80px;
display         : flex;
color           : #fff;
border-radius   : 50%;
cursor          : pointer;
align-items     : center;
justify-content : center;
"
onclick="save()"
>送信</div>
`;

function save() {
  document
    .querySelectorAll("[draggable]")
    .forEach((dragEl) => dragEl.removeAttribute("draggable"));
  localData.pageHtml = document.querySelector("span.sale_desc").innerHTML;

  fetch("http://localhost:8888/toko", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(localData),
  });
}

let selectedText, selectedElement;

document.addEventListener("mouseup", (event) => {
  selectedText = window.getSelection().toString() || undefined;
  selectedElement = window.getSelection().focusNode.parentElement;
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    selectedElement.innerHTML = selectedElement.innerHTML.replace(
      selectedText,
      selectedText + "<br>\n"
    );
  }
  if (event.key == "Backspace") {
    event.preventDefault();
    selectedElement.innerHTML = selectedElement.innerHTML.replace(
      /<br>\n*\s*/gm + selectedText,
      selectedText
    );
  }

  navigator.clipboard.writeText(selectedElement.outerHTML);
});

document
  .querySelectorAll("section.variations > div > div > span")
  .forEach((floatingSpan) => {
    floatingSpan.draggable = true;
    let initialX;
    floatingSpan.addEventListener(
      "dragstart",
      ({ clientX }) => (initialX = clientX)
    );
    floatingSpan.addEventListener(
      "dragend",
      ({ clientX }) =>
        (floatingSpan.className = clientX > initialX ? "right" : "left")
    );
  });

//! Rakuten Submit Product

let localResponse = await fetch("http://localhost:8888/toko");
let data = await localResponse.json();
// let response = await fetch(
//   "https://script.google.com/macros/s/AKfycbxlhYFxrXAZ-3bXaivrv-ZTND-UtV2x5VRXPDR_bF3rNOTqOmv21GR9w0p6WaG7BfW5/exec?productNumber=" +
//     localData.productNumber
// );
// let data = await response.json();

let manageNumberInput = document.querySelector("[name=itemManageNumber]");
let productNumberInput = document.querySelector("[name=itemNumber]");
let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");
let oldProductNumber = window.location.href.split("/")[8];

let mobilePageInput = [...document.querySelectorAll("textarea")].find(
  ({ value }) => value.includes("<!-- sp -->")
);
let pcPageInput = [...document.querySelectorAll("textarea")].find(({ value }) =>
  value.includes("<!-- pc -->")
);

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = document.querySelectorAll(`input[name^="url_"]`);
let altInputs = document.querySelectorAll(`input[name^="alt_"]`);

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

inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(productNumberInput, data.productNumber);
textareaValueChanger.call(productNameInput, data.productName);
// textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy)
// textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy)
inputValueChanger.call(priceInput, data.priceWithTax);
textareaValueChanger.call(
  mobilePageInput,
  mobilePageInput.value
    .replaceAll(oldProductNumber, data.productNumber.toLowerCase())
    .replace(/(?<=cabinet\/)\w+(?=\/)/g, data.category)
);
textareaValueChanger.call(
  pcPageInput,
  data.pageHtml
    .replaceAll(oldProductNumber, data.productNumber.toLowerCase())
    .replace(/(?<=cabinet\/)\w+(?=\/)/g, data.category)
);
// selectValueChanger.call(asurakuInput, 1);
//   imageUrlInputs.forEach((input) =>
//   inputValueChanger.call(
//     input,
//     input.value.replaceAll(oldProductNumber, data.productNumber.toLowerCase())
//     .replace(/(?<=cabinet\/)\w+(?=\/)/g, localData.category)
// )
// );

imageUrlInputs.forEach((input) => {
  input.value = input.value
    .replaceAll(oldProductNumber, data.productNumber.toLowerCase())
    .replace(/(?<=cabinet\/)\w+(?=\/)/g, data.category);
  input.addEventListener(
    "focus",
    () =>
      (input.value = input.value
        .replaceAll(oldProductNumber, data.productNumber.toLowerCase())
        .replace(/(?<=cabinet\/)\w+(?=\/)/g, data.category))
  );
});

altInputs.forEach((input) =>
  input.addEventListener("focus", () =>
    inputValueChanger.call(input, data.productName)
  )
);

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("focus", { bubbles: true }));
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

//! Rakuten variations
let localResponse = await fetch("http://localhost:8888/toko");
let data = await localResponse.json();

let colorCode = {
  バーガンディー: "84",
  クロ: "01",
  モカ: "44",
  グリーン: "61",
  レンガ: "52",
  キャメル: "42",
  ボルドー: "83",
  グレー: "31",
  オフ: "10",
  ベージュ: "41",
  ブラウン: "43",
  ピンク: "71",
  ミント: "60",
  パープル: "73",
  ダスティピンク: "71",
  オレンジ: "52",
  チャコール: "33",
  マスタード: "51",
  グレージュ: "46",
  モーブピンク: "71",
  アカ: "80",
  杢グレー: "31",
  杢ピンク: "71",
};

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

data.sizes.forEach((size, i) => {
  inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], size);
});

data.sortedColors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], colorCode[color]);
});

document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

// SP Page Edit

document.body.innerHTML += `
  <div style="
   position        : fixed;
   left            : 20px;
   top             : 100px;
   background      : #ffffff66;
   backdrop-filter : blur(1px)
   border          : 1px solid #ffffff;
   width           : 80px;
   height          : 80px;
   display         : flex;
   color           : #333;
   border-radius   : 50%;
   cursor          : pointer;
   align-items     : center;
   justify-content : center;
  "
  onclick="save()"
  >コピー</div>
  `;

function save() {
  navigator.clipboard.writeText(
    document
      .querySelector("#itemDetail > div > div > div > div > div > div")
      .innerHTML.toString()
  );
}

let selectedText, selectedElement;

document.addEventListener("mouseup", (event) => {
  selectedText = window.getSelection().toString() || undefined;
  selectedElement = window.getSelection().focusNode.parentElement;
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    selectedElement.innerHTML = selectedElement.innerHTML.replace(
      selectedText,
      selectedText + "<br>\n"
    );
  }
  if (event.key == "Backspace") {
    event.preventDefault();
    selectedElement.innerHTML = selectedElement.innerHTML.replace(
      "<br>\n" + selectedText,
      selectedText
    );
  }
});

//!Search and Replace

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let searchValues = prompt("Search").split(";");
let replaceValues = prompt("Replace").split(";");
searchValues.forEach((searchValue, i) => {
  document.querySelectorAll("[type=text]").forEach((input) => {
    inputValueChanger.call(
      input,
      input.value.replaceAll(searchValue, replaceValues[i])
    );
    inputValueChanger.onfocus = inputValueChanger.call(
      input,
      input.value.replaceAll(searchValue, replaceValues[i])
    );
  });
  document.querySelectorAll("textarea").forEach((textarea) => {
    textareaValueChanger.call(
      textarea,
      textarea.value.replaceAll(searchValue, replaceValues[i])
    );
    textareaValueChanger.onfocus = textareaValueChanger.call(
      textarea,
      textarea.value.replaceAll(searchValue, replaceValues[i])
    );
  });
});

document.querySelectorAll("input, textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

// * Create Spec Table

let input = prompt("Size");

let headers = input
  .replace(/cm|マタニティ/g, "")
  .match(/[一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤a-z]{2,}/giu);
let data = [[]];
let dataIndex = 0;

input
  .split(headers[headers.length - 1])[1]
  .match(/(\w|マタニティ)\S*/g)
  .forEach((datum, j) => {
    if (j && j % headers.length == 0) {
      dataIndex++;
      data[dataIndex] = [];
    }
    data[dataIndex].push(datum);
  });

let materialInput = prompt("Material");

let materialHeaders =
  materialInput.match(/[a-z]*[※一-龠ーぁ-ゔァ-ヴｱ-ﾝ々〆〤]+[ァ-ヴ（）]*/giu) ??
  materialInput.match(/[一-龠ーぁ-ゔァ-ヴｱ-ﾝ々〆〤]+[ァ-ヴ（）]*/gu);
// let materialHeaders = materialInput.match(/[一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤（）]{1,}/gu)
let materialData = materialInput.match(
  /\S{0,1}[一-龠ーぁ-ゔァ-ヴｱ-ﾝ々〆〤]*(\d|[０-９])+(%|％)\S{0,1}/gu
);

let splittedMaterials = materialInput.match(/\S+/g);

if (splittedMaterials.length % 2 == 0) {
  materialHeaders = splittedMaterials.filter((_, i) => i % 2 == 1);
  materialData = splittedMaterials.filter((_, i) => i % 2 == 0);
}

// let materialHeaders = materialInput.match(/\S+(?=\S*\d+)/g).map(string => string.split("").pop().join())

let variations = document.querySelector("section.variations");
let specs =
  document.querySelector("section.specs") ?? document.createElement("section");
specs.className = "specs";
specs.innerHTML = `<h1>Spec</h1>
<table>
    <tr>
      <th>
        サイズ / 実寸<br>(cm)
      </th>
      <td>
        <table>
          <thead>
            <tr>
              ${headers.map((header) => `<th>${header}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
          ${data
            .map(
              (dt) =>
                `<tr>
              ${dt
                .map((datum) => {
                  const number = datum.match(/\d+(\d|\.)+/g);
                  const splitSlash = datum.split("/");
                  const splitTilde = datum.split("～");

                  if (splitSlash.length > 1) {
                    return `<td>前 ${splitSlash[0]}<br>後 ${splitSlash[1]}</td>`;
                  } else if (splitTilde.length > 1) {
                    return `<td>${splitTilde[0]}～${splitTilde[1]}</td>`;
                  } else {
                    return `<td>${datum}</td>`;
                  }
                })
                .join("")}
              </tr>`
            )
            .join("\n")}
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
        <table class="material">
        ${materialHeaders
          .map(
            (header, i) =>
              `<tr><th>${header}<th><td>${materialData[i]?.replace(
                header,
                ""
              )}</td></tr>`
          )
          .join("\n")}
        </table>
      </td>
    </tr>
</table>

    <ul class="caution">
      <li>※サイズは平置きでの実寸サイズを測っているため、誤差がでる場合がある旨ご了承下さい。</li>
    </ul>
`;

let description =
  document.querySelector("section.product-top > article > h2").innerHTML +
  `<br>\n` +
  document.querySelector("section.product-top > article > p").innerHTML +
  "<br><br>\n" +
  "スペック<br>\n" +
  headers
    .map((header, i) => {
      const number = data.map((datum) =>
        datum.map((dtm) => dtm.match(/\d+(\d|\.)*/g))
      );
      const splitSlash = data.map((datum) =>
        datum.map((dtm) => dtm.split("/"))
      );
      const splitTilde = data.map((datum) =>
        datum.map((dtm) => dtm.split("～"))
      );

      if (splitSlash.length > 1) {
        return `${header}：前 ${splitSlash[0]}cm/後 ${splitSlash[1]}cm<br>`;
      } else if (splitTilde.length > 1) {
        return `${header}：${splitTilde[0]}cm～${splitTilde[1]}cm<br>`;
      } else {
        return `${header}：${data[i]}<br>`;
      }
    })
    .join("\n") +
  `<br>
  モデル（身長）：166cm<br><br>
  素材<br>
  ${materialHeaders
    .map((header, i) => `${header}：${materialData[i]?.replace(header, "")}`)
    .join("<br>\n")}<br><br>

  ※サイズは平置きでの実寸サイズを測っているため、誤差がでる場合がある旨ご了承下さい。`;

variations.parentElement.insertBefore(specs, variations.nextElementSibling);

fetch("http://localhost:8888/toko-specs", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pcPage: document.querySelector("span.sale_desc").innerHTML,
    description,
    spSpecs: "",
  }),
});

document.querySelector("section.specs").style.paddingRight = 1;

//! Rakuten Insert Specs

document
  .querySelector(
    "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(8) > div:nth-child(3) > div.rms-columns > div > div > button"
  )
  .click();

let localResponse = await fetch("http://localhost:8888/toko-specs");
let data = await localResponse.json();

let pcDescription = document.querySelector(
  "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(7) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
);

let spPageInput = [...document.querySelectorAll("textarea")].find(({ value }) =>
  value.includes("<!-- sp -->")
);
let pcPageInput = [...document.querySelectorAll("textarea")].find(({ value }) =>
  value.includes("<!-- pc -->")
);

let imageUrlInputs = document.querySelectorAll(`input[name^="url_"]`);
let spSpecSlide =
  document.querySelector(`input[name^="url_"][value*=sp-s]`) ??
  [...imageUrlInputs].find(({ value }) => !value);

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

if (data?.pcPage) {
  textareaValueChanger.call(pcPageInput, data.pcPage);
}
textareaValueChanger.call(pcDescription, data.description);
textareaValueChanger.call(
  spPageInput,
  spPageInput.value.replace(
    `https://image.rakuten.co.jp/limy/cabinet/${imageUrlInputs[0].value.match(
      /(?<=cabinet\/)\w+/
    )}/${window.location.href.match(/[a-z]{3}\d{6}/)}-sp-s.jpg`,
    ` https://image.rakuten.co.jp/limy/cabinet/${imageUrlInputs[0].value.match(
      /(?<=cabinet\/)\w+/
    )}/${window.location.href.match(/[a-z]{3}\d{6}/)}-sp-s_2.jpg`
  )
);

spSpecSlide.onfocus = ({ target }) =>
  (target.value = `https://image.rakuten.co.jp/limy/cabinet/${imageUrlInputs[0].value.match(
    /(?<=cabinet\/)\w+/
  )}/${window.location.href.match(/[a-z]{3}\d{6}/)}-sp-s_2.jpg`);

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

// Amazon shohin shokai contents

Object.prototype.waitAndClick = function () {
  if (this) return this.click();
  if (!this) return setTimeout(() => this.waitAndClick(), 300);
};

document
  .querySelector("#app-main > div > div > div > div > div > div > div > div")
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

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

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(4) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(5) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(6) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > a"
  )
  .click();

document
  .querySelector(
    "body > div:nth-child(5) > div > div > div > div > div.bmc-katal > div:nth-child(1) > div > div:nth-child(1) > div > a"
  )
  .click();
[
  [...document.querySelectorAll("div[role=img]")]
    .find((img) => /terax_lp_main/.test(img.innerHTML))
    .querySelector("[label=Add]"),

  document.querySelector(
    "body > div:nth-child(5) > div > div > div > div > div.bmc-katal > div:nth-child(2) > span:nth-child(3) > span > button"
  ),

  document.querySelector(
    "#app-main > div > div > div > div > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > a"
  ),

  document.querySelector(
    "body > div:nth-child(5) > div > div > div > div > div.bmc-katal > div:nth-child(1) > div > div:nth-child(1) > div > a"
  ),
].forEach((element, i) => {
  setTimeout(() => element.click(), 5000 * (i + 1));
});

setTimeout(() => {
  [...document.querySelectorAll("div[role=img]")]
    .find((img) => /terax_lp_02/.test(img.innerHTML))
    .querySelector("[label=Add]")
    .click();

  document
    .querySelector(
      "body > div:nth-child(5) > div > div > div > div > div.bmc-katal > div:nth-child(2) > span:nth-child(3) > span > button"
    )
    .click();
}, 20000);

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

let titles = [
  "TERAXとは",
  "テラヘルツ波とは",
  '"体に触れる部分は熱くなりすぎず、保温する"新感覚の着心地 ',
  "プレゼントにも◎ 専用BOXに入れてお届け",
  prompt("Header Title"),
];

document
  .querySelectorAll(
    '[data-component-id="header"] [placeholder="ヘッドラインのテキストを入力"]'
  )
  .forEach((title, i) => {
    inputValueChanger.call(title, titles[i]);
  });

let contents = [
  `TERAXは、人の体が持つ熱エネルギーを遠赤外線エネルギーに変えて温かさを保つ高機能素材です。
温かさの秘密は、内側に施された八角形のプリント加工。
遠赤外線のパワーが最も発揮できる配合を実現し、生地内側にプリントしました。
ベースとなる生地は、フィット感抜群の高ストレッチ素材を使用。
優しく包み込むような温かさを感じていただけます。
    `,
  `遠赤外線の30μm〜1mmの波長の領域のことで、別名「育成光線」と言われています。
水分子を活性化したり、植物の生育を促進する効果があると言われています。
    `,
  `TERAX素材の最大の特徴は”体に触れる部分は熱くなりすぎず、保温する"こと。
生地裏面すべてに施された鉱石プリントから出る遠赤外線が、効率よく保温します。
締め付けにくく柔らかい素材を使用し、着脱スムーズ、ストレスフリーな着心地を実現。
上からお洋服を着ても響きにくい薄い素材を使用しているので、お出かけやお家でのリラックスタイム、
就寝時などあらゆるシーンでご着用いただけます。 
    `,
  `TERAXシリーズは、全て専用BOXに入れてお届けいたします。
ご自身での着用はもちろん、冷えにお悩みの方へのギフトにも最適です。
※お手入れ方法
お洗濯については、通常のお洋服と同じ目安で行っていただいて構いませんが、中性洗剤をご使用いただき、ネットに入れてお洗濯をお願いいたします。
※使用上の注意
製品の特性上、次の方は使用をご遠慮ください。
・心臓疾患をお持ちの方
・アトピー性皮膚炎をお持ちの方
・金属アレルギーをお持ちの方
    `,
  prompt("Header Content"),
  prompt("Detail Content"),
];

document.querySelectorAll("span[data-offset-key]").forEach((content, i) => {
  content.innerHTML =
    '<span data-text="true">' +
    contents[i].replace(/®/g, "").replace(/。/g, "。\n") +
    "</span>";
});

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

// Amazon not TERAX

document
  .querySelector("#app-main > div > div > div > div > div > div > div > div")
  .click();

document.querySelector('[data-component-id="3p-module-b"]').click();

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

document.querySelector('[data-component-id="3p-module-b"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(4) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-3"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(5) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-3"]').click();

document
  .querySelector(
    "#app-main > div > div > div > div > div:nth-child(6) > div > div > div"
  )
  .click();

document.querySelector('[data-component-id="module-6"]').click();

