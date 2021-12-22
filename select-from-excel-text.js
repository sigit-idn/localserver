let text = `
製品番号						b205051jk0												SKU										"b205051jk015BK　X000ZK3I6X
b205051jk015NV　X000ZK3FC5
b205051jk017BK　X000ZK3FBV
b205051jk017NV　X000ZK3I5J
b205051jk019BK　X000ZK3JL7
b205051jk019NV　X000ZK3KQB
b205051jk021BK　X000ZK3FCF
b205051jk021NV　X000ZK3JLH
b205051jk023BK　X000ZK3KQL
b205051jk023NV　X000ZK3FED"																									・楽天商品名																																														・SHOPLIST 商品名																																														・YAHOO 商品名																																										
							2021年												※コピペして半角																																																																																																																																																																									
	商品名																		大文字注意して下さい。																																			ビジネススーツ レディース 洗える スーツ ストレッチ おしゃれ ママスーツ 春 夏 秋 冬 通勤 OL リクルート 就活 ビジネス テーラードジャケット コンパクト 黒 オフィス 紺 ブラック ネイビー ウォッシャブル 抗菌 消臭 大きいサイズ 在宅ワーク																																														ビジネススーツ レディース 洗える スーツ ストレッチ おしゃれ ママスーツ 春 夏 秋 冬 通勤 OL リクルート 就活 ビジネス テーラードジャケット コンパクト 黒 オフィス 紺 ブラック ネイビー ウォッシャブル 抗菌 消臭 大きいサイズ 在宅ワーク 冠婚葬祭 テレワーク																																														ビジネススーツ レディース 洗える スーツ ストレッチ おしゃれ ママスーツ 春 夏 秋 冬 通勤 OL リクルート 就活 ビジネス テーラードジャケット コンパクト 黒																																										
	ウォッシャブルコンパクトテーラー																																																																																																																																																																																											
																				販売価格　※必須									メーカー希望価格							サイズ展開																		・楽天PC用キャッチコピー																																														・SHOPLISTキャッチコピー																																														・YAHOOキャッチコピー																																										
	モデル着用サイズ																			¥3,900									¥7,900						15号 17号 19号 21号 23号																																																																																																																																																									
	17号										あす楽																																											冠婚葬祭 テレワーク Lサイズ 23号 21号 19号 17号 15号 フォーマル リクルートスーツ 上品 綺麗 母親 きちんと 制服 事務服 仕事 背抜き 両サイド ポケット セレモニー 働くママ																																														冠婚葬祭 テレワーク Lサイズ 23号 21号 19号 17号 15号 フォーマル リクルートスーツ 上品 綺麗 母親 きちんと 制服 事務服 仕事 背抜き 両サイド ポケット セレモニー 働くママ																																														オフィス ブラック ネイビー ウォッシャブル 抗菌 消臭 大きい																																										
																				ＳＨＯＰＬＩＳＴ価格　※必須															ブラック・ネイビー																																																																																																																																																									
																																																						・楽天モバイル用キャッチコピー																																														・SHOPLIST商品説明文																																																																																								
																																																																																																																																																																																												
	PR小見出し　※１行のみ																																																					冠婚葬祭 テレワーク Lサイズ 23号 21号 19号 17号 フォーマル																																														"ウォッシャブル+ストレッチ+デオドラント効果を備えた年間通して活躍する
「洗えるテーラードジャケット」スカートに合わせやすいコンパクトなデザインです。

【ブラック】
「洗える」「ストレッチ性」を兼ね備えた清潔で快適なテーラードジャケット。

【ネイビー】
定番のテーラード。
年間通してロングシーズン活躍する1着。"																																																																																								
	ビジネスに最適！　スカート合わせしやすいコンパクトテーラードジャケット																																																																																																																																																																																											
																																																																																																																																																																																												
	・PRタイトル　※１～２行のみ																																																																																																																																																																																											
	ストレッチ＆ウォッシャブルで快適																																																																																																																																																																																											
																																																											・楽天カテゴリ																					・Yahooカテゴリ																					・SHOPLIST ディレクトリID																																																																																							
																																																											大きいサイズ\新着\NEW																					大きいサイズ\新着\NEW																					236																																																																																							
	ヘッドライン画像																																																																																																																																																																																											
																																																											大きいサイズ\ジャケット																					大きいサイズ\ジャケット																																																																																																												
																																																																																																																																																																																												
																																																																																																																																																																																												
		単品																																																																																																																																																																																										
		ジャケット																																																																																																																																																																																										
																																																																																																																																																																																												
		ウォッシャブル																																																																																																																																																																																										
		ストレッチ																																																																																																																																																																																										
`

let [productNumber] = text.match(/(?<=品番.+)\w{10}/)
let shoplistJanCode = text.match(new RegExp(productNumber + "[012].{14}", "g"))
let title           = text.split(/商品名.+大文字.+/)[1].match(/(?<=\t)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+(?=\t+)/)
let priceMatch      = text.match(/(￥|¥)(\d|,)+/)[0]
let price           = Number(priceMatch.replace(/\D/g, ""));
let priceNoTax      = Math.ceil(price - price / 11)
let brandPriceMatch = text.split(priceMatch)[1].match(/(￥|¥)(\d|,)+/)[0]
let yahooBrandPrice = Number(brandPriceMatch.replace(/\D/g, ""))
let shoplistPrice   = Number(text.split(brandPriceMatch)[1].match(/(￥|¥)(\d|,)+/)?.[0].replace(/\D/g, "")) ?? price
let sizes           = text.match(/\d{1,2}号|(?<=\s)[LMS]+(?=\s)/g).filter((item, i, arr) => arr.indexOf(item) === i) ?? "フリー"
let colors          = text.match(/(?<=ＩＳＴ価.+須.*)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+/g)
let [
	rakutenProductName, 
	shoplistProductName,
	yahooProductName
] = text.match(/(?<=大文.+さい。*.+)(\S+( \S+ )*)+/g)

// let title           = text.match(/(?<=^\n\t)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+(?=\t+$)/)
// let title           = text.match(/(?<=\n\t)[一-龠ァ-ヴーぁ-ゔｱ-ｳﾞ々〆〤]+/g)
// let title = text.match(/(?<=\n\s).+(?=(\t+|\n+)販売価格)/s)
// let [title] = text.match(/.+(?=.*販売価格)/)

console.log({rakutenProductName, shoplistProductName, yahooProductName});