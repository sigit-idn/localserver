from bs4 import BeautifulSoup
import requests
import re


def scrape(product_number):
		page = requests.get(f"https://item.rakuten.co.jp/milulu/{product_number}",
			headers={
					"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
			})
		# iframe = requests.get(
		# 		f"https://www.rakuten.ne.jp/gold/milulu/psge2/{product_number}/html/{product_number}.html")

		pageSoup = BeautifulSoup(page.content, 'html.parser')

		thumbnail = re.search(
				".+jpg", pageSoup.select_one('.rakutenLimitedId_ImageMain1-3 img').get("src"))[0]

		categories = {
				"bl": "ブラウス",
				"op": "ワンピース",
				"sk": "スカート",
				"st": "スーツ",
				"pt": "パンツ",
				"jk": "ジャケット",
				"ba": "バッグ",
				"cg": "コサージュ",
				"hg": "シュシュ",
				"be": "ベルト",
				"ka": "傘",
				"sp": "ストッキング",
				"sh": "シューズ",
				"po": "ポンチョ",
				"bm": "しおり",
				"nk": "ネックレス",
				"br": "ブローチ",
				"mk": "マスク",
				"ct": "コート"
		}

		category = ""

		if re.search("(?<=\d)\D{2}", product_number):
				category = categories[re.search("(?<=\d)\D{2}", product_number)[0]]

		if category == "スーツ":
			# category = re.findall("[ァ-ヴー]+スーツ", pageSoup.text)[-1]
			category = re.search("(パンツ|スカート|ワンピース)スーツ", pageSoup.text)[0]

		res = {
				"thumbnail": thumbnail,
				"h1": "",
				"category": category
		}

		iframe = requests.get(pageSoup.select_one(
				".sale_desc iframe").get("src"))

		# if iframe.status_code == 404:
		# 		iframe = requests.get(
		# 				f"https://www.rakuten.ne.jp/gold/milulu/psge2/{product_number}/{product_number}.html")

		if iframe.status_code == 404: return res

		iframeSoup = BeautifulSoup(iframe.content, 'html.parser')

		if iframeSoup.select('#rw-paHead1 > h1, #rw-paHead1 > h2'):
				h2 = iframeSoup.select_one('#rw-paHead1 > h2').text
				h1 = iframeSoup.select_one('#rw-paHead1 > h1').text
				res = {**res, "h1": h1, "h2": h2}
		
		return res

scrape("k215060hg0")
