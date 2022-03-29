// Edit KIDS rental Page
(() => {
  let parser = new DOMParser();
  NodeList.prototype.filter = Array.prototype.filter;
  NodeList.prototype.map = Array.prototype.map;
  NodeList.prototype.find = Array.prototype.find;

  let inputValueChanger = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  let textareaValueChanger = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    "value"
  ).set;

  let rentalData = JSON.parse(localStorage.rental)

  let getTextFieldByTitle = (title) =>
    document.querySelectorAll('.rms-form-row').find(row => new RegExp(title).test(row.innerText)).querySelector('textarea, input[type=text]')

  let descriptionInput = getTextFieldByTitle("PC用商品説明文")
  let mobilePageInput = getTextFieldByTitle('スマートフォン用商品説明文')
  let pcPageInput = getTextFieldByTitle('PC用販売説明文')

  textareaValueChanger.call(descriptionInput, descriptionInput.value + "<br>\n" + rentalData.systemCondition)

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  let [productNumber] = window.location.href.split("/").slice(-1)

  let mobilePageValue = parser.parseFromString(mobilePageInput.value, "text/html");
  let firstImg = mobilePageValue.querySelector('[src*="yearsold_tex"]')
  firstImg.parentElement.insertBefore(
    parser.parseFromString(rentalData.spBanners.replace(/<% *productNumber *%>/g, productNumber), "text/html").body,
    firstImg.nextElementSibling
  )

  textareaValueChanger.call(mobilePageInput,
    mobilePageValue.body.innerHTML.replace(/<\/*body>/g, "")
    + "<br>\n" + rentalData.systemCondition
    + "<br><br>\n" + rentalData.spBanners.replace(/<% *productNumber *%>/g, productNumber)
  )

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  let pcPageValue = parser.parseFromString(pcPageInput.value, "text/html");
  let pageCatch = pcPageValue.getElementById("pageCatch")
  let pcBanner = parser.parseFromString(rentalData.pcBanners.replace(/<% *productNumber *%>/g, productNumber), "text/html").body

  pageCatch.parentElement.insertBefore(pcBanner, pageCatch.nextElementSibling)

  textareaValueChanger.call(pcPageInput, pcPageValue.body.innerHTML.replace(/<\/*body>/g, "") + "<br>\n" + rentalData.pcBanners.replace(/<% *productNumber *%>/g, productNumber))

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  document.querySelectorAll('button').find(({ innerText }) => /（4）以降の画像を表示・非表示/.test(innerText))?.click()

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });


  let noUrl = document.querySelectorAll('[name^=url_]').find(({ value }) => !value)
  noUrl.scrollIntoView({ behavior: "smooth" })
  noUrl.onfocus = () => {
    inputValueChanger.call(noUrl, rentalData.slideImage)
    setInterval(function removeSelectionsInterval () {
      if (!document.querySelector('.rms-dd-btn')) clearInterval(removeSelectionsInterval)
      removeSelections()
    }, 1000)
  }
  noUrl.click()

  document.querySelectorAll("[type=text], textarea").forEach((input) => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });

  const removeSelections = () =>
    document.querySelectorAll(".rms-dd-btn").forEach((btn, i) => {
      setTimeout(() => {
        btn.click()
        setTimeout(() => {
          document.querySelectorAll('a').find(({ innerText }) => /削除/.test(innerText)).click()
          setTimeout(() => document.querySelectorAll('button').find(({ innerText }) => /入力画面から削除/.test(innerText)).click(), 100)
        },
        500)
      },
      i * 800
      )
    })
})();