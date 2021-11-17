fetch("https://item.rakuten.co.jp/milulu/m211004st0/", {
  mode: "no-cors",
})
  .then((res) => res.text())
  .then((data) => data.then((dt) => console.log(dt)));

let ajax = new XMLHttpRequest();

ajax.onload = (event) => console.log(event);
ajax.onerror = (err) => console.log(err);
ajax.onreadystatechange = (event) => console.log(ajax.readyState);

ajax.open("GET", "https://item.rakuten.co.jp/milulu/m211004st0/", false);
