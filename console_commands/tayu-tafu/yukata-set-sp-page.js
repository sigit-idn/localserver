// Set Yukata SP Page

let { data } = await (await fetch('http://localhost:8888/yukata-set')).json();
let productNumber = window.location.href.split("/").pop();
let productType = Object.keys(data).find(key => data[key] === productNumber).toLocaleLowerCase().replace(/\d/g, '');

let moreButton = document.querySelector("#root > div.rms-layout > main > div.rms-content > div:nth-child(2) > div:nth-child(8) > div:nth-child(3) > div.rms-columns > div > div > button")
moreButton.scrollIntoView({ behavior: "smooth", block: "center" });
moreButton.click();
NodeList.prototype.find = Array.prototype.find;
let images = [
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-text.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-set.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-c_1.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-c_2.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-c_3.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t1-2.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t3-4.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t5-6.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t7-8.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t9-10.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t11-12.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t13-14.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t15-16.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t17-18.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-t19-20.jpg",
  "https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-s.jpg",
]

let inputValueChanger = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let textareaValueChanger = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;

let getTextFieldByTitle = (title) =>
document.querySelectorAll('.rms-form-row').find(row => new RegExp(title).test(row.innerText)).querySelector('textarea, input[type=text]')

let mobileCatchCopyInput = document.querySelector("[name=mobile_catch_copy]");

let mobilePageInput = getTextFieldByTitle('スマートフォン用商品説明文')

let tabIndex = 1;

let mobilePageImages = `

<br>
<a href="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-theme.jpg" target="_blank"><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-theme.jpg" width="100%"></a><br><br>
<a href="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-set.jpg" target="_blank"><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-set.jpg" width="100%"></a><br><br>


<table width="100%" cellspacing="0" cellpadding="0">
<tr><td height="30"></td></tr>
<tr><td><a href="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/202/202plus2/<<product_number>>-sp-pt.png" target="_blank"><img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/202/202plus2/<<product_number>>-sp-pt.png" width="100%"></a></td></tr>
<tr><td height="30"></td></tr>
<tr><td><a href="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/sp-v-${productType}.jpg" target="_blank"><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/sp-v-${productType}.jpg" width="100%"></a></td></tr>
<tr><td height="30"></td></tr>

</table>

<hr size="1" color="#BBB">
<p><font color="#555">▼ <b>カラーバリエーション</b></font></p>
<hr size="1" color="#BBB">
<a href="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-c.jpg" target="_blank"><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-c.jpg" width="100%"></a>
<br><br>

<a href="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-s.jpg" target="_blank"><img src="https://image.rakuten.co.jp/tayu-tafu/cabinet/202plus2/<<product_number>>-sp-s.jpg" width="100%"></a>
<br>

`

let mobilePageInputValue = mobilePageInput.value
.replace(/<img.+m1[^^]+/, mobilePageImages.replace(/<<product_number>>/g, productNumber));


textareaValueChanger.call(mobilePageInput, mobilePageInputValue)

mobilePageInput.dispatchEvent(new Event('input', { bubbles: true }));

document.querySelectorAll('[name^="url"]').forEach((input, i) => {
  input.tabIndex = tabIndex++;
  input.onfocus = () =>{
    inputValueChanger.call(input, images[i]?.replace(/<<product_number>>/g, productNumber) ?? "");
    
    input.dispatchEvent(new Event("input"));
  }
});

document.querySelectorAll("[name^=alt]").forEach((input, i) => {
  input.tabIndex = tabIndex++;
  input.onfocus = () =>{
    inputValueChanger.call(input, mobileCatchCopyInput.value);
    
    input.dispatchEvent(new Event("input"));
  }
});
