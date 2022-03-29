let productNumber = prompt("商品番号を入力してください", 
  document.querySelector('#folder1:nth-of-type(5) option:last-of-type').innerText)

document.querySelectorAll('tr').forEach(tr => {
  const checkbox = tr.querySelector('[type="checkbox"]')
  if (!checkbox || !tr.innerText.includes(productNumber)) return

  checkbox.checked = true
  checkbox.dispatchEvent(new Event('change'))
  }
)