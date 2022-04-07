// Edit amazon variations

let productNumber = prompt("商品番号を入力してください", document.querySelector('.a-link-normal.mt-link-content.mt-table-main').innerText);

[...document.querySelectorAll('tr')]
.filter(({ innerText }) => innerText.includes(productNumber))
.forEach((tr) => setTimeout(() => tr.querySelector('[data-action="a-splitdropdown-main"]').click(), 1000));

let asinCode = "B09VK9BQ37"

let sleepUntil = (condition, timeout = 300) => new Promise((resolve) => {
  let interval = setInterval(() => {
    if (condition()) {
      clearInterval(interval);
      resolve();
    }
  }, timeout);
});

let asinSearchInput = document.querySelector("#awsui-autosuggest-1")
asinSearchInput.value = asinCode
asinSearchInput.dispatchEvent(new Event('input', { bubbles: true }))
await sleepUntil(() => document.querySelector(`[data-value="${asinCode}"]`))

asinSearchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
  document.querySelector(`[data-value="${asinCode}"`).parentElement.parentElement.parentElement.parentElement.querySelectorAll('*').forEach(e => e.click())
