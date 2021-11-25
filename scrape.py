from bs4 import BeautifulSoup
import requests
import re


def scrape(product_number):
	print("res")
	page = requests.get('https://item.rakuten.co.jp/milulu/' + product_number, headers={
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"})
	iframe = requests.get('https://www.rakuten.ne.jp/gold/milulu/psge2/' +
                       product_number + '/html/' + product_number + '.html')
	pageSoup = BeautifulSoup(page.content, 'html.parser')

	thumbnail = re.search("(?<=src=\").+(?=\")",
                       str(pageSoup.select_one('.rakutenLimitedId_ImageMain1-3 img')))[0]
	categories = {
            "bl": "ブラウス",
            "op": "ワンピース",
 											"sk": "スカート",
 											"st": "スーツ",
 											"pt": "パンツ",
 											"jk": "ジャケット",
 											"ba": "バッグ",
 											"cg": "コサージュ",
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

	category = categories[re.search("(?<=\d)\D{2}", product_number)[0]]

	if (bool(category) == False):
		category = ""

	res = {
		"thumbnail": thumbnail,
		"h1": "",
		"category": category
	}

	if iframe.status_code == 404:
		iframe = requests.get('https://www.rakuten.ne.jp/gold/milulu/psge2/' +
                       product_number + '/' + product_number + '.html')

	if iframe.status_code == 404:
		return res

	iframeSoup = BeautifulSoup(iframe.content, 'html.parser')

	if iframeSoup.select_one('#rw-paHead1 > h1'):
		# h2 = re.search("(?<=>)(.|\n)+(?=<)",
    #             str(iframeSoup.select_one('#rw-paHead1 > h2')))[0]
		h1 = re.search("(?<=>).+(?=<)", str(iframeSoup.select_one('#rw-paHead1 > h1')))[0]
		res = {**res, "h1": h1}

	print(res)

	return res


# scrape("m221004st0")
