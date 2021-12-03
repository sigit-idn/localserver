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
    input.addEventListener("focus", () =>
      inputValueChanger.call(
        input,
        input.value.replaceAll(searchValue, replaceValues[i])
      )
    );
  });
  document.querySelectorAll("textarea").forEach((textarea) => {
    textareaValueChanger.call(
      textarea,
      textarea.value.replaceAll(searchValue, replaceValues[i])
    );
    textarea.addEventListener("focus", () =>
      textareaValueChanger.call(
        textarea,
        textarea.value.replaceAll(searchValue, replaceValues[i])
      )
    );
  });
});

document.querySelectorAll("input, textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

//! Search and Replace Only

let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;
let searchValues = [
  window.location.href.split("/")[8],
  prompt("Search").split(";"),
];
let replaceValues = [data.productNumber, prompt("Replace").split(";")];

searchValues.forEach((searchValue, i) => {
  document
    .querySelectorAll("[type=text]")
    .forEach((input) =>
      inputValueChanger.call(
        input,
        input.value.replaceAll(searchValue, replaceValues[i])
      )
    );
  document
    .querySelectorAll("textarea")
    .forEach((textarea) =>
      textareaValueChanger.call(
        textarea,
        textarea.value.replaceAll(searchValue, replaceValues[i])
      )
    );
});

document
  .querySelectorAll("input, textare")
  .forEach((input) =>
    input.dispatchEvent(new Event("input", { bubbles: true }))
  );

//! watmos pass data

let data = await fetch(
  "https://script.google.com/macros/s/AKfycbyxfqTB5rnnuxaDwmONtAkyGAuml3Ci_xANO40ZJFdfGpQiyiEYc9CNuG57EDTbzEHp/exec"
)
  .then((res) => res.json())
  .then((data) => data);

fetch("http://localhost:8888/watmos", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then((res) => console.log("Written succesfuly", res))
  .catch((error) => console.log("Error", error));

//! watmos pass data & Rakuten product submit

let response = await fetch(
  "https://script.google.com/macros/s/AKfycbyxfqTB5rnnuxaDwmONtAkyGAuml3Ci_xANO40ZJFdfGpQiyiEYc9CNuG57EDTbzEHp/exec"
);
let data = await response.json();

fetch("http://localhost:8888/watmos", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then((res) => console.log("Written succesfuly", res))
  .catch((error) => console.log("Error", error));

let spPage = `
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-top.jpg" width="100%"><br>
<font>${data.topDescription}</font>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-d.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-d.jpg" width="100%"></a>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-p.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-p.jpg" width="100%"></a>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-c.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-c.jpg" width="100%"></a>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-s.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-s.jpg" width="100%"></a>

<br><br>
<img src="https://www.rakuten.ne.jp/gold/watmosphere/img/banner/kobo_title.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio1_2.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio2_2.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio3_2.jpg" width="100%"><br>

<br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/present.jpg" width="100%">
<br>
`;

let rakutenDescription =
  data.topDescription +
  "<br><br>" +
  data.specs
    .map(
      (spec) =>
        spec[0].trim() +
        "<br>" +
        spec[1].trim().replaceAll("\n", "<br>\n") +
        "<br><br>\n\n"
    )
    .join("\n");

let pcPage = `
<style>
#rakutenLimitedId_aroundCart tr tr tr:nth-child(2) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v1.jpg);
}
#rakutenLimitedId_aroundCart tr tr tr:nth-child(3) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v2.jpg);
}
#rakutenLimitedId_aroundCart tr tr tr:nth-child(4) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v3.jpg);
}

#rakutenLimitedId_aroundCart tr tr tr:not(:first-child) .inventory_choice_name span:before {
content: "";
display: block;
width: 100px;
height: 100px;
background-size: 100px;
margin-bottom: 4px;
}
</style>
<!-- カラー縦横画像終了　-->

<div id="pageCatch">
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-top.jpg" width="100%"></dt>
<dd>${data.topDescription}</dd>
</dl>
</div>
<!-- c１画像とコメント終了　-->
<div id="pageDetail">
<p class="pHead">ディテール</p>
<div>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-d1.jpg"></dt>
<dd>${data.details[0][0]}</dd>
</dl>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-d2.jpg"></dt>
<dd>${data.details[0][2]}</dd>
</dl>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-d3.jpg"></dt>
<dd>${data.details[1][0]}</dd>
</dl>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-d4.jpg"></dt>
<dd>${data.details[1][2]}</dd>
</dl>
</div>
</div>

<!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->


<div id="pageGallery">
<p class="pHead">フォトギャラリー</p>
<div>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-p1.jpg"></dt>
<dd><b>1</b><u>${data.photoTitle}</u><span>${
  data.photoDescription
}</span><a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-p1.jpg">大きい写真を見る</a></dd>
</dl>
</div>
</div>
<!-- フォトギャラリー終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->


<div id="pageVariation">
<p class="pHead">カラーバリエーション</p>
<div>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v1.jpg"></dt>
<dd><span>${data.colors[0]}</span></dd>
</dl>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v2.jpg"></dt>
<dd><span>${data.colors[1]}</span></dd>
</dl>
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v3.jpg"></dt>
<dd><span>${data.colors[2]}</span></dd>
</dl>
</div>
</div>
<!-- カラバリ終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->

<div id="pageSpec">
<p class="pHead">商品の詳細</p>
<div>
${data.specs
  .map(
    (spec) => `
<dl>
<dt>${spec[0]}</dt>
<dd>${spec[1].trim().replaceAll("\n", "<br>\n")}</dd>
</dl>
`
  )
  .join("\n")}

</div>
</div>

<div id="pageDetail">
<p class="pHead">工房風景</p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio1_2.jpg" width="100%"></p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio2_2.jpg" width="100%"></p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio3_2.jpg" width="100%"></p>


<!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->

</div>

<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/present.jpg" width="100%"></p>
`;

let manageNumberInput = document.querySelector("[name=itemManageNumber]");
let productNumberInput = document.querySelector("[name=itemNumber]");
let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");
let rakutenDescriptionInput = document.querySelector(
  "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(8) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
);

let mobilePageInput = [...document.querySelectorAll("textarea")].find(
  (textArea) => textArea.value.includes("<!-- sp -->")
);
let pcPageInput = [...document.querySelectorAll("textarea")].find((textArea) =>
  textArea.value.includes("<!-- pc -->")
);

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = [...document.querySelectorAll("input")].filter((input) =>
  input.name.includes("url_")
);
let altInputs = [...document.querySelectorAll("input")].filter((input) =>
  input.name.includes("alt_")
);

let selectValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype,
  "value"
).set;
let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(productNumberInput, data.productNumber);
textareaValueChanger.call(productNameInput, data.rakutenProductName);
textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy);
textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy);
inputValueChanger.call(priceInput, data.price);
textareaValueChanger.call(mobilePageInput, "<!-- sp -->\n" + spPage);
textareaValueChanger.call(pcPageInput, "<!-- pc -->\n" + pcPage);
textareaValueChanger.call(rakutenDescriptionInput, rakutenDescription);

imageUrlInputs.forEach((input) =>
  inputValueChanger.call(
    input,
    input.value.replaceAll(
      window.location.href.split("/")[8],
      data.productNumber
    )
  )
);
altInputs.forEach((input) => inputValueChanger.call(input, data.title));

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

//! Rakuten SIMPLE product submit

let response = await fetch(
  "https://script.google.com/macros/s/AKfycbyxfqTB5rnnuxaDwmONtAkyGAuml3Ci_xANO40ZJFdfGpQiyiEYc9CNuG57EDTbzEHp/exec"
);
let data = await response.json();

data.productNumber = data.productNumber.replace(" ", "");

let spPage = `
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-top.jpg" width="100%"><br>
<font>${data.topDescription}</font>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-2.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-2.jpg" width="100%"></a>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-3.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-3.jpg" width="100%"></a>
<br><br>
<a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-s.jpg" target="_blank">
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-sp-s.jpg" width="100%"></a>

<br><br>
<img src="https://www.rakuten.ne.jp/gold/watmosphere/img/banner/kobo_title.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio1_2.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio2_2.jpg" width="100%"><br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio3_2.jpg" width="100%"><br>

<br>
<img src="https://image.rakuten.co.jp/watmosphere/cabinet/present.jpg" width="100%">
<br>
`;

let rakutenDescription =
  data.topDescription +
  "\n<br><br>" +
  data.specs
    .map(
      (spec) =>
        spec[0].trim() +
        "<br>" +
        spec[1].toLowerCase().trim().replaceAll("\n", "<br>\n") +
        "<br><br>\n"
    )
    .join("\n");

let pcPage = `
<style>
#rakutenLimitedId_aroundCart tr tr tr:nth-child(2) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v1.jpg);
}
#rakutenLimitedId_aroundCart tr tr tr:nth-child(3) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v2.jpg);
}
#rakutenLimitedId_aroundCart tr tr tr:nth-child(4) .inventory_choice_name span:before {
background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${
  data.productNumber
}/${data.productNumber}-v3.jpg);
}

#rakutenLimitedId_aroundCart tr tr tr:not(:first-child) .inventory_choice_name span:before {
content: "";
display: block;
width: 100px;
height: 100px;
background-size: 100px;
margin-bottom: 4px;
}
</style>
<!-- カラー縦横画像終了　-->

<div id="pageCatch">
<dl>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-top.jpg" width="100%"></dt>
<dd>${data.topDescription}</dd>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-2.jpg" width="100%"></dt>
<dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w/${data.productNumber.toLowerCase()}-3.jpg" width="100%"></dt>
</dl>
</div>
<!-- c１画像とコメント終了　-->

<!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->



<div id="pageSpec">
<p class="pHead">商品の詳細</p>
<div>
${data.specs
  .map(
    (spec) => `
<dl>
<dt>${spec[0]}</dt>
<dd>${spec[1].replace(" ", "").trim().replaceAll("\n", "<br>\n")}</dd>
</dl>
`
  )
  .join("\n")}

</div>
</div>

<div id="pageDetail">
<p class="pHead">工房風景</p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio1_2.jpg" width="100%"></p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio2_2.jpg" width="100%"></p>
<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio3_2.jpg" width="100%"></p>


<!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->

</div>

<p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/present.jpg" width="100%"></p>
`;

let manageNumberInput = document.querySelector("[name=itemManageNumber]");
let productNumberInput = document.querySelector("[name=itemNumber]");
let productNameInput = document.querySelector("[name=item_name]");
let catchCopyInput = document.querySelector("[name=catch_copy]");
let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");
let priceInput = document.querySelector("#salesPrice");
let rakutenDescriptionInput = document.querySelector(
  "#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(8) > div.rms-form.form-border.form-full > div:nth-child(1) > div.rms-form-col.rms-col-20 > div > div > div > textarea"
);

let mobilePageInput = [...document.querySelectorAll("textarea")].find(
  (textArea) => textArea.value.includes("<!-- sp -->")
);
let pcPageInput = [...document.querySelectorAll("textarea")].find((textArea) =>
  textArea.value.includes("<!-- pc -->")
);

let asurakuInput = document.querySelector("select[name=asuraku]");

let imageUrlInputs = [...document.querySelectorAll("input")].filter((input) =>
  input.name.includes("url_")
);
let altInputs = [...document.querySelectorAll("input")].filter((input) =>
  input.name.includes("alt_")
);

let selectValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLSelectElement.prototype,
  "value"
).set;
let inputValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(
  window.HTMLTextAreaElement.prototype,
  "value"
).set;

inputValueChanger.call(manageNumberInput, data.productNumber);
inputValueChanger.call(productNumberInput, data.productNumber);
textareaValueChanger.call(productNameInput, data.rakutenProductName);
textareaValueChanger.call(catchCopyInput, data.rakutenCatchCopy);
textareaValueChanger.call(mobileCatchCopyInput, data.rakutenMobileCatchCopy);
inputValueChanger.call(priceInput, data.price);
textareaValueChanger.call(mobilePageInput, "<!-- sp -->\n" + spPage);
textareaValueChanger.call(pcPageInput, "<!-- pc -->\n" + pcPage);
textareaValueChanger.call(rakutenDescriptionInput, rakutenDescription);

imageUrlInputs.forEach((input) =>
  inputValueChanger.call(
    input,
    input.value.replaceAll(
      window.location.href.split("/")[8],
      data.productNumber.toLowerCase()
    )
  )
);
altInputs.forEach((input) => inputValueChanger.call(input, data.title));

document.querySelectorAll("[type=text], textarea").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

//! Rakuten variations no sizes

let response = await fetch("http://localhost:8888/watmos");
let data = await response.json();

data.colors = data.colors.map((color) => color[0]);

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

data.colors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], "Y0" + (i + 1));
});

inputValueChanger.call(sizeInputs[0], "-");
inputValueChanger.call(sizeCodeInputs[0], "X01");

document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

//! watmos Rakuten variations with sizes

let response = await fetch("http://localhost:8888/watmos");
let data = await response.json();

data.colors = data.colors.map((color) => color[0]);

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

data.colors.forEach((color, i) => {
  inputValueChanger.call(colorInputs[i], color);
  inputValueChanger.call(colorCodeInputs[i], "Y0" + (i + 1));
});

data.sizes.forEach((size, i) => {
  inputValueChanger.call(sizeInputs[i], size);
  inputValueChanger.call(sizeCodeInputs[i], "X0" + (i + 1));
});

document.querySelectorAll("input").forEach((input) => {
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.dispatchEvent(new Event("focus", { bubbles: true }));
});

//* TayuTafu Yahoo Add wash banner airkaoru

document.querySelector(
  "#react-tabs-3 div:nth-child(1) > div:nth-child(3) div li:nth-child(1) span > textarea"
).value += `
<p style="margin:40px 0;"><img src="https://shopping.geocities.jp/tayu-tafu/img/phone/banner/airkaol_sentaku.jpg" width="100%"></p>
<p style="margin:40px 0;"><img src="https://shopping.geocities.jp/tayu-tafu/img/phone/banner/airkaol_hoshikata.jpg" width="100%"></p>
`;

document.querySelector(
  "#react-tabs-3 div:nth-child(1) > div:nth-child(5) > div.uiGridA__gridA2 div li:nth-child(2) span > textarea"
).value += `
<table>
<tr><td><img src="https://shopping.geocities.jp/tayu-tafu/img/phone/banner/airkaol_sentaku.jpg" width="100%"></td></tr>
<tr><td height="10"></td></tr>
<tr><td><img src="https://shopping.geocities.jp/tayu-tafu/img/phone/banner/airkaol_hoshikata.jpg" width="100%"></td></tr>
</table>
`;

// ******

document.querySelectorAll("[name^=url]").forEach((input, i) => {
  const [productNumber] = window.location.href.match(/(?<=edit\/)\w+/);
  const values = [
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_text.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_sp_2.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_size.jpg`,
    `https://www.rakuten.ne.jp/gold/watmosphere/img/banner/kodomo_music.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d${
      i - 3
    }.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d${
      i - 3
    }.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d${
      i - 3
    }.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d${
      i - 3
    }.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d${
      i - 3
    }.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/may0${i - 8}.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/may0${i - 8}.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/may0${i - 8}.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/may0${i - 8}.jpg`,
    `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_sp_s.jpg`,
  ];

  input.onfocus = () => (input.value = values[i] || input.value);

  input.focus();
});

//****** */

let [productNumber] = window.location.href.match(/(?<=watmosphere.*)\w+/);

let srcs = [
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_1.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_2.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_size.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d1.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d2.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d3.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d4.jpg`,
  `https://image.rakuten.co.jp/watmosphere/cabinet/tkn/${productNumber}_d5.jpg`,
];

document
  .querySelectorAll(
    `
  #pageCatch2 > dl > dt:nth-child(1) > img,
  #pageCatch2 > dl > dt:nth-child(3) > img,
  #pageCatch2 > dl > dt:nth-child(5) > img,
  #pageDetail2 > p:nth-child(2) > img,
  #pageDetail2 > p:nth-child(3) > img,
  #pageDetail2 > p:nth-child(4) > img,
  #pageDetail2 > p:nth-child(5) > img,
  #pageDetail2 > p:nth-child(6) > img`
  )
  .forEach((img, i) => (img.src = srcs[i]));
document.querySelector("#pageSpec > div > dl:nth-child(1) > dd").innerHTML =
  productNumber.toUpperCase();
document.querySelector("#pageSpec > div > dl:nth-child(3) > dd").innerHTML =
  "約3.5kg";

copy(document.querySelector("span.sale_desc").innerHTML);
document.body.focus();

// setTimeout(()=> {navigator.clipboard.writeText(document.querySelector("span.sale_desc").innerHTML)}, 3000)

// Amazon Pass Data
NodeList.prototype.map = Array.prototype.map;
let skus = document
  .querySelectorAll("[id$=sku-sku] a")
  .map((element) => element.innerHTML.match(/\S.+\S/)[0]);
let titles = document
  .querySelectorAll("[id$=title-title] a")
  .map((element) => element.innerHTML.match(/\S.+\S/)[0]);
let prices = document
  .querySelectorAll("[id$=price-price] input")
  .map((element) => element.value.match(/\d+/g)?.join(""));
let quantity = document
  .querySelectorAll("[id$=quantity-quantity].mt-popover")
  .map((element) => element.innerText.match(/\d+/g)?.join(""));

  quantity = quantity.length ? quantity : document
  .querySelectorAll("[id$=quantity-quantity]")
  .map((element) => element.innerText.match(/\d+/g)?.join(""));

fetch("http://localhost:8888/watmos-style", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify({ skus, titles, prices, quantity }),
})
  .then((res) => console.log("Written succesfuly", res))
  .catch((error) => console.log("Error", error));

// Amazon Append variations
document.querySelector("#variations-link").click();
NodeList.prototype.map = Array.prototype.map;

let data = await (await fetch("http://localhost:8888/watmos-style")).json();

let colors = document
  .querySelectorAll("[id^=color_name-gio]")
  .map((element) => element.innerHTML.match(/\S.+\S/)?.[0]);
let colorMaps = document
  .querySelectorAll("[id^=color_map-gio]")
  .map((parent) => parent?.shadowRoot.querySelector("input[id^=katal-id]"))
  .map((element) => element.value.match(/\S.+\S/)?.[0]);
let quantity = data.quantity.length ? data.quantity : document
  .querySelectorAll("[id^=quantity-gio]")
  .map((parent) => parent?.shadowRoot.querySelector("input[id^=katal-id]"))
  .map((element) => element.value.match(/\d+/)?.[0]);

fetch("http://localhost:8888/watmos-style", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify({ ...data, colors, colorMaps, quantity }),
})
  .then((res) => console.log("Written succesfuly", res))
  .catch((error) => console.log("Error", error));

// Amazon Append Descriptions
document.querySelector("#tang_description-link").click();
document.querySelector("#tang_keywords-link").click();
NodeList.prototype.map = Array.prototype.map;

let data = await (await fetch("http://localhost:8888/watmos-style")).json();

let productDescription = document
  .querySelector("#product_description")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let bulletPoint1 = document
  .querySelector("#bullet_point1")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let bulletPoint2 = document
  .querySelector("#bullet_point2")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let bulletPoint3 = document
  .querySelector("#bullet_point3")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let bulletPoint4 = document
  .querySelector("#bullet_point4")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let bulletPoint5 = document
  .querySelector("#bullet_point5")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;
let genericKeywords = document
  .querySelector("#generic_keywords")
  ?.shadowRoot.querySelector("[id^=katal-id]").value;

if (data.descriptions) {
  data.descriptions.push({
    productDescription,
    bulletPoint1,
    bulletPoint2,
    bulletPoint3,
    bulletPoint4,
    bulletPoint5,
    genericKeywords,
  });
} else {
  data.descriptions = [
    {
      productDescription,
      bulletPoint1,
      bulletPoint2,
      bulletPoint3,
      bulletPoint4,
      bulletPoint5,
      genericKeywords,
    },
  ];
}

fetch("http://localhost:8888/watmos-style", {
  method: "POST",
  "Content-Type": "application/json",
  body: JSON.stringify(data),
})
  .then((res) => console.log("Written succesfuly", res))
  .catch((error) => console.log("Error", error));
