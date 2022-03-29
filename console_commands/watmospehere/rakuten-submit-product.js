//! Rakuten SUBMIT Product
let data = {};
(async () => {
  data = await (await fetch(`http://localhost:8888/watmos`)).json();

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

  let pcPageValue = `<style>
${data.colors?.map((_, i) =>
    ` #rakutenLimitedId_aroundCart tr tr tr:nth-child(${i + 2}) .inventory_choice_name span:before {
      background-image: url(https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-${ /^33\d/.test(data.productNumber) ? "d" : "v" }${i + 1}.jpg);
      }`
  ).join("\n")
    }

  #rakutenLimitedId_aroundCart tr tr tr:not(:first-child) .inventory_choice_name span:before {
  content: "";
  display: block;
  width: 100px;
  height: 100px;
  background-size: 100px;
  background-position: center;
  margin-bottom: 4px;
  }

.caution {
  border: 1px solid #f00;
  padding: 10px;
  color: #f00;
  margin-bottom: 50px;
}

.caution strong {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  color: inherit;
}

  </style>
  <!-- カラー縦横画像終了　-->
  
  <div id="pageCatch${data.title ? 2 : ""}">
  <dl>
  <dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-top.jpg" width="100%"></dt>
  <dd>
  ${data.title ? `<h1>${data.title}</h1>` : ""}
  ${data.description}
  </dd>
  </dl>
  </div>

  ${data.caution ? `<p class="caution">
      <strong>注意書き</strong>
      ${data.caution}
      </p>` : ""
    }

  
  <!-- c１画像とコメント終了　-->
${ 
  /^33\d/.test(data.productNumber) ? `<div>
  <h2 class="pHead">ディティール</h2>
  ${
    data.colors.map((color, i) => (`<div class="color-detail">
  <div class="color-detail__header">
    <div class="color-detail__title top-right">
      ${color}
    </div>
    <img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{3}/)?.[0]}/${data.productNumber}-d${i+1}.jpg">
  </div>
  <ul class="color-detail__content">
    <li class="color-detail__image">
      <img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{3}/)?.[0]}/${data.productNumber}-d${i+1}-1.jpg">
    </li>
    <li class="color-detail__image">
      <img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{3}/)?.[0]}/${data.productNumber}-d${i+1}-2.jpg">
    </li>
    <li class="color-detail__image">
      <img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{3}/)?.[0]}/${data.productNumber}-d${i+1}-3.jpg">
    </li>
    <li class="color-detail__image">
      <img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{3}/)?.[0]}/${data.productNumber}-d${i+1}-4.jpg">
    </li>
  </ul>
  </div>
  `)).join("\n")
  }
</div>`
:
  `<div id="pageDetail">
  <p class="pHead">ディテール</p>
  <div>
  ${data.details?.map((detail, i) =>
      `<dl>
      <dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-d${i + 1}.jpg"></dt>
      <dd>${detail}</dd>
      </dl>`
    ).join("\n")
    }
  </div>
  </div>`
}
  
  <!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->
  
  ${
    data.galleries ? `<div id="pageGallery">
  <p class="pHead">フォトギャラリー</p>
  <div>
  ${data.galleries?.map((gallery, i) =>
      `<dl>
      <dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-p${i + 1}.jpg"></dt>
      <dd><b>${i + 1}</b>
        <u>${Array.isArray(gallery) ? gallery[0] : gallery}</u>
        <span>${Array.isArray(gallery) ? gallery[1] : ""}</span>
        <a href="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-p${i + 1}.jpg">大きい写真を見る</a></dd>    
      </dl>`
    ).join("\n")
    }
  </div>
  </div>
  ` : ""
  }

  <div id="pageDetail">
  <p class="pHead">カラーバリエーション</p>
  <div>
  ${data.colors?.map((color, i) =>
      `<dl>
      <dt><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/${data.productNumber.match(/\d{0,2}\w+/i)[0].toLowerCase()}/${data.productNumber.toLowerCase()}-v${i + 1}.jpg"></dt>
      <dd>${color}</dd>
      </dl>`
    ).join("\n")
    }
  </div>
  </div>
  

  <!-- カラバリ終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->
  
  <div id="pageSpec">
  <p class="pHead">素材</p>
  <div>

  ${Object.keys(data.specs)?.map((key) =>
      `<dl>
      <dt>${key}</dt>
      <dd>${data.specs[key]}</dd>
      </dl>`
    ).join("\n")
    }
    
  </div>
  </div>

  ${ !/ai/i.test(data.productNumber) ? `<div id="pageDetail">
  <p class="pHead">工房風景</p>
  <p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio1_2.jpg" width="100%"></p>
  <p style="margin-top:50px;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio2_2.jpg" width="100%"></p>
  <p style="margin:50px 0;"><img src="https://image.rakuten.co.jp/watmosphere/cabinet/page/22w260/22w260-studio3_2.jpg" width="100%"></p>
  
  <div><img src="https://image.rakuten.co.jp/watmosphere/cabinet/present.jpg" width="100%"></div>
  
  <!-- ディテール終了　増やしたい時は、<dl>～</dl>コピーして増やす</div>の中に入れる。　-->
  
  </div>
  ` : ""
  }
`

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

  textareaValueChanger.call(descriptionInput,
    data.description + "<br><br>\n" +
    Object.keys(data.specs).map((key) => key + ": " + data.specs[key].replace(/<br>/g, "／")).join("<br>\n")
  )

  textareaValueChanger.call(
    mobilePageInput,
    mobilePageInput.value
      .replaceAll(window.location.href.match(/(\w|-)+$/g)?.[0], data.productNumber.toLowerCase())
      .replace(/(?<=<font>)(.|\n)+(?=<\/font>)/, data.description)
  );

  textareaValueChanger.call(pcPageInput, pcPageValue);

  categoryInputs.forEach((input, i) => {
    inputValueChanger.call(input, data.rakutenCategory?.[i] ?? "");
    input.onfocus = () => (input.value = data.rakutenCategory?.[i]);
  });

  selectValueChanger.call(asurakuInput, 1);
  asurakuInput.value = 1;
  imageUrlInputs.forEach((input) => {
    input.addEventListener("focus", () =>
      inputValueChanger.call(
        input,
        input.value
          .replaceAll(window.location.href.match(/(\w|-)+$/)?.[0], data.productNumber.toLowerCase())
      )
    );
  });
  altInputs.forEach((input) =>
    input.onfocus =
    inputValueChanger.call(input, data.rakutenMobileCatchCopy)
  );

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  [priceInput, getTextFieldByTitle("表示先カテゴリ"), document.querySelector('[name="asuraku"]')]
    .forEach((element) => { if (element) element.style.backgroundColor = "#ff0" });
})()