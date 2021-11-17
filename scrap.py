import requests
from bs4 import BeautifulSoup
import re

# print(requests)

# print(re.search("(?<=p).+(?=ng)", "pulang"))
product_number = "m211004st0"
page = requests.get('https://item.rakuten.co.jp/milulu/' + product_number)
iframe = requests.get('https://www.rakuten.ne.jp/gold/milulu/psge2/' + product_number + '/html/'+ product_number +'.html')

pageSoup = BeautifulSoup(page.content, 'html.parser')
iframeSoup = BeautifulSoup(iframe.content, 'html.parser')

# title = re.search("(?<=>).+(?=<)", str(iframeSoup.select('#wrapper > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(3) > table:nth-child(2) > tbody > tr > td > table:nth-child(4) > tbody > tr > td > a:nth-child(3)')[0]))
h2 = re.search("(?<=>).+(?=<)", str(iframeSoup.select('#rw-paHead1 > h2')[0]))
h1 = re.search("(?<=>).+(?=<)", str(iframeSoup.select('#rw-paHead1 > h1')[0]))
thumbnail = re.search(".*", str(iframeSoup.select('#rw-paHead1 > p > img')[0]).replace('..', "https://www.rakuten.ne.jp/gold/milulu/psge2/" + product_number))

# print(soup.select('#rw-paHead1 > h2')[0])
print(thumbnail)