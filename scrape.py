from bs4 import BeautifulSoup
import requests
import re

def scrape(product_number):
	# page = requests.get('https://item.rakuten.co.jp/milulu/' + product_number)
	iframe = requests.get('https://www.rakuten.ne.jp/gold/milulu/psge2/' + product_number + '/html/'+ product_number +'.html')
	
	if iframe.status_code == 404:
		iframe = requests.get('https://www.rakuten.ne.jp/gold/milulu/psge2/' + product_number + '/'+ product_number +'.html')
	
	if iframe.status_code == 404:
		return {
		# "h2": h2, 
		"h1": "",
		"thumbnail": "",
		"category": ""
	}

	# pageSoup = BeautifulSoup(page.content, 'html.parser')
	iframeSoup = BeautifulSoup(iframe.content, 'html.parser')

	# title = re.search("(?<=>).+(?=<)", str(iframeSoup.select('#wrapper > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a')[0]))
	# h2 = re.search("(?<=>).+(?=<)", str(iframeSoup.select_one('#rw-paHead1 > h2')))[0]
	h1 = re.search("(?<=>).+(?=<)", str(iframeSoup.select_one('#rw-paHead1 > h1')))[0]
	thumbnail = str(iframeSoup.select_one('#rw-paHead1 > p > img')).replace('..', "https://www.rakuten.ne.jp/gold/milulu/psge2/" + product_number)
	thumbnail = re.search("(?<=\").+(jpg|webp|png)", thumbnail)[0]
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
	};

	category = categories[re.search("(?<=\d)\D{2}", product_number)[0]]

	# print(soup.select('#rw-paHead1 > h2')[0])
	return {
		# "h2": h2, 
		"h1": h1,
		"thumbnail": thumbnail,
		"category": category | ""
	}

scrape("https://item.rakuten.co.jp/milulu/10000433/")