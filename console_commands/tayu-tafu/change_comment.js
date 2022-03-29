// yukata set change comment

let descriptionInput = document.querySelector("#descriptionLong");
let productNumber = descriptionInput.value.match(/\d{3}-\d{4}/)[0];

let iframeCss = (await (await fetch(`http://localhost:8888/iframe_heights_data`)).json())[productNumber];

descriptionInput.value = descriptionInput.value.replace(
  /<ifram.+shot.+/, `<img src="https://www.rakuten.ne.jp/gold/tayu-tafu/img/page/202/202plus/${productNumber}-sp-pt.jpg" />`)
  .replace(/(<\/style)/, `${iframeCss}$1`)
  .replace(/<style> #spec iframe.+/, "")
  .replace(/(<style) media="(screen and \(min-width: 768px\))">/, "$1>\n@media $2{")
  .replace(/}/, "}\n}");