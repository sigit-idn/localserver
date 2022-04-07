//! STORE Data
let input = prompt("商品データ")

let categories = {
	bl: "tops",
	op: "onepiece",
	sk: "bottom",
	st: "suit",
	pt: "bottom",
	jk: "tops",
	ct: "tops",
};

let data = new (function () {
	this.productNumber = input.match(/(?<=品番.+)\w{10}/)?.[0];
	this.shoplistJanCode = {}
	input.match(new RegExp(this.productNumber + "[012f].{14}", "g"))
	?.forEach((jan) => {
		jan.trim()
		const [key, value] = jan.match(/\S+/g)
		this.shoplistJanCode[key] = value
	});

	this.title = input.split(/商品名.+大文字.+/)[1].match(/(?<=\t)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+(?=\t+)/)?.[0];
	const priceMatch = input.match(/(￥|¥)(\d|,)+/)[0];
	this.price = Number(priceMatch.replace(/\D/g, ""));
	this.priceNoTax = Math.ceil(this.price - this.price / 11);
	const brandPriceMatch = input.split(priceMatch)[1].match(/(￥|¥)(\d|,)+/)[0];
	this.yahooBrandPrice = Number(brandPriceMatch.replace(/\D/g, ""));
	this.shoplistPrice = Number(input.split(brandPriceMatch)[1].match(/(￥|¥)(\d|,)+/)?.[0].replace(/\D/g, "") ?? this.price) ;
	this.sizes = input.replace(/FREE( \(1サイズ\))*/ig, "フリー").match(/\d{1,2}号|(?<=\s)[LMS]+(?=\s)|フリー/g)?.filter((item, i, arr) => arr.indexOf(item) === i);
	this.colors = input.match(/(?<=(ＩＳＴ|IST).*価.+須.*)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+/g);
	this.modelSize = input.match(/(?<=\t)(\d{1,2}号|[SML]{1,3}|フリー)(?=.+あす楽)/)?.[0];
	this.rakutenMobileCatchCopy = input.match(/(?<=R小見.+\s{2,})(\S| )+/)?.[0];
	this.shoplistDescription = input.match(/(?<=R小見.+").+(?=")/s)?.[0];
	this.headline = input.match(/(?<=R小見.+\n\t).+(?=.+Rタイト)/s)[0].replace(/\t|\n|・$/g, "");
	this.subtitle = input.match(/(?<=Rタイト.+\n\t)(\S| )+/s)[0];
	this.shoplistCategory = Number(input.match(/(?<=IST *ディレ.+\n.+)\d+/s)?.[0]);
	this.rakutenCategory = input.match(/(\S+\\(\S|[SML] )*)+/g)?.filter((item, i, arr) => arr.indexOf(item) === i);
	this.yahooCategory = this.rakutenCategory;
	this.category = this.productNumber[0] === "k" ? "accessories" : categories[this.productNumber.match(/[a-zA-Z]{2,3}/)]
})()

let [
	rakutenProductName,
	shoplistProductName,
	yahooProductName] = input.match(/(?<=大文.+さい。*.+)(\S| )+/g);

let [
	rakutenCatchCopy,
	shoplistCatchCopy,
	yahooCatchCopy] = input.match(/(?<=あす楽.+)(\S| )+/g);

data = {
	...data, rakutenProductName,
	shoplistProductName,
	yahooProductName,
	rakutenCatchCopy,
	shoplistCatchCopy,
	yahooCatchCopy
}

fetch("http://localhost:8888/milulu", {
	method: "POST",
	"Content-Type": "application/json",
	body: JSON.stringify(data),
})
	.then(() => console.log("Written succesfuly"))
	.catch((error) => console.error({error}));

