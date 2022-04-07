//! Create COORDINATE

let innerCopy = copy
let data = await(await fetch(`http://localhost:8888/milulu`)).json();

let categories = {
  bl: "tops",
  op: "onepiece",
  sk: "bottom",
  st: "suit",
  pt: "bottom",
  jk: "tops",
  ct: "tops",
};

let coordinateInput = prompt("Coordinate");
data.coordinateUrls = coordinateInput.match(/http\S+/g);
let coordinateTexts = coordinateInput
  .replace(/(.*コーディネート|http|タイトル)\S*/g, "")
  .match(/\S{6,}/g);
data.coordinateSubtitles = coordinateTexts.filter((_, i) => i % 4 < 2);
data.coordinateTitles = coordinateTexts.filter((_, i) => i % 4 >= 2);
document.querySelector(".productArea").innerHTML = "";

let coordinateItems = data.coordinateUrls.map((url, i, arr) => {
  setTimeout(async () => {
    let coordinateNumber = url.split("/")[4];
    try {
      const { thumbnail } = await (await fetch("http://localhost:8888/scrape/" + coordinateNumber)).json();

      let coordinateCategory =
        data.productNumber[0] == "k"
          ? "accessories"
          : categories[coordinateNumber.match(/(?<=\d)[a-z]{2,3}/i)];
      document.querySelector(".productArea").innerHTML += `
    <a href="${url}" target="_blank"><!-- ← 商品URL指定欄 -->	
    <div class="rw-coBanner">
		<p><img src="https://image.rakuten.co.jp/milulu/cabinet/${data.category}/${data.productNumber
        }-co_${i + 1}.jpg"></p>	
	<div>	
		<ul>
    <li><p><img src="${thumbnail ??
        `https://image.rakuten.co.jp/milulu/cabinet/${coordinateCategory}/${coordinateNumber}-thumbnail.jpg`
        }"></p>
				<p><s>${data.coordinateSubtitles[i]}
				</s><!-- ← 小タイトル（s～s 消してもOK） -->
				${data.coordinateTitles[i]}
        </p><!-- ← 大タイトル -->
        </li>
        <li><span>モデル着用アイテムはこちら</span></li>
        <li><!-- ここは空欄・消さないで下さい --></li>
        </ul>
        </div>
        </div>
        </a>
        `;

      if (i >= arr.length - 1 || !thumbnail) innerCopy(document.querySelector(".productArea").outerHTML)
    }
    catch (err) {
      innerCopy(document.querySelector(".productArea").outerHTML)
    }
  }, 600)

});

