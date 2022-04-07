//! Store KIDS Data
let input = prompt("商品データ")

let colorCodes = {
	"BK": "ブラック",
	"WH": "オフホワイト",
	"GO": "ゴールド",
	"PK": "ローズゴールド",
	"MC": "モカ",
	"SV": "シルバー",
	"SX": "サックスブルー",
	"NV": "ネイビー",
	"BG": "ベージュ",
	"CB": "シェリーベージュ",
	"SB": "スキニーベージュ",
	"SB": "サンドベージュ",
	"CC": "チャコール",
	"CC": "チャコールグレー",
	"WB": "オフ×ブラック",
	"WN": "オフ×ネイビー",
	"TC": "テラコッタ",
	"LG": "ライトグリーン",
	"MX": "ミックス",
	"MX": "ネイビーミックス",
	"WH": "ホワイト",
	"BR": "ブラウン",
	"CA": "キャメル",
	"DR": "ドロップ",
	"GL": "グレー",
	"PK": "ピンク",
	"CP": "シャンパン",
	"RN": "リング",
	"ST": "ストレート",
	"BL": "ブルー",
	"BL": "ブルーグレー",
	"MN": "ミント",
	"TP": "トープ",
	"RD": "レッド",
	"RS": "ローズ",
	"PP": "パープル",
	"KH": "カーキ",
	"SD": "サンドD"
}

let data = new (function () {
	this.productNumber   = input.match(/(d|s)\d{6}\w{3}/)?.[0];
	this.description     = document.querySelector(".thumbnail__text").innerText ?? prompt("Description")
	this.shoplistJanCode = {}
	this.title           = input.match(/(\S|_D){12,}/)?.[0].replace(/ELLE/, "");
	this.price           = Number(input.match(/(?<=\s)\d{4,5}(?=\s)/));
	this.priceNoTax      = Math.ceil(this.price - this.price / 11);
	this.shoplistPrice   = Number(input.split(this.price)[1].match(/(?<=\s)\d{4,5}(?=\s)/) ?? this.price);

	const productCodes = input.match(/(d|s)\d{6}\w{7}/g)
	const janCodes     = input.match(/X\d{3}\w{6}/g)

	productCodes.forEach((key, i) => this.shoplistJanCode[key] = janCodes[i])

	this.sizes                  = productCodes.map(code => "1" + code.replace(this.productNumber, "").slice(0, 2)).filter((size, i, sizes) => sizes.indexOf(size) === i);
	this.colors                 = productCodes.map(code => {
		const colorCode = code.replace(this.productNumber, "").match(/[A-Z]{2}$/)?.[0]
		return colorCodes[colorCode]
	}).filter((item,i,arr) => arr.indexOf(item) === i);
	this.modelSize              = input.match(/(?<=\t)(\d{1,2}号|[SML]{1,3}|フリー)(?=.+あす楽)/)?.[0];
	this.rakutenMobileCatchCopy = this.title;
	this.shoplistDescription    = this.title;
	this.headline               = this.title;
	this.subtitle               = this.title;
	this.shoplistCategory       = Number(input.match(/(?<=IST *ディレ.+\n.+)\d+/s))?.[0];
	this.rakutenCategory        = input.match(/(\S+\\\S*)+/g)?.filter((item, i, arr) => arr.indexOf(item) === i);
	this.yahooCategory          = this.rakutenCategory;
	this.category               = "kids"
	this.rakutenProductName     = this.title
	this.shoplistProductName    = this.title
	this.yahooProductName       = this.title
	this.rakutenCatchCopy       = this.title
	this.shoplistCatchCopy      = this.title
	this.yahooCatchCopy         = this.title
})()


fetch("http://localhost:8888/milulu", {
	method: "POST",
	"Content-Type": "application/json",
	body: JSON.stringify(data),
})
	.then(() => console.log("Written succesfuly"))
	.catch((error) => console.error({error}));