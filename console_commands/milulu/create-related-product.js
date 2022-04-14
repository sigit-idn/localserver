// Create RELATED Product
let relatedItems = "";
let innerCopy = copy

prompt("関連商品")
  .match(/\w{1,2}\d{5,7}\w{1,2}\d{1,2}/g)
  .filter((val, i, arr) => arr.indexOf(val) === i)
  .forEach((productNumber, i, arr) => {
    setTimeout(async () => {
      let data = await (await fetch("http://localhost:8888/scrape/" + productNumber.toLowerCase())).json().catch(() => {});
      if (!data) return;

      relatedItems += `  <li style="box-shadow: 0 -4px 0 0 #FFF inset;">
        <a href="https://item.rakuten.co.jp/milulu/${productNumber}/" target="_top">
        <i>
        <img src="${data?.thumbnail}">
        </i>
        <span>
        <u></u>
        <u>
          <font size="0.5em" color="#6a5acd">
            ＜${data?.category?.replace(/<br>|\s/g, "")}＞
          </font>
          <br>
          ${(data.h2 + data.h1).length >= 50
          ? data.h2.replace(/<br>|<br\/>|\s/g, "")
          : data.h2.replace(/<br>|<br\/>|\s/g, "") +
          "<br>" +
          data.h1.replace(/<br>|<br\/>|\s/g, "")
        }
        </u>
      </span>
    </a>
  </li>
  `;
      console.log(productNumber);
      if (i >= arr.length) innerCopy(relatedItems)
    }, 600 * i)
  });

document.addEventListener("mousewheel", () =>
  navigator.clipboard.writeText(relatedItems)
);