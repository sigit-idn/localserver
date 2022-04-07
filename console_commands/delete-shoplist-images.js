// Delete images from shoplist

let productNumber = prompt("Product Number");
[...document.querySelectorAll("tr")]
  .filter((tr) => new RegExp(productNumber).test(tr.innerHTML))
  .forEach((tr) => tr.querySelector("input[value=\"削除\"]").click());