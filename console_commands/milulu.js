// Create Staff Comments

let comments = [prompt("コメント1"), prompt("コメント2"), prompt("コメント3")];

let commentsHtml = comments
  .map((comment) => {
    const modelHeight = comment.match(/\d{3}cm/);
    const size = comment.match(/\w{1,2}(号|サイズ)(?=着)/)[0];
    const statement = comment.match(/.*(\n.*)*(?=\n\w{1,2}(号|サイズ))/);

    // [0]?.replace(/\n/g, "");

    return ` <ul>
  <li id="rw-icon_1"><p><span>STAFF・1</span></p></li><li><dl>
  <dt>身長：${modelHeight}</dt>
  <dd><b>着用：${size}</b>
    ${statement}
    </dd></dl></li></ul>
  `;
  })
  .join("\n");

copy(commentsHtml);

//* Create size table

let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ﾝ々〆〤])\S+/gu);
let sizeValues = sizeInput
  .split(sizeHeaders[sizeHeaders.length - 1])[1]
  .match(/(\w|[ａ-ｚ])\S*/giu);

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

sizeHeaders =
  "<tr>" +
  sizeHeaders
    .map((header) => `<th>${header.replace(/（/g, "<br>（")}</th>`)
    .join("") +
  "</tr>";
sizeRows = sizeRows
  .map(
    (row) =>
      "<tr>" +
      row
        .map((col, i) => (i == 0 ? `<th>${col}</th>` : `<td>${col}</td>`))
        .join("") +
      "</tr>"
  )
  .join("\n");

copy(sizeHeaders + "\n" + sizeRows);

//! Pass Data
let response = await fetch(
  "https://script.google.com/macros/s/AKfycbyxdiJmE_Tim7NxQJN6FStbIK0lZ154BWTKE6j4-N0MzbcKG7zEMKUCsZdp-cj5owYtWQ/exec"
);

let data = await response.json();

let categories = {
  bl: "tops",
  op: "onepiece",
  sk: "bottom",
  st: "suit",
  pt: "bottom",
  jk: "tops",
  ct: "tops",
};

if (data.productNumber[0] == "k") {
  data.category = "accessories";
} else {
  data.category = categories[data.productNumber.match(/[a-zA-Z]{2,3}/)];
}

fetch("http://localhost:8888/milulu", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then(async (res) => console.log("Written succesfuly", await res.text()))
  .catch((error) => console.log("Error", error));

//! Create Coordinate

let response = await fetch(`http://localhost:8888/milulu`);
let data = await response.json();

let categories = {
  bl: "tops",
  op: "onepiece",
  sk: "bottom",
  st: "suit",
  pt: "bottom",
  jk: "tops",
  ct: "tops",
};

let coordinateInput = prompt("Coordinate");
data.coordinateUrls = coordinateInput.match(/http\S+/g);
let coordinateTexts = coordinateInput
  .replace(/(.*コーディネート|http|タイトル)\S*/g, "")
  .match(/\S{6,}/g);
data.coordinateSubtitles = coordinateTexts.filter((_, i) => i % 4 < 2);
data.coordinateTitles = coordinateTexts.filter((_, i) => i % 4 >= 2);

let coordinateItems = data.coordinateUrls.map((url, i) => {
  let coordinateNumber = url.split("/")[url.split("/").length - 2];
  let coordinateCategory =
    data.productNumber[0] == "k"
      ? "accessories"
      : categories[coordinateNumber.match(/[a-zA-Z]{2,3}/)];
  return `
<a href="${url}" target="_blank"><!-- ← 商品URL指定欄 -->	
	<div class="rw-coBanner">
		<p><img src="https://image.rakuten.co.jp/milulu/cabinet/${data.category}/${
    data.productNumber
  }-co_${i + 1}.jpg"></p>	
	<div>	
		<ul>
			<li><p><img src="https://image.rakuten.co.jp/milulu/cabinet/${coordinateCategory}/${coordinateNumber}-thumbnail.jpg"></p>
				<p><s>${data.coordinateSubtitles[i]}
				</s><!-- ← 小タイトル（s～s 消してもOK） -->
				${data.coordinateTitles[i]}
					</p><!-- ← 大タイトル -->
			</li>
			<li><span>モデル着用アイテムはこちら</span></li>
			<li><!-- ここは空欄・消さないで下さい --></li>
		</ul>
	</div>
	</div>
	</a>
`;
});

let productArea = document.querySelector(".productArea");
productArea.innerHTML = coordinateItems.join("\n");
productArea.addEventListener("mousewheel", () =>
  navigator.clipboard.writeText(productArea.outerHTML)
);

//! Rakuten Submit Product

let response = await fetch(`http://localhost:8888/milulu`);
let data = await response.json();

NodeList.prototype.find = Array.prototype.find;

document
  .querySelector("#root > .rms-layout .rms-content .rms-columns  button")
  .click();

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

let mobilePageInput = [...document.querySelectorAll("textarea")].find(
  ({ value }) => value.includes("<!-- sp -->")
);
let pcPageInput = [...document.querySelectorAll("textarea")].find(({ value }) =>
  value.includes("<!-- pc -->")
);

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = document.querySelectorAll("input[name^=url_]");
let altInputs = document.querySelectorAll("input[name^=alt_]");

let mobilePageValue = mobilePageInput.value.split("<!-- specs -->");
mobilePageValue[1] = `
${data.headline}<br>
${data.subtitle}
<br>
<font size="1"><b>カラー展開</b></font><br>
${data.colors.join("／")}<br>
<font size="1"><b>サイズ</b></font><br>
${data.sizes.join("／")}<br>
`;

mobilePageValue = mobilePageValue
  .join("<!-- specs -->")
  .replaceAll(window.location.href.split("/")[8], data.productNumber)
  .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category);
mobilePageValue = mobilePageValue.replace(
  /着用サイズ.+/,
  "着用サイズ" + data.modelSize
);

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

if (manageNumberInput)
  inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(productNumberInput, data.productNumber);
textareaValueChanger.call(productNameInput, data.rakutenProductName);
textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy);
textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy);
inputValueChanger.call(priceInput, data.price);
priceInput.addEventListener("focus", () =>
  inputValueChanger.call(priceInput, data.price)
);
textareaValueChanger.call(mobilePageInput, mobilePageValue);
textareaValueChanger.call(
  pcPageInput,
  pcPageInput.value
    .replaceAll(window.location.href.split("/")[8], data.productNumber)
    .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category)
    .replaceAll("/html/", "/")
);
categoryInputs.forEach((input, i) => {
  inputValueChanger.call(input, data.rakutenCategory[i] ?? "");
  input.onfocus = () => (input.value = data.rakutenCategory[i]);
});

selectValueChanger.call(asurakuInput, 1);
asurakuInput.value = 1;
imageUrlInputs.forEach((input) => {
  input.addEventListener("focus", () =>
    inputValueChanger.call(
      input,
      input.value
        .replaceAll(window.location.href.split("/")[8], data.productNumber)
        .replace(/(?<=cabinet\/)\D{4,12}(?=\/)/g, data.category)
    )
  );
});
altInputs.forEach((input) => {
  input.addEventListener("focus", () =>
    inputValueChanger.call(input, data.title)
  );
});

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  // input.dispatchEvent(new Event("focus", { bubbles: true }))
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

//! Rakuten variations

let response = await fetch("http://localhost:8888/milulu");
let data = await response.json();

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
  sizeInputs[i].tabIndex = i + 1;
  sizeCodeInputs[i].tabIndex = i + 1;
  let sizeCode =
    size.length < 3 ? "0" + size.replace("号", "") : size.replace("号", "");
  sizeCode = !size.includes("フリー") ? sizeCode : "fl";

  inputValueChanger.call(sizeInputs[i], size);
  sizeInputs[i].onfocus = () => inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], sizeCode);
  sizeCodeInputs[i].onfocus = () =>
    inputValueChanger.call(sizeCodeInputs[i], sizeCode);
});

data.colors.forEach((color, i) => {
  colorInputs[i].tabIndex = i + 1;
  colorCodeInputs[i].tabIndex = i + 1;
  inputValueChanger.call(colorInputs[i], color);
  colorInputs[i].onfocus = () => inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(
    colorCodeInputs[i],
    data.colorCode[color] ?? "0" + (i + 1)
  );
  colorCodeInputs[i].onfocus = () =>
    inputValueChanger.call(
      colorCodeInputs[i],
      data.colorCode[color] ?? "0" + (i + 1)
    );
});

document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

//! Shoplist multiple image upload

let tbody = document.querySelector("#main > form > table > tbody");
let form = document.querySelector("form");
let formData = new FormData(form);

tbody.querySelectorAll("input[type=file]").forEach((uploadInput) => {
  uploadInput.multiple = true;
  uploadInput.addEventListener("change", () => {
    const files = [...uploadInput.files];
    files.forEach((file, i) => {
      formData.append(`upload_image[${i + 2}]`, file);
    });
  });
});

form.onsubmit = (event) => {
  event.preventDefault();
  document.querySelector('[href="#Submit"]').innerHTML = `アップロード中...`;
  document.querySelector('[href="#Submit"]').style.backgroundColor = `#3338`;
  document.querySelector('[href="#Submit"]').style.cursor = `wait`;
  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      console.log(await res.text());
      if (confirm("アップロード完了!\nウィンドウ閉じる？")) {
        window.close();
      } else {
        document.querySelector('[href="#Submit"]').innerHTML = `登録`;
        document.querySelector(
          '[href="#Submit"]'
        ).style.backgroundColor = `#333`;
        document.querySelector('[href="#Submit"]').style.cursor = `pointer`;
        form.reset();
        formData = new FormData(form);
      }
    })
    .catch((error) => console.error(error));
};

//! SHOPLIST Submit Product

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
document.querySelectorAll("[name='product_sex_type[]']")[1].checked = true;
document.querySelectorAll("[name=stock_type]")[2].checked = true;
document.querySelector("select[name=multi_type]").value = 2;
document.querySelector("[name=stock_name_width]").value = "サイズ";
document.querySelector("[name=stock_name_height]").value = "カラー";
document.querySelector("[name=product_subject_mobile]").value =
  shoplistDescription
    .replace(/\n/g, "")
    .replace(/【/g, "\n<br><br>\n【")
    .replace(/】/g, "】<br>\n") + "\n\n";

if (!/^k/.test(productNumber)) {
  let sizeInput = prompt("Size");

  let sizeHeaders = sizeInput
    .replace(/"/g, "")
    .replace(/\n（/g, "（")
    .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]|ｻ|ｽ|ﾊﾞ)\S+/gu);
  let sizeValues = sizeInput
    .split(sizeHeaders[sizeHeaders.length - 1])[1]
    .match(/(\w|[ａ-ｚ])\S*/giu);

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
  productNumber[0] == "k" ? parseInt(prompt("Images Limit")) : 19;

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

// Shoplist Create Size Description

let sizeInput = prompt("Size");

let sizeHeaders = sizeInput
  .replace(/"/g, "")
  .replace(/\n（/g, "（")
  .match(/(\(|（)*([一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]|ｻ|ｽ|ﾊﾞ)\S+/gu);
let sizeValues = sizeInput
  .split(sizeHeaders[sizeHeaders.length - 1])[1]
  .match(/(\w|[ａ-ｚ])\S*/giu);

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

copy(
  sizeRows
    .map((row) =>
      row
        .map((col, i) =>
          i != 0 ? sizeHeaders[i] + ` ${col}cm` : col + "号<br>\n"
        )
        .join(" / ")
    )
    .join("<br>\n")
    .replace(/\n \/ /g, "\n")
);

//! Shoplist Variation

let response = await fetch("http://localhost:8888/milulu");
let { sizes, colors, productNumber, colorCode } = await response.json();

document
  .querySelectorAll("input[name^=product_axis_width_name]")
  .forEach((size, i) => (size.value = sizes[i] || ""));

document
  .querySelectorAll("input[name^=product_width_child_no]")
  .forEach((size, i) => {
    size.value = sizes[i]?.replaceAll("号", "") || "";
    size.value = size.value.length == 1 ? "0" + size.value : size.value;
    size.value = !sizes[i]?.includes("フリー") ? size.value : "fl";
  });

document
  .querySelectorAll("input[name^=product_axis_height_name]")
  .forEach((color, i) => (color.value = colors[i] || ""));

document
  .querySelectorAll("input[name^=product_height_child_no]")
  .forEach((color, i) => (color.value = colorCode[colors[i]] || ""));

document
  .querySelectorAll("input[name^=color_image_url]")
  .forEach(
    (color, i) =>
      (color.value =
        i < colors.length
          ? `http://img.shop-list.com/res/up/shoplist/shp/milulu/${productNumber}/${productNumber.toLowerCase()}-parts${
              i + 1
            }.jpg`
          : "")
  );

document
  .querySelectorAll("select[name^=product_color_id]")
  .forEach(
    (select, i) =>
      (select.value = [...select.querySelectorAll("option")].filter((option) =>
        option.label?.includes(colors[i] || colors[i].slice(3, 6))
      )[0]?.value)
  ) || "";

//! Shoplist JANCODE

let janObject = {};
let response = await fetch("http://localhost:8888/milulu");
let { shoplistJanCode } = await response.json();
shoplistJanCode = shoplistJanCode.map((jan) => jan.trim());

shoplistJanCode.forEach(
  (jan) => (janObject[jan.split(" ")[0].toLowerCase()] = jan.split(" ")[1])
);
document
  .querySelectorAll("input[name^=jan_code]")
  .forEach(
    (janInput, i) =>
      (janInput.value = String(
        janObject[
          janInput.parentElement.previousElementSibling.innerText.toLowerCase()
        ]
      ).replaceAll(undefined, ""))
  );

//! Shoplist JANCODE(reverse)

let { shoplistJanCode } = await fetch("http://localhost:8888/milulu")
  .then((res) => res.json())
  .then((data) => data);
let janObject = {};
shoplistJanCode.forEach((jan) => {
  const janArray = jan.split(" ");
  if (janArray.length > 2) {
    janObject[jan.split(" ")[2]] = jan.split(" ")[1];
  } else {
    janObject[jan.split(" ")[1]] = jan.split(" ")[0];
  }
});

document
  .querySelectorAll("input[name^=jan_code]")
  .forEach(
    (janInput, i) =>
      (janInput.value = String(
        janObject[janInput.parentElement.parentElement.children[2].innerText]
      ).replaceAll(undefined, ""))
  );

//! Yahoo Submit Product
let response = await fetch("http://localhost:8888/milulu");
let data = await response.json();

let inputs = {
  productNumberInput: document.querySelector("[name=__submit__product_code]"),
  yahooProductNameInput: document.querySelector("[name=__submit__name]"),
  priceInput: document.querySelector("[name=__submit__price]"),
  yahooBrandPriceInput: document.querySelector(
    "[name=__submit__original_price]"
  ),
};
let manageNumberInput = document.querySelector("[name=__submit__code]");
let memberPriceInput = document.querySelector("[name=__submit__member_price]");

let yahooCatchCopyInput = document.querySelector("[name=__submit__headline]");
let descriptionInput = document.querySelector("[name=__submit__explanation]");

let descriptionText =
  descriptionInput.value.split("【")[0] +
  "【カラー】" +
  data.colors.join("／") +
  "\n【サイズ】" +
  data.sizes.join(" ");

descriptionText =
  descriptionText.split("\n\n")[0] +
  "\n\n" +
  data.headline +
  "\n" +
  data.subtitle +
  "\n\n" +
  descriptionText.split("\n\n")[2];

document.querySelector("select[name=__submit__lead_time_outstock]").value = 3;

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

for (input in inputs) {
  inputValueChanger.call(inputs[input], data[input.replace("Input", "")]);
  inputs[input].onfocus = () =>
    (inputs[input].value = data[input.replace("Input", "")]);
}
inputs.productNumberInput.onfocus = () =>
  (inputs.productNumberInput.value = data.productNumber);
inputs.priceInput.onfocus = () => (inputs.priceInput.value = data.price);

document
  .querySelector(
    "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
  )
  .click();
document.querySelector("#LibTree > ul > li > span > span")?.click();
document
  .querySelector("#LibTree > ul > li > ul > li.dynatree-lastsib > span > a")
  ?.click();
document.querySelector("input#Upload1")?.click();

document
  .querySelectorAll(
    "div:nth-child(11) > div:nth-child(6) div.imageListB span.imageListB__photoText"
  )
  .forEach((a, i) => {
    if (i < 19) {
      const number =
        a.parentElement.parentElement.parentElement.parentElement.textContent.match(
          /\d{1,2}/
        );
      setTimeout(() => {
        a.click();
        document
          .querySelector(
            "#LibTree > ul > li > ul > li.dynatree-lastsib > span > a"
          )
          .click();
        [...document.querySelectorAll("[id^=RowList]")]
          .find((row) => row.innerHTML.includes(`sp${number}.jpg`))
          ?.querySelector("input[id^=Upload]")
          ?.click();
      }, i * 800);
    }
  });

setTimeout(() => {
  document
    .querySelector(
      "#react-tabs-1 > div > div:nth-child(11) > div:nth-child(5) > div.uiGridA__gridA2 > div > div > div > ul > li > div > div > a > p > span"
    )
    .click();
  document.querySelector("input#Upload1")?.click();
}, 800 * 20);

textareaValueChanger.call(
  descriptionInput,
  descriptionText.replaceAll(undefined, "")
);
textareaValueChanger.call(yahooCatchCopyInput, data.yahooCatchCopy);

inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(memberPriceInput, data.price - 1);

let searchValue = document.querySelector("#now_page_key").value;
let replaceValue = data.productNumber.toLowerCase();
document
  .querySelectorAll("[type=text]")
  .forEach((input) =>
    inputValueChanger.call(
      input,
      input.value.replaceAll(searchValue, replaceValue)
    )
  );
document
  .querySelectorAll("textarea")
  .forEach((textarea) =>
    textareaValueChanger.call(
      textarea,
      textarea.value.replaceAll(searchValue, replaceValue)
    )
  );

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

//! Yahoo komoku sentaku

document
  .querySelectorAll(
    ".optionSelection__column:first-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    input.addEventListener("focus", () => {
      input.tabIndex = 0;
      inputValueChanger.call(input, data.colors[i - 1]);
    });
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });
document
  .querySelectorAll(
    ".optionSelection__column:last-child [name=optionSelectionItem]"
  )
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    input.addEventListener("focus", () => {
      input.tabIndex = 0;
      inputValueChanger.call(input, data.sizes[i - 1]);
    });
    input.dispatchEvent(new Event("focus", { bubbles: true }));
  });

//! Yahoo variation table

document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input, i) => {
    input.tabIndex = i + 1;
    const yahooSizeCode =
      input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling.innerText.replaceAll(
        "号",
        ""
      );
    let SizeCode =
      yahooSizeCode == "フリー"
        ? "fl"
        : yahooSizeCode.length == 1
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
    textArea.value = `https://shopping.c.yimg.jp/lib/milulu-shop/${
      data.productNumber
    }-parts${i + 1}.jpg`;
    textArea.addEventListener(
      "focus",
      () =>
        (textArea.value = `https://shopping.c.yimg.jp/lib/milulu-shop/${
          data.productNumber
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

//! Yahoo variation table

document
  .querySelectorAll(".stockList td:nth-child(1) span > input")
  .forEach((input, i) => {
    const yahooSizeCode =
      input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        .querySelector("td:nth-child(3)")
        .innerText.replaceAll("号", "");
    let SizeCode =
      yahooSizeCode == "フリー"
        ? "fl"
        : yahooSizeCode.length == 1
        ? "0" + yahooSizeCode
        : yahooSizeCode;
    input.value =
      productNumber +
      SizeCode +
      colorCode[
        input.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".stockList__title"
        ).innerText
      ];
    input.dispatchEvent(new Event("focus"));
  });

document
  .querySelectorAll(".stockList .stockList__tableWrap tr:nth-child(1) textarea")
  .forEach((textArea, i) => {
    textArea.value = `https://shopping.c.yimg.jp/lib/milulu-shop/${productNumber}-parts${
      i + 1
    }.jpg`;
  });

document
  .querySelectorAll(
    ".stockList .stockList__tableWrap tr:nth-child(1) .stockList__tableCellInner--photo input[type=radio], input[type=text], textarea"
  )
  .forEach((radio, i) => (radio.checked = true));

//* Create Page Screenshot

document.querySelector(".floating-cart-wrapper")?.remove();
document.querySelector("#iFixed")?.remove();
document.querySelector("#rakutenLimitedId_header")?.remove();
document.querySelector("#chat_widget")?.remove();
if (document.querySelector("#pagebody > div:nth-child(10)")) {
  document.querySelector("#pagebody > div:nth-child(10)").style.marginLeft =
    -280 ?? "";
}
document
  .querySelectorAll("#pageGallery div dl, #pageSpec > div")
  .forEach(({ style }, i) => {
    style.paddingRight = 1;
    style.marginRight = i % 2 == 1 ? 0 : 1;
    style.paddingBottom = 2;
  });
document.querySelectorAll("img")?.forEach((img) => {
  let filename = img.src.match(/[a-z]{1,2}\d{6}[a-z]{2}\d{1}.+/i);
  img.addEventListener("error", function replaceSrc() {
    img.src = "../images/" + filename;
    img.removeEventListener("error", replaceSrc);
  });
  img.src = img.src;
});

document
  .querySelectorAll("li.up")
  ?.forEach((li) => (li.style.listStyle = "none"));

// Delete images from shoplist

[...document.querySelectorAll("tr")]
  .filter((tr) => /m214044ct0/.test(tr.innerHTML))
  .forEach((tr) => console.log(tr.querySelector('[value="削除"]').click()));

// Amazon select modules
let response = await fetch(`http://localhost:8888/milulu`);
let data = await response.json();

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
