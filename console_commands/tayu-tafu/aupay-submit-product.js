// Aupay SUBMIT Product
let data = await (await fetch(`http://localhost:8888/tayutafu`)).json()

document.querySelector("#productCd_ctl").value                                     = data.itemNumber;
document.querySelector("#productName_ctl").value                                   = data.itemName;
document.querySelector("#sellPrice").value                                         = data.priceNoTax;
document.querySelector("#alterstock > dl:nth-child(1) > dd").style.backgroundColor = "#ff0"
let                    countChars                                                  = () => {
  const target                       = document.querySelector("#_main_frm > div:nth-child(20) > dl:nth-child(1) > dd > div.wm-input-comment")
  const { length }                   = document.querySelector("#productExplnCmn_ctl").value
        target.style.backgroundColor = length > 512 ? "#ff0" : "transparent"
        target.innerHTML             = 
    `全角512文字（半角1,024文字）以内<br />
  ※使用できるHTMLタグ： &lt;br&gt;　&lt;center&gt;　&lt;font&gt;　&lt;hr&gt;　&lt;a&gt;
  <h5 style="color: #000">${length}</h5>`
}
document.querySelector("#productExplnCmn_ctl").addEventListener('input', countChars)
document.querySelector("#productExplnCmn_ctl").value = 
  data.description.replaceAll("\n", "<br>\n");
document.querySelectorAll("input[name*=productBuyOptTitle]")
  .forEach(
    (dropdownItem, i) => 
    (dropdownItem.value = data.selection[i]
      ? Object.keys(data.selection[i])
      : null)
  );
document.querySelectorAll("textarea[name*=productBuyOptChoices]")
  .forEach(
    (dropdownItem, i) => 
    (dropdownItem.value = data.selection[i]
      ? data.selection[i][Object.keys(data.selection[i])].join("\n")
      : null)
  );

let oldProductNumber = document.querySelector('#productExplnSp_ctl').value.match(/\d{3}-\d{4}/) ?? prompt("Old Product Number")

let {data: setData} = await (await fetch(`http://localhost:8888/yukata-set`)).json()

let productType = Object.keys(setData).find(key => setData[key] === data.itemNumber).toLocaleLowerCase().replace(/\d/g, '');

document.querySelectorAll('[type=text], textarea').forEach(input => 
  input.value = input.value
  .replaceAll(oldProductNumber, data.itemNumber)
  .replace(/(v-)(cj|itg|fg)/, "$1" + productType)
  );

document.querySelectorAll('input[name*=productImgUrl]')
  .forEach((imageUrl, i) => imageUrl.value = imageUrl.value.replaceAll(oldProductNumber, data.itemNumber));

countChars()
